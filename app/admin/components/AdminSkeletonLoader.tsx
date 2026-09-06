export function AdminSkeletonLoader({ title = "Cargando..." }: { title?: string }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-48 bg-muted rounded-md animate-pulse mb-2"></div>
          <div className="h-4 w-72 bg-muted rounded-md animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-muted rounded-xl animate-pulse"></div>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4">
          <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 border-b border-border/50 flex gap-4">
            <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
