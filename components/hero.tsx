"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { YoutubeIcon } from "lucide-react";
import LiveBanner from "@/components/live-banner";
import type { ChannelInfo } from "@/lib/youtube";

interface HeroProps {
  title: string;
  subtitle: string;
  channelInfo: ChannelInfo;
}

export default function Hero({ title, subtitle, channelInfo }: HeroProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const youtubeUrl = channelInfo?.id
    ? `https://youtube.com/channel/${channelInfo.id}`
    : `https://youtube.com/@${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}`;

  return (
    <div className="relative w-full bg-white dark:bg-neutral-900 pt-28 pb-20 overflow-hidden border solid rounded-xl px-4 md:px-8">
      {/* Animated Chess Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="chess-board"></div>
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center px-4 md:px-0">
        <Image
          src="https://i.postimg.cc/gkb7zy27/image.png"
          alt="Bishal Sherpa"
          width={160}
          height={160}
          className={cn(
            "rounded-full mb-4 shadow-lg object-cover border-4 border-white dark:border-neutral-800 transition-all duration-700",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          priority
        />
        <h1
          className={cn(
            "text-4xl md:text-6xl font-serif font-bold text-primary-950 dark:text-white mb-2 md:mb-4 transition-all duration-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-xl md:text-2xl text-primary-700 dark:text-neutral-300 mb-6 md:mb-8 max-w-2xl transition-all duration-700 delay-150",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {subtitle}
        </p>

        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 mb-8 md:mb-10 transition-all duration-700 delay-300",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <a
            href={`${youtubeUrl}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-red-600 hover:bg-red-700 text-white"
            )}
          >
            <YoutubeIcon className="mr-2 h-5 w-5" />
            Subscribe
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "bg-transparent text-primary-950 dark:text-white border-primary-200 dark:border-neutral-700 hover:bg-primary-50 dark:hover:bg-neutral-800"
            )}
          >
            Get In Touch
          </Link>
        </div>

        <div
          className={cn(
            "w-full max-w-2xl transition-all duration-700 delay-450",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {channelInfo && <LiveBanner channelInfo={channelInfo} inverted />}
        </div>
      </div>

      <style jsx>{`
        .chess-board {
          position: absolute;
          width: 200%;
          height: 200%;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.1) 3px,
            transparent 4px
          );
          background-size: 40px 40px;
          animation: moveBoard 100s linear infinite;
          left: -50%;
          top: -50%;
        }

        @keyframes moveBoard {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.5);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
