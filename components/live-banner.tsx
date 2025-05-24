'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, Radio } from 'lucide-react';
import type { ChannelInfo } from '@/lib/youtube';

interface LiveBannerProps {
  channelInfo: ChannelInfo;
  inverted?: boolean;
}

export default function LiveBanner({ channelInfo, inverted = false }: LiveBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a slight delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!channelInfo.isLive) {
    return null;
  }
  
  return (
    <div 
      className={cn(
        "w-full rounded-lg p-4 flex items-center justify-between transition-all duration-500",
        inverted 
          ? "bg-white/20 text-white" 
          : "bg-red-600/10 border border-red-600/20 text-red-600",
        isVisible ? "opacity-100 transform-none" : "opacity-0 -translate-y-4"
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="relative flex-shrink-0">
          <Radio className="h-6 w-6 animate-pulse" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
        </div>
        <div>
          <p className="font-medium">
            {channelInfo.name} is live now!
          </p>
          <p className={cn("text-sm", inverted ? "text-white/80" : "text-red-600/80")}>
            {channelInfo.liveStreamTitle}
          </p>
        </div>
      </div>
      <Button 
        asChild 
        size="sm"
        className={cn(
          inverted 
            ? "bg-white text-primary hover:bg-white/90" 
            : "bg-red-600 text-white hover:bg-red-700"
        )}
      >
        <a 
          href={`https://www.youtube.com/watch?v=${channelInfo.liveStreamId}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Watch Now
        </a>
      </Button>
    </div>
  );
}