import { Phone, MapPin, Calendar, User } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { formatDate } from "@/core/utils/date";

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
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const fullAddress = [address, city, postalCode, country]
    .filter(Boolean)
    .join(", ");

  const getGender = (isMale: boolean | null): string => {
    if (isMale === null) return tCommon("gender.notSpecified");
    return isMale ? tCommon("gender.male") : tCommon("gender.female");
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        {tCommon("labels.contactInfo")}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Phone Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200">
            <Phone className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div>
            <p className="text-sm font-medium">{tCommon("labels.phone")}</p>
            <p className="text-sm text-muted-foreground">
              {phone || tCommon("placeholders.noPhone")}
            </p>
          </div>
        </div>

        {/* Address Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200">
            <MapPin className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div>
            <p className="text-sm font-medium">{tCommon("labels.address")}</p>
            <p className="text-sm text-muted-foreground break-words">
              {fullAddress || tCommon("placeholders.noAddress")}
            </p>
          </div>
        </div>

        {/* Birth Date Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200">
            <Calendar className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div>
            <p className="text-sm font-medium">{tCommon("labels.birthDate")}</p>
            <p className="text-sm text-muted-foreground">
              {birthdate && !isNaN(Date.parse(birthdate))
                ? formatDate(birthdate, "d MMMM yyyy", locale)
                : tCommon("placeholders.noBirthdate")}
            </p>
          </div>
        </div>

        {/* Gender Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200">
            <User className="h-4 w-4 text-primaryHex-500" />
          </div>
          <div>
            <p className="text-sm font-medium">{tCommon("labels.gender")}</p>
            <p className="text-sm text-muted-foreground">{getGender(isMale)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
