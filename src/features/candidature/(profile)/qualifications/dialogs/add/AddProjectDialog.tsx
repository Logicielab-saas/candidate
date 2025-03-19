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
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useCreateResumeProject } from "../../hooks/use-resume-project";
import React from "react";
import Image from "next/image";
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "@/core/constants/image-constraints";
import { useToast } from "@/hooks/use-toast";

// Internal form schema uses Date objects for better date handling
const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  date_start: z.date({
    required_error: "Start date is required",
  }),
  date_end: z.date().optional(),
  tasks: z
    .array(
      z.object({
        name: z.string().min(1, "Task name is required"),
        description: z.string().min(1, "Task description is required"),
        status: z.enum(["In Progress", "Completed"]),
      })
    )
    .default([]),
  // We'll handle image upload separately
  image: z
    .custom<FileList>()
    .optional()
    .transform((files) => {
      if (!files) return null;
      return Array.from(files);
    }),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface AddProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProjectDialog({
  open,
  onOpenChange,
}: AddProjectDialogProps) {
  const { mutate: createProject, isPending } = useCreateResumeProject();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const previewUrlsRef = React.useRef<string[]>([]);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      tasks: [],
      image: undefined,
    },
  });

  React.useEffect(() => {
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
          title: "File too large",
          description: `${file.name} is larger than 5MB`,
        });
        return false;
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: `${file.name} is not a supported image type`,
        });
        return false;
      }
    }
    return true;
  };

  function onSubmit(values: ProjectFormValues) {
    const formData = new FormData();

    // Add basic fields
    formData.append("name", values.name);
    formData.append("date_start", format(values.date_start, "yyyy-MM-dd"));
    if (values.date_end) {
      formData.append("date_end", format(values.date_end, "yyyy-MM-dd"));
    }
    if (values.description) {
      formData.append("description", values.description);
    }
    if (values.url) {
      formData.append("url", values.url);
    }

    // Add tasks
    values.tasks.forEach((task, index) => {
      formData.append(`tasks[${index}][name]`, task.name);
      if (task.description) {
        formData.append(`tasks[${index}][description]`, task.description);
      }
      formData.append(`tasks[${index}][status]`, task.status);
    });

    // Add images
    if (values.image) {
      Array.from(values.image).forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }

    createProject(formData, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[500px]">
        <ScrollArea className="px-3 max-h-[60vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Add your project details. Click save when you&apos;re done.
            </DialogDescription>
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
                        Project Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. E-commerce Platform"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date_start"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Start Date <span className="text-destructive">*</span>
                        </FormLabel>
                        <div className="flex gap-2">
                          <Popover>
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
                                    format(field.value, "d MMMM yyyy", {
                                      locale: fr,
                                    })
                                  ) : (
                                    <span>Pick a date</span>
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
                                onSelect={field.onChange}
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

                  <FormField
                    control={form.control}
                    name="date_end"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <div className="flex gap-2">
                          <Popover>
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
                                    format(field.value, "d MMMM yyyy", {
                                      locale: fr,
                                    })
                                  ) : (
                                    <span>Pick a date</span>
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
                                onSelect={field.onChange}
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
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project, technologies used..."
                          className="min-h-[120px]"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormLabel>Project Images</FormLabel>
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
                              Click to upload project images
                            </p>
                            <p className="text-xs">
                              Maximum size: 5MB. Formats: PNG, JPEG, GIF
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
                                  {value.length}{" "}
                                  {value.length === 1 ? "image" : "images"}{" "}
                                  selected
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
                                      alt={`Preview ${index + 1}`}
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

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. https://github.com/your-project"
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
                  <FormLabel className="text-base">Tasks</FormLabel>
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
                    Add Task
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

                    <FormField
                      control={form.control}
                      name={`tasks.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Task Name{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Implement Authentication"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`tasks.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Task Description</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Implemented JWT-based authentication system"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`tasks.${index}.status`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Status <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                            >
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </FormControl>
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
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Project"}
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
