"use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LoadingBoundary({
  children,
  fallback = <DefaultSkeleton />,
}: LoadingBoundaryProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

function DefaultSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-4 w-[400px]" />
      <Skeleton className="h-4 w-[350px]" />
    </div>
  );
}
