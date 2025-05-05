"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateResumeProject } from "../../hooks/use-resume-project";
import type { ResumeProject } from "@/core/interfaces";
import Image from "next/image";
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "@/core/constants/image-constraints";
import { useToast } from "@/hooks/use-toast";
import { useTranslations, useLocale } from "next-intl";
import { formatDate } from "@/core/utils/date";

const projectFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t("validation.projectNameRequired")),
    description: z.string().optional(),
    url: z
      .string()
      .url(t("validation.urlInvalid"))
      .optional()
      .or(z.literal("")),
    date_start: z.date({
      required_error: t("validation.startDateRequired"),
    }),
    date_end: z.date().nullable().optional(),
    tasks: z
      .array(
        z.object({
          name: z.string().min(2, t("validation.taskNameRequired")),
          description: z.string().optional(),
          status: z.enum(["In Progress", "Completed"]),
        })
      )
      .default([]),
    image: z
      .any()
      .optional()
      .transform((files) => {
        if (!files || !(files instanceof FileList)) return null;
        return Array.from(files);
      }),
  });

type ProjectFormValues = z.infer<ReturnType<typeof projectFormSchema>>;

interface EditProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ResumeProject;
}

export function EditProjectDialog({
  open,
  onOpenChange,
  project,
}: EditProjectDialogProps) {
  const t = useTranslations("resumePage.projects.dialog.edit");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const { mutate: updateProject, isPending } = useUpdateResumeProject(tCommon);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);
  const { toast } = useToast();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const createProjectFormSchema = useMemo(
    () => projectFormSchema(tCommon),
    [tCommon]
  );

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      tasks: [],
      image: undefined,
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        description: project.description || "",
        url: project.url || "",
        date_start: new Date(project.date_start),
        date_end: project.date_end ? new Date(project.date_end) : undefined,
        tasks:
          project.tasks?.map((task) => ({
            name: task.name,
            description: task.description || "",
            status: task.status,
          })) || [],
      });
    }
  }, [project, form]);

  useEffect(() => {
    return () => {
      // Cleanup preview URLs when component unmounts
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const validateFiles = (files: FileList | null): boolean => {
    if (!files || files.length === 0) return true;

    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          variant: "destructive",
          title: tCommon("fileTooLarge"),
          description: tCommon("fileTooLargeDescription", {
            size: MAX_FILE_SIZE / (1024 * 1024),
          }),
        });
        return false;
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast({
          variant: "destructive",
          title: tCommon("invalidFileType"),
          description: tCommon("invalidFileTypeDescription"),
        });
        return false;
      }
    }
    return true;
  };

  function onSubmit(values: ProjectFormValues) {
    updateProject(
      {
        ...values,
        uuid: project.uuid,
        date_start: formatDate(values.date_start, "yyyy-MM-dd", locale),
        date_end: values.date_end
          ? formatDate(values.date_end, "yyyy-MM-dd", locale)
          : null,
        description: values.description || null,
        url: values.url || null,
        tasks: values.tasks.map((task) => ({
          name: task.name,
          description: task.description || "",
          status: task.status,
        })),
        image: values.image || null,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[500px]">
        <ScrollArea className="px-3 max-h-[90vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-3"
            >
              {/* Basic Information Section */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {tCommon("projectName")}{" "}
                        <span className="text-destructive">
                          {tCommon("form.required")}
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tCommon("exProjectName")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Start Date Section */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date_start"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          {tCommon("startDate")}{" "}
                          <span className="text-destructive">
                            {tCommon("form.required")}
                          </span>
                        </FormLabel>
                        <div className="flex gap-2">
                          <Popover
                            open={startDateOpen}
                            onOpenChange={setStartDateOpen}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    formatDate(
                                      field.value,
                                      "d MMMM yyyy",
                                      locale
                                    )
                                  ) : (
                                    <span>{tCommon("exDate")}</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setStartDateOpen(false);
                                }}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {field.value && (
                            <Button
                              variant="outline"
                              className="w-10"
                              type="button"
                              onClick={() => field.onChange(undefined)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Date Section */}
                  <FormField
                    control={form.control}
                    name="date_end"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{tCommon("endDate")}</FormLabel>
                        <div className="flex gap-2">
                          <Popover
                            open={endDateOpen}
                            onOpenChange={setEndDateOpen}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    formatDate(
                                      field.value,
                                      "d MMMM yyyy",
                                      locale
                                    )
                                  ) : (
                                    <span>{tCommon("exDate")}</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setEndDateOpen(false);
                                }}
                                disabled={(date) =>
                                  date < form.getValues("date_start")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {field.value && (
                            <Button
                              variant="outline"
                              className="w-10"
                              type="button"
                              onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                e.preventDefault();
                                field.onChange(null);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description Section */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tCommon("description")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tCommon("exDescription")}
                          className="min-h-[120px]"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Project Images Section */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormLabel>{tCommon("images.imageLabel")}</FormLabel>
                      <FormControl>
                        <div
                          role="button"
                          tabIndex={0}
                          className="border-2 border-dashed rounded-lg p-6 hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          onClick={() => fileInputRef.current?.click()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              fileInputRef.current?.click();
                            }
                          }}
                        >
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <ImageIcon className="h-8 w-8" />
                            <p className="text-sm font-medium">
                              {tCommon("images.uploadText")}
                            </p>
                            <p className="text-xs">
                              {tCommon("images.imageRequirement")}
                            </p>
                          </div>
                          <input
                            type="file"
                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && validateFiles(files)) {
                                // Create preview URLs for the selected files
                                const previewUrls = Array.from(files).map(
                                  (file) => URL.createObjectURL(file)
                                );
                                // Store the preview URLs in a ref to clean up later
                                previewUrlsRef.current = previewUrls;
                                onChange(files);
                              } else if (files) {
                                // Reset the input if validation fails
                                e.target.value = "";
                              }
                            }}
                            ref={fileInputRef}
                          />
                          {value && value.length > 0 && (
                            <>
                              <div className="mt-4 text-center">
                                <p className="text-sm text-muted-foreground">
                                  {tCommon("images.selected", {
                                    count: value.length,
                                  })}
                                </p>
                              </div>
                              <div className="mt-4 grid grid-cols-2 gap-4">
                                {Array.from(value).map((file, index) => (
                                  <div
                                    key={index}
                                    className="group relative aspect-video rounded-lg overflow-hidden bg-muted"
                                  >
                                    <Image
                                      src={URL.createObjectURL(file as Blob)}
                                      alt={tCommon("images.preview", {
                                        index: index + 1,
                                      })}
                                      className="object-cover"
                                      fill
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      priority={index === 0}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="h-8"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const newFiles = Array.from(
                                            value
                                          ).filter((_, i) => i !== index);
                                          const dataTransfer =
                                            new DataTransfer();
                                          newFiles.forEach((file) =>
                                            dataTransfer.items.add(file as File)
                                          );
                                          onChange(dataTransfer.files);
                                        }}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Project URL Section */}
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tCommon("url")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tCommon("exUrl")}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tasks Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-base">
                    {tCommon("tasks.label")}
                  </FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentTasks = form.getValues("tasks");
                      form.setValue("tasks", [
                        ...currentTasks,
                        { name: "", description: "", status: "In Progress" },
                      ]);
                    }}
                  >
                    {tCommon("tasks.addTask")}
                  </Button>
                </div>

                {form.watch("tasks").map((_, index) => (
                  <div
                    key={index}
                    className="space-y-4 p-4 border rounded-lg relative"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        const tasks = form.getValues("tasks");
                        form.setValue(
                          "tasks",
                          tasks.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    {/* Task Name Section */}
                    <FormField
                      control={form.control}
                      name={`tasks.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {tCommon("tasks.nameLabel")}{" "}
                            <span className="text-destructive">
                              {tCommon("form.required")}
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={tCommon("tasks.namePlaceholder")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Task Description Section */}
                    <FormField
                      control={form.control}
                      name={`tasks.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {tCommon("tasks.taskDescription")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={tCommon(
                                "tasks.taskDescriptionPlaceholder"
                              )}
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Task Status Section */}
                    <FormField
                      control={form.control}
                      name={`tasks.${index}.status`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {tCommon("tasks.statusLabel")}{" "}
                            <span className="text-destructive">
                              {tCommon("form.required")}
                            </span>
                          </FormLabel>
                          <select
                            {...field}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            <option value="In Progress">
                              {tCommon("tasks.inProgress")}
                            </option>
                            <option value="Completed">
                              {tCommon("tasks.completed")}
                            </option>
                          </select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </form>
          </Form>

          <DialogFooter className="p-6 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {tCommon("actions.cancel")}
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? tCommon("actions.saving") : tCommon("actions.save")}
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
