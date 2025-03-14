import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCircle2, CheckCircle } from "lucide-react";
import { RecruiterSignupForm } from "@/features/auth/signup/RecruiterSignupForm";
import { CandidateSignupForm } from "@/features/auth/signup/CandidateSignupForm";
import { Illustration } from "../Illustration";

interface SignupFirstStepProps {
  onSelect: (type: "recruiter" | "employee" | null) => void;
  selectedType: "recruiter" | "employee" | null;
}

export function SignupFirstStep({
  onSelect,
  selectedType,
}: SignupFirstStepProps) {
  return (
    <div className="flex flex-col gap-6 ">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex flex-col gap-6 p-6 mb-12">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Select Signup Type</h1>
              <p className="text-balance text-muted-foreground">
                Please choose how you would like to sign up.
              </p>
            </div>
            <RadioGroup className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="relative">
                <RadioGroupItem
                  value="employee"
                  id="employee"
                  className="peer sr-only"
                  onClick={() => onSelect("employee")}
                />
                <Label
                  htmlFor="employee"
                  className={cn(
                    "flex flex-col h-full cursor-pointer rounded-lg border-2 transition-all",
                    "hover:border-primaryHex-500 hover:shadow-md",
                    "peer-checked:border-primaryHex-500 peer-checked:shadow-md",
                    selectedType === "employee"
                      ? "border-primaryHex-500"
                      : "border-transparent"
                  )}
                >
                  <Card
                    className={cn(
                      "h-full transition-all",
                      "peer-checked:bg-primaryHex-50",
                      "dark:peer-checked:bg-primaryHex-900/20",
                      "relative overflow-hidden border-0"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-1 right-4 transition-opacity",
                        selectedType === "employee"
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    >
                      <CheckCircle className="w-5 h-5 text-primaryHex-600 dark:text-primaryHex-400" />
                    </div>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className=" p-2">
                          <Image
                            src="/signup/employ.svg"
                            alt="Employ Icon"
                            width={100}
                            height={100}
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50 text-center">
                          Looking for a job
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem
                  value="recruiter"
                  id="recruiter"
                  className="peer sr-only"
                  onClick={() => onSelect("recruiter")}
                />
                <Label
                  htmlFor="recruiter"
                  className={cn(
                    "flex flex-col h-full cursor-pointer rounded-lg border-2 transition-all",
                    "hover:border-primaryHex-500 hover:shadow-md",
                    "peer-checked:border-primaryHex-500 peer-checked:shadow-md",
                    selectedType === "recruiter"
                      ? "border-primaryHex-500"
                      : "border-transparent"
                  )}
                >
                  <Card
                    className={cn(
                      "h-full transition-all",
                      "peer-checked:bg-primaryHex-50",
                      "dark:peer-checked:bg-primaryHex-900/20",
                      "relative overflow-hidden border-0"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-1 right-4 transition-opacity",
                        selectedType === "recruiter"
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    >
                      <CheckCircle2 className="w-6 h-6 text-primaryHex-500" />
                    </div>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2">
                          <Image
                            src="/signup/comany.svg"
                            alt="Company Icon"
                            width={100}
                            height={100}
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50 text-center">
                          Hiring for a job
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Illustration
            src="/signup/question.svg"
            alt="Signup Illustration"
            isFixedDimension={true}
          />
        </CardContent>
      </Card>
      {selectedType === "recruiter" && (
        <RecruiterSignupForm onSelect={onSelect} />
      )}
      {selectedType === "employee" && (
        <CandidateSignupForm onSelect={onSelect} />
      )}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
