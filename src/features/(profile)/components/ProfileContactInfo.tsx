export function ProfileContactInfo() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="text-lg font-medium">Contact Information</h3>
        <div className="mt-2 space-y-2 text-sm text-muted-foreground">
          <p>+1 234 567 890</p>
          <p>San Francisco, CA</p>
          <p>United States</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Social Links</h3>
        <div className="mt-2 space-y-2">
          <a href="#" className="block text-sm text-primary hover:underline">
            LinkedIn
          </a>
          <a href="#" className="block text-sm text-primary hover:underline">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
