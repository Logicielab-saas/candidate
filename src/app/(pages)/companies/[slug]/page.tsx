import { redirect } from "next/navigation";
import { CompanyDetailsContainer } from "@/features/companies/company-details/components/CompanyDetailsContainer";
import { companyDetails } from "@/core/mockData/company";

interface CompanyDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CompanyDetailsPage({
  params,
}: CompanyDetailsPageProps) {
  const { slug } = await params;
  const company = companyDetails.find((company) => company.slug === slug);

  if (!company) {
    redirect("/notFound");
  }

  return <CompanyDetailsContainer company={company} />;
}
