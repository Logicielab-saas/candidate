import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Illustration } from "../Illustration";
import Link from "next/link";
import { signupAction } from "../actions/signup";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SignupCredentials } from "../common/interfaces";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(6, "Name must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  user_type: z.enum(["employee", "recruiter"]),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  className?: string;
  onSelect: (type: "recruiter" | "employee" | null) => void;
  selectedType: "recruiter" | "employee" | null;
}

export function SignupForm({
  className,
  onSelect,
  selectedType,
}: SignupFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      user_type: selectedType === "employee" ? "employee" : "recruiter",
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      setIsLoading(true);
      const result = await signupAction(data as SignupCredentials);

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
      if (result.success) {
        toast({
          variant: "success",
          title: "Success",
          description: "Signup successful",
        });
        router.replace("/login");
      }
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Sign up</h1>
                <p className="text-balance text-muted-foreground">
                  Create your Postuly account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative flex items-center">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    {...register("name")}
                    disabled={isLoading}
                  />
                  {errors.name || !watch("name") ? null : (
                    <CheckCircle className="absolute right-2 text-green-500" />
                  )}
                </div>
                {errors.name && (
                  <span className="text-sm text-destructive">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative flex items-center">
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                    disabled={isLoading}
                  />
                  {errors.email || !watch("email") ? null : (
                    <CheckCircle className="absolute right-2 text-green-500" />
                  )}
                </div>
                {errors.email && (
                  <span className="text-sm text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    disabled={isLoading}
                  />
                  {errors.password || !watch("password") ? null : (
                    <CheckCircle className="absolute right-2 text-green-500" />
                  )}
                </div>
                {errors.password && (
                  <span className="text-sm text-destructive">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <input type="hidden" {...register("user_type")} />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
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
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
              <Button
                variant="outline"
                onClick={() => onSelect(null)}
                type="button"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </div>
          </form>
          <Illustration src="/login/ask_login.svg" alt="Signup Illustration" />
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
