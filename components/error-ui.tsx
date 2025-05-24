"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { YoutubeIcon } from "lucide-react";

interface ErrorUIProps {
  title?: string;
  message?: string;
  showYouTubeLink?: boolean;
  retry?: () => void;
}

export function ErrorUI({
  title = "Something went wrong",
  message = "We're having trouble loading some content. Please try again later.",
  showYouTubeLink = false,
  retry,
}: ErrorUIProps) {
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
    ? `https://youtube.com/${
        process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID.startsWith("UC")
          ? "channel/"
          : "@"
      }${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}`
    : null;

  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{message}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {retry && (
          <button
            onClick={retry}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Try Again
          </button>
        )}
        {showYouTubeLink && youtubeUrl && (
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-red-600 hover:bg-red-700 text-white border-0 inline-flex items-center"
            )}
          >
            <YoutubeIcon className="mr-2 h-5 w-5" />
            Visit YouTube Channel
          </a>
        )}
      </div>
    </div>
  );
}
