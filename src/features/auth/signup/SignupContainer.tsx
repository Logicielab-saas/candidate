"use client";

import { useState } from "react";
import { SignupForm } from "./SignupForm";
import { SignupFirstStep } from "./SignupFirstStep";

export function SignupContainer() {
  const [signupType, setSignupType] = useState<
    "recruiter" | "candidate" | null
  >(null);

  const handleSelect = (type: "recruiter" | "candidate" | null) => {
    setSignupType(type);
  };

  return (
    <div className="flex flex-col items-center justify-center md:mt-12 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        {signupType ? (
          <div className="flex flex-col gap-4">
            <SignupForm onSelect={handleSelect} />
          </div>
        ) : (
          <SignupFirstStep onSelect={handleSelect} selectedType={signupType} />
        )}
      </div>
    </div>
  );
}
