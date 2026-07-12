"use client";
export function SkeletonBlock({ h = "h-6", w = "w-full", className = "" }: { h?: string; w?: string; className?: string }) {
  return <div className={`skeleton rounded-lg ${h} ${w} ${className}`} />;
}

export function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div className="glass rounded-2xl p-5 space-y-3">
      <SkeletonBlock h="h-5" w="w-40" />
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonBlock key={i} h="h-10" w="w-full" />
      ))}
    </div>
  );
}
