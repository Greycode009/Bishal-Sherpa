import { Metadata } from "next";
import { Suspense } from "react";
import {
  getLatestVideos,
  getChannelInfo,
  type ChannelInfo,
  type YouTubeVideo,
  YouTubeAPIError,
} from "@/lib/youtube";
import VideoGrid from "@/components/video-grid";
import LiveBanner from "@/components/live-banner";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingBoundary } from "@/components/loading-boundary";
import { ErrorUI } from "@/components/error-ui";
import { siteConfig } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { YoutubeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "YouTube Videos",
  description:
    "Join Bishal Sherpa for chess tutorials, game analyses, and entertaining live streams filled with humor and insights. Known for his engaging style and witty jokes!",
};

export const revalidate = 1800; // Revalidate every 30 minutes

export default async function YoutubePage() {
  let channelInfo: ChannelInfo;
  let videos: YouTubeVideo[] = [];
  let errorTitle = "Could not load content";
  let errorMessage = "We're having trouble loading the YouTube content. Please try again later.";
  let hasError = false;

  try {
    [channelInfo, videos] = await Promise.all([
      getChannelInfo(),
      getLatestVideos(12),
    ]);
  } catch (error: unknown) {
    console.error("Error fetching YouTube data:", error);
    hasError = true;
    // Set specific error messages based on the error type
    if (error instanceof YouTubeAPIError) {
      if (error.status === 403) {
        errorMessage = "We've reached our YouTube API limit. Please try again in a few minutes.";
      } else if (error.status === 404) {
        errorMessage = "The YouTube channel could not be found. Please check if the channel ID is correct.";
      } else {
        errorMessage = error.message;
      }
    }
    
    channelInfo = {
      id: "",
      name: "Bishal Sherpa",
      description: "",
      thumbnail: "",
      subscriberCount: 0,
      videoCount: 0,
      isLive: false,
    };
  }

  if (hasError) {
    return (
      <div className="container max-w-5xl mt-8 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          YouTube Channel
        </h1>
        <ErrorUI
          title={errorTitle}
          message={errorMessage}
          showYouTubeLink
        />
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mt-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            YouTube Channel
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Join me for chess tutorials, game analyses, and live streams! Known for mixing expert chess insights 
            with entertaining jokes and a fun atmosphere. Don't forget to subscribe!
          </p>
        </div>
        <a
          href={
            channelInfo?.id
              ? `https://youtube.com/channel/${channelInfo.id}?sub_confirmation=1`
              : `https://youtube.com/@${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}?sub_confirmation=1`
          }
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-red-600 hover:bg-red-700 text-white mt-4 md:mt-0"
          )}
        >
          <YoutubeIcon className="mr-2 h-5 w-5" />
          Subscribe ({channelInfo.subscriberCount.toLocaleString()} subscribers)
        </a>
      </div>

      {/* Live Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Live Stream</h2>
        <LoadingBoundary
          fallback={
            <div className="w-full h-20 bg-secondary/50 animate-pulse rounded-lg" />
          }
        >
          {channelInfo.isLive ? (
            <LiveBanner channelInfo={channelInfo} />
          ) : (
            <div className="text-center py-8 bg-secondary/10 rounded-lg">
              <p className="text-muted-foreground">
                Not streaming right now. Subscribe to get notified when we go
                live!
              </p>
            </div>
          )}
        </LoadingBoundary>
      </section>

      {/* Videos Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Videos</h2>
        <LoadingBoundary
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="w-full aspect-video rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
            </div>
          }
        >
          <VideoGrid videos={videos} />
        </LoadingBoundary>
      </section>

      {/* Stats Section */}
      <section className="mt-16 bg-card rounded-lg p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold mb-2">
              {channelInfo.videoCount.toLocaleString()}
            </p>
            <p className="text-muted-foreground">Total Videos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold mb-2">
              {channelInfo.subscriberCount.toLocaleString()}
            </p>
            <p className="text-muted-foreground">Subscribers</p>
          </div>
        </div>
      </section>
    </div>
  );
}
