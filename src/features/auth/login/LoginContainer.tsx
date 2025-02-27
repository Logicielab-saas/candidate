import { LoginForm } from "@/features/auth/login/LoginForm";

export function LoginContainer() {
  return (
    <div className="flex flex-col items-center justify-center md:mt-12 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <div className="flex flex-col gap-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
