interface QualificationSectionProps {
  children: React.ReactNode;
}

export function QualificationSection({ children }: QualificationSectionProps) {
  return <section className="space-y-4">{children}</section>;
}
