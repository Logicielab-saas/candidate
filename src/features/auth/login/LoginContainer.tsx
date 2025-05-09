"use client";

import { useState } from "react";
import { LoginForm } from "@/features/auth/login/LoginForm";
import { LoginFirstStep } from "@/features/auth/login/LoginFirstStep";

export function LoginContainer() {
  const [loginType, setLoginType] = useState<"recruiter" | "employee" | null>(
    null
  );

  const handleSelect = (type: "recruiter" | "employee" | null) => {
    setLoginType(type);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 md:mt-12 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        {loginType ? (
          <LoginForm onSelect={handleSelect} selectedType={loginType} />
        ) : (
          <LoginFirstStep onSelect={handleSelect} selectedType={loginType} />
        )}
      </div>
    </div>
  );
}
