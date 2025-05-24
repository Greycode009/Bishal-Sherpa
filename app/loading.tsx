import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero section skeleton */}
      <div className="relative w-full bg-white dark:bg-neutral-900 pt-28 pb-20 overflow-hidden border solid rounded-xl px-4 md:px-8">
        <div className="container flex flex-col items-center text-center px-4 md:px-0">
          <Skeleton className="w-40 h-40 rounded-full mb-4" />
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-32" />
          </div>
        </div>
      </div>

      {/* Content section skeleton */}
      <section className="w-full max-w-5xl mx-auto py-16 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-6" />
            <div className="flex gap-3 mb-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-24" />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-video w-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
