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

const formSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
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
  birth_date: z
    .string()
    .nullish()
    .transform((v) => v || null),
  image: z
    .instanceof(File)
    .nullable()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "File size should be less than 5MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .gif formats are accepted"
    ),
});

type FormData = z.infer<typeof formSchema>;

interface EditProfileFormProps {
  profile: Profile;
  resumeDescription?: string | null;
}

export function EditProfileForm({
  profile,
  resumeDescription,
}: EditProfileFormProps) {
  const router = useRouter();
  const { mutate: updateProfile, isPending: isProfileUpdating } =
    useUpdateProfile();
  const { mutate: updateResume, isPending: isResumeUpdating } =
    useUpdateProfileResume();

  const isPending = isProfileUpdating || isResumeUpdating;

  // Format the date from ISO to YYYY-MM-DD for the input
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // Keep track of the original image state
  const originalImage =
    typeof profile.image === "string" ? profile.image : null;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
      birth_date: formatDateForInput(profile.birthdate),
      image: null,
    },
  });

  async function onSubmit(values: FormData) {
    // Update profile and resume concurrently
    await Promise.all([
      new Promise((resolve) => {
        //* Use object destructuring to omit description
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { description, ...profileData } = values;
        updateProfile(profileData, { onSuccess: resolve });
      }),
      new Promise((resolve) => {
        if (values.description) {
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
    form.reset(); // Reset form to initial values
    router.back();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="+1234567890"
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
          name="birth_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_male"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
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
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Main St"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="city_uuid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New York"
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="United States"
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
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="10001"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your professional experience and goals"
                  className="min-h-[150px]"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
