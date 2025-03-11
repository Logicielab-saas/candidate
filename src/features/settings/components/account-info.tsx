/**
 * AccountInfo - Displays user account information with modification options
 *
 * A server component that renders user account details including account type,
 * email, and phone number, with buttons to modify each field.
 */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOCK_USER } from "@/core/mockData/user";

interface InfoItemProps {
  label: string;
  value: string;
  onChangeClick: () => void;
}

function InfoItem({ label, value, onChangeClick }: InfoItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
      <Button variant="outline" size="sm" onClick={onChangeClick}>
        Changer
      </Button>
    </div>
  );
}

export function AccountInfo() {
  // TODO: Replace with actual user data and handlers
  const user = MOCK_USER;

  const handleTypeChange = () => {
    console.log("Change account type");
  };

  const handleEmailChange = () => {
    console.log("Change email");
  };

  const handlePhoneChange = () => {
    console.log("Change phone");
  };

  return (
    <Card className="p-6">
      <h4 className="text-sm font-medium mb-4">Informations du compte</h4>
      <div className="divide-y">
        <InfoItem
          label="Type de compte"
          value={user.accountType}
          onChangeClick={handleTypeChange}
        />
        <InfoItem
          label="Email"
          value={user.email}
          onChangeClick={handleEmailChange}
        />
        <InfoItem
          label="Numéro de téléphone"
          value={user.phone}
          onChangeClick={handlePhoneChange}
        />
      </div>
    </Card>
  );
}
