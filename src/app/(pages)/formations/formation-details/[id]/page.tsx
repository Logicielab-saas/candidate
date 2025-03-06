interface FormationDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function FormationDetailsPage({
  params,
}: FormationDetailsPageProps) {
  const { id } = await params;

  return <div>Formation Details</div>;
}
