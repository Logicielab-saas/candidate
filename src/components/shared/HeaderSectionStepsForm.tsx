interface HeaderSectionStepsFormProps {
  title: string;
  description: string;
}

export function HeaderSectionStepsForm({
  title,
  description,
}: HeaderSectionStepsFormProps) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-secondaryHex-900 dark:text-secondaryHex-50">
        {title}
      </h1>
      <p className="text-secondaryHex-600 dark:text-secondaryHex-400 text-lg">
        {description}
      </p>
    </div>
  );
}
