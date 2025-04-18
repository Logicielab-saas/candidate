"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpdateProfile } from "../../(profile)/hooks/use-profile";
import { useUpdateProfileResume } from "../../(profile)/qualifications/hooks/use-profile-resume";
import { Profile } from "../../(profile)/common/interface";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./components/ImageUpload";
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "@/core/constants/image-constraints";
import { useCities } from "@/hooks/use-cities";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse, parseISO, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

function profileFormSchema(t: (key: string) => string) {
  return z.object({
    first_name: z.string().min(2, t("firstName.minLength")),
    last_name: z.string().min(2, t("lastName.minLength")),
    phone: z
      .string()
      .min(1, t("phone.required"))
      .nullish()
      .transform((v) => v || null),
    address: z
      .string()
      .nullish()
      .transform((v) => v || null),
    city_uuid: z
      .string()
      .nullish()
      .transform((v) => v || null),
    country: z
      .string()
      .nullish()
      .transform((v) => v || null),
    postal_code: z
      .string()
      .nullish()
      .transform((v) => v || null),
    bio: z
      .string()
      .nullish()
      .transform((v) => v || null),
    description: z
      .string()
      .nullish()
      .transform((v) => v || null),
    is_male: z.boolean().nullable(),
    birthdate: z
      .string()
      .nullish()
      .transform((v) => v || null),
    image: z
      .instanceof(File)
      .nullable()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, t("image.size"))
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        t("image.format")
      ),
  });
}

type FormData = z.infer<ReturnType<typeof profileFormSchema>>;

interface EditProfileFormProps {
  profile: Profile;
  resumeDescription?: string | null;
}

/**
 * EditProfileForm - Form for editing user profile information
 *
 * Allows users to edit their personal details, contact information,
 * address, biography, and resume description with validation.
 *
 * Props:
 * - profile: Profile - Current user profile data
 * - resumeDescription: string | null - Optional resume description
 */
export function EditProfileForm({
  profile,
  resumeDescription,
}: EditProfileFormProps) {
  const router = useRouter();
  const { mutate: updateProfile, isPending: isProfileUpdating } =
    useUpdateProfile();
  const { mutate: updateResume, isPending: isResumeUpdating } =
    useUpdateProfileResume();
  const { data: cities, isLoading: isCitiesLoading } = useCities();
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("common.validation");
  const tProfile = useTranslations("editProfile");

  const isPending = isProfileUpdating || isResumeUpdating || isCitiesLoading;

  const profileForm = useMemo(
    () => profileFormSchema(tValidation),
    [tValidation]
  );

  // Format the date from ISO to YYYY-MM-DD for the input
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // Keep track of the original image state
  const originalImage =
    typeof profile.image === "string" ? profile.image : null;

  const form = useForm<FormData>({
    resolver: zodResolver(profileForm),
    defaultValues: {
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city_uuid: profile.city_uuid || "",
      country: profile.country || "",
      postal_code: profile.postal_code || "",
      bio: profile.bio || "",
      description: resumeDescription || "",
      is_male: profile.is_male,
      birthdate: formatDateForInput(profile.birthdate),
      image: null,
    },
  });

  async function onSubmit(values: FormData) {
    // Update profile and resume concurrently
    await Promise.all([
      new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { description, ...profileData } = values;
        updateProfile(profileData, { onSuccess: resolve });
      }),
      new Promise((resolve) => {
        if (values.description && values.description !== resumeDescription) {
          updateResume(values.description, { onSuccess: resolve });
        } else {
          resolve(null);
        }
      }),
    ]);

    router.back();
  }

  const userInitials =
    [form.watch("first_name"), form.watch("last_name")]
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  function handleCancel() {
    form.reset();
    router.back();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Image Upload Section */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  initials={userInitials}
                  disabled={isPending}
                  existingImage={originalImage}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name Fields - First Name & Last Name */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tProfile("form.firstName.label")}{" "}
                  <span className="text-destructive">
                    {tCommon("form.required")}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={tProfile("form.firstName.placeholder")}
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
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tProfile("form.lastName.label")}{" "}
                  <span className="text-destructive">
                    {tCommon("form.required")}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={tProfile("form.lastName.placeholder")}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full md:w-2/3 lg:w-1/2">
              <FormLabel>
                {tProfile("form.phone.label")}{" "}
                <span className="text-destructive">
                  {tCommon("form.required")}
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={tProfile("form.phone.placeholder")}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Birth Date Field */}
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem className="w-full md:w-72 flex flex-col gap-2">
              <FormLabel>{tProfile("form.birthdate.label")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isPending}
                    >
                      {field.value ? (
                        <span>
                          {format(
                            (() => {
                              try {
                                const parsedDate = parse(
                                  field.value,
                                  "yyyy-MM-dd",
                                  new Date()
                                );
                                return isValid(parsedDate)
                                  ? parsedDate
                                  : parseISO(field.value);
                              } catch (_e) {
                                return new Date();
                              }
                            })(),
                            "d MMMM yyyy",
                            { locale: fr }
                          )}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          {tProfile("form.birthdate.placeholder")}
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      field.value
                        ? (() => {
                            try {
                              const parsedDate = parse(
                                field.value,
                                "yyyy-MM-dd",
                                new Date()
                              );
                              return isValid(parsedDate)
                                ? parsedDate
                                : parseISO(field.value);
                            } catch (_e) {
                              return undefined;
                            }
                          })()
                        : undefined
                    }
                    onSelect={(date) =>
                      field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                    }
                    disabled={isPending}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={1940}
                    toYear={new Date().getFullYear()}
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender Field - Radio Buttons */}
        <FormField
          control={form.control}
          name="is_male"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{tProfile("form.gender.label")}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) =>
                    field.onChange(
                      value === "true" ? true : value === "false" ? false : null
                    )
                  }
                  value={
                    field.value === null ? undefined : field.value.toString()
                  }
                  className="flex gap-6"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {tProfile("form.gender.options.male")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {tProfile("form.gender.options.female")}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tProfile("form.address.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={tProfile("form.address.placeholder")}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City, Country, Postal Code Fields */}
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="city_uuid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tProfile("form.city.label")}</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={tProfile("form.city.placeholder")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities?.map((city) => (
                      <SelectItem key={city.uuid} value={city.uuid}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tProfile("form.country.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tProfile("form.country.placeholder")}
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
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tProfile("form.postalCode.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tProfile("form.postalCode.placeholder")}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bio Field */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tProfile("form.bio.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={tProfile("form.bio.placeholder")}
                  className="min-h-[112px]"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resume Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tProfile("form.description.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={tProfile("form.description.placeholder")}
                  className="min-h-[144px]"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
          >
            {tCommon("actions.cancel")}
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? tCommon("actions.saving") : tCommon("actions.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
