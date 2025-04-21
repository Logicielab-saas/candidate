"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginAction } from "../actions/login";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LoginCredentials } from "../common/interfaces";
import { Illustration } from "../Illustration";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  user_type: z.enum(["employee", "recruiter"]),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  className?: string;
  onSelect: (type: "recruiter" | "employee" | null) => void;
  selectedType: "recruiter" | "employee" | null;
}

export function LoginForm({
  className,
  onSelect,
  selectedType,
  ...props
}: LoginFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("auth.login");
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("common.validation");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      user_type: selectedType || "employee",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setIsLoading(true);
      const result = await loginAction(data as LoginCredentials);

      if (result.error) {
        toast({
          variant: "destructive",
          title: tCommon("toast.error.title"),
          description: result.error,
        });
      }

      if (result.success && result.redirectTo) {
        toast({
          variant: "default",
          title: tCommon("toast.success.title"),
          description: tCommon("toast.success.description"),
        });
        router.push(result.redirectTo);
      }
    } catch (_error) {
      toast({
        variant: "destructive",
        title: tCommon("toast.error.title"),
        description: tValidation("unexpectedError"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{t("welcomeBack")}</h1>
                <p className="text-balance text-muted-foreground">
                  {t(`welcomeDescription.${selectedType}`)}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{tCommon("form.email.label")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={tCommon("form.email.placeholder")}
                  {...register("email")}
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className="text-sm text-destructive">
                    {tValidation("email")}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{tCommon("password")}</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {tCommon("form.password.forgot")}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder={tCommon("passwordMask")}
                  {...register("password")}
                  disabled={isLoading}
                />
                {errors.password && (
                  <span className="text-sm text-destructive">
                    {tValidation("minLength", { count: 6 })}
                  </span>
                )}
              </div>
              <input type="hidden" {...register("user_type")} />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? tCommon("form.sending") : tCommon("form.submit")}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  {tCommon("actions.continueWith")}
                </span>
              </div>
              <div className="flex justify-center">
                <Button variant="outline" disabled={isLoading}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">
                    {tCommon("actions.loginWith", { provider: "Google" })}
                  </span>
                </Button>
              </div>
              <div className="text-center text-sm">
                {t("noAccount")}{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  {t("signup")}
                </Link>
              </div>
              <Button
                variant="outline"
                onClick={() => onSelect(null)}
                type="button"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> {tCommon("actions.back")}
              </Button>
            </div>
          </form>
          <Illustration
            src={
              selectedType === "employee"
                ? "/login/ask_login.svg"
                : "/login/recruiter_login.svg"
            }
            alt={
              selectedType === "employee"
                ? t("options.employee.title")
                : t("options.recruiter.title")
            }
          />
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        {tCommon
          .raw("legal.agreement")
          .replace("{terms}", "")
          .replace("{privacy}", "")}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          {tCommon("links.termsOfService")}
        </Link>
        {" et "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          {tCommon("links.privacyPolicy")}
        </Link>
      </div>
    </div>
  );
}
