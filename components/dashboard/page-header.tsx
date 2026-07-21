export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-lg">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
