import { Phone, MapPin, Calendar, User } from "lucide-react";

interface ProfileContactInfoProps {
  phone: string | null;
  address: string | null;
  birthdate: string | null;
  isMale: boolean | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
}

export function ProfileContactInfo({
  phone,
  address,
  birthdate,
  isMale,
  postalCode,
  city,
  country,
}: ProfileContactInfoProps) {
  const fullAddress = [address, city, postalCode, country]
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Phone Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200">
            <Phone className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Phone Number</p>
            <p className="text-sm text-muted-foreground">
              {phone || "No phone number provided"}
            </p>
          </div>
        </div>

        {/* Address Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200">
            <MapPin className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Address</p>
            <p className="text-sm text-muted-foreground break-words">
              {fullAddress || "No address provided"}
            </p>
          </div>
        </div>

        {/* Birth Date Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200">
            <Calendar className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Birth Date</p>
            <p className="text-sm text-muted-foreground">
              {birthdate
                ? new Date(birthdate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No birthdate provided"}
            </p>
          </div>
        </div>

        {/* Gender Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200">
            <User className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Gender</p>
            <p className="text-sm text-muted-foreground">
              {isMale !== null ? (isMale ? "Male" : "Female") : "Not specified"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
