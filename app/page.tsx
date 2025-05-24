import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Hero from "@/components/hero";
import VideoGrid from "@/components/video-grid";
import {
  getLatestVideos,
  getChannelInfo,
  type YouTubeVideo,
  type ChannelInfo,
} from "@/lib/youtube";
import { siteConfig } from "@/lib/site-config";
import { ChevronRight, Youtube } from "lucide-react";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  let channelInfo: ChannelInfo;
  let videos: YouTubeVideo[] = [];
  let error = false;

  try {
    // Fetch data in parallel with a timeout
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), 10000)
    );

    const [channelData, videosData] = (await Promise.race([
      Promise.all([getChannelInfo(), getLatestVideos(6)]),
      timeout,
    ])) as [ChannelInfo, YouTubeVideo[]];

    channelInfo = channelData;
    videos = videosData;
  } catch (e) {
    console.error("Error fetching YouTube data:", e);
    error = true;
    channelInfo = {
      id: "",
      name: "Bishal Sherpa",
      description: "Chess Content Creator & Gamer",
      thumbnail: "",
      subscriberCount: 0,
      videoCount: 0,
      isLive: false,
    };
  }

  return (
    <div className="flex flex-col items-center">
      <Hero
        title="Bishal Sherpa"
        subtitle="Chess Content Creator & Gamer"
        channelInfo={channelInfo}
      />

      {error ? (
        <section className="w-full max-w-5xl mx-auto py-16 px-4 md:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Could not load content</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              We're having trouble loading some content. Please check back
              later.
            </p>
          </div>
        </section>
      ) : (
        <section className="w-full max-w-5xl mx-auto py-16 px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Welcome to My Chess Universe
              </h2>
              <p className="text-muted-foreground mb-4">
                Hey there! I'm Bishal, a passionate chess enthusiast, educator,
                and content creator. Through my YouTube channel, I share
                fascinating chess insights, game analysis, tutorials, and
                occasionally venture into other gaming territories.
              </p>
              <div className="flex gap-3 mb-6">
                <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                  Chess Analysis
                </Badge>
                <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                  Tutorials
                </Badge>
                <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                  Gaming
                </Badge>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/youtube"
                  className={buttonVariants({
                    size: "lg",
                  })}
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  Watch My Videos
                </Link>
                <Link
                  href={`https://youtube.com/${
                    channelInfo?.id
                      ? "channel/" + channelInfo.id
                      : "@bishalsherpaofficial"
                  }?sub_confirmation=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    size: "lg",
                    variant: "destructive",
                    className: "bg-red-600 hover:bg-red-700",
                  })}
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  Subscribe on YouTube
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                {videos.length > 0 && (
                  <Link
                    href="/youtube"
                    className="block w-full h-full relative group"
                  >
                    <Image
                      src={videos[0].thumbnail}
                      alt={videos[0].title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-12 h-12 text-white" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
