interface ProfileContactInfoProps {
  phone: string | null;
  address: string | null;
  birthdate: string | null;
  isMale: boolean | null;
}

export function ProfileContactInfo({
  phone,
  address,
  birthdate,
  isMale,
}: ProfileContactInfoProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="text-lg font-medium">Contact Information</h3>
        <div className="mt-2 space-y-2 text-sm text-muted-foreground">
          <p>{phone || "No phone number provided"}</p>
          <p>{address || "No address provided"}</p>
          <p>
            {birthdate
              ? new Date(birthdate).toLocaleDateString()
              : "No birthdate provided"}
          </p>
          <p>
            {isMale !== null ? (isMale ? "Male" : "Female") : "Not specified"}
          </p>
        </div>
      </div>

      {/* <div>
        <h3 className="text-lg font-medium">Social Links</h3>
        <div className="mt-2 space-y-2">
          <a href="#" className="block text-sm text-primary hover:underline">
            LinkedIn
          </a>
          <a href="#" className="block text-sm text-primary hover:underline">
            GitHub
          </a>
        </div>
      </div> */}
    </div>
  );
}
