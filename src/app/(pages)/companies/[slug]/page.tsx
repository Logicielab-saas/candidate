import { notFound } from "next/navigation";
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
  const companyId = slug.split('-').pop();

  const company = companyDetails.find((company) => company.id === companyId);

  if (!company) {
    return notFound();
  }

  return <CompanyDetailsContainer company={company} />;
}
