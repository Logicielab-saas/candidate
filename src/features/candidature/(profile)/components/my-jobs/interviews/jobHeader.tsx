export function JobHeader({
  jobTitle,
  companyName,
}: {
  jobTitle: string;
  companyName: string;
}) {
  return (
    <div className="p-4 shadow dark:border rounded-lg mb-4 text-center">
      <h1 className="text-2xl font-bold">{jobTitle}</h1>
      <p className="text-lg text-gray-600">{companyName}</p>
    </div>
  );
}
