"use client";

import { useState } from "react";
import { SignupFirstStep } from "./SignupFirstStep";
import { SignupForm } from "./SignupForm";

export function SignupContainer() {
  const [signupType, setSignupType] = useState<"recruiter" | "employee" | null>(
    null
  );

  const handleSelect = (type: "recruiter" | "employee" | null) => {
    setSignupType(type);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 md:mt-12 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        {signupType ? (
          <SignupForm onSelect={handleSelect} selectedType={signupType} />
        ) : (
          <SignupFirstStep onSelect={handleSelect} selectedType={signupType} />
        )}
      </div>
    </div>
  );
}
