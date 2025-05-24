import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import type { YouTubeVideo } from '@/lib/youtube';

interface VideoGridProps {
  videos: YouTubeVideo[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No videos found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

function VideoCard({ video }: { video: YouTubeVideo }) {
  return (
    <a 
      href={`https://www.youtube.com/watch?v=${video.id}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group"
    >
      <Card className="overflow-hidden bg-card hover:shadow-md transition-all">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {formatVideoDuration(video.duration)}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-md line-clamp-2 mb-1">
            {video.title}
          </h3>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{formatViewCount(video.viewCount)} views</span>
            <span>{formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

// Utility functions
function formatVideoDuration(duration: string): string {
  // ISO 8601 format (PT1H2M3S) to human-readable (1:02:03)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}