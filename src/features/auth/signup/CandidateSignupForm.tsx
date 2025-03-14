import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CandidateSignupFormProps {
  onSelect: (type: "recruiter" | "employee" | null) => void;
}

export const CandidateSignupForm: React.FC<CandidateSignupFormProps> = ({
  onSelect,
}) => {
  const handleLogin = () => {
    // Implement login logic here
    console.log("Candidate logged in");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Candidate Login</h2>
      <input type="text" placeholder="Email" className="input" />
      <input type="password" placeholder="Password" className="input" />
      <Button onClick={handleLogin}>Login</Button>
      <Button variant="outline" onClick={() => onSelect("recruiter")}>
        Switch to Recruiter Login
      </Button>
      <Button variant="outline" onClick={() => onSelect(null)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>
    </div>
  );
};
