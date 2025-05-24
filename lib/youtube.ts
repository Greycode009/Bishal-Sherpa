export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  duration: string;
}

export interface ChannelInfo {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  subscriberCount: number;
  videoCount: number;
  isLive: boolean;
  liveStreamId?: string;
  liveStreamTitle?: string;
}

export class YouTubeAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "YouTubeAPIError";
  }
}

async function fetchWithTimeout(url: string, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    // Check for YouTube API specific errors
    if (!response.ok || data.error) {
      const status = response.status;
      const message = data.error?.message || `HTTP error! status: ${status}`;

      // Handle specific error cases
      if (status === 403) {
        console.error(
          `YouTube API error (${status}):`,
          data.error?.message || "Quota exceeded or API key invalid"
        );
        throw new YouTubeAPIError(
          "Unable to access YouTube data. Please try again later.",
          status
        );
      }

      if (status === 404) {
        console.error("YouTube channel or resource not found");
        throw new YouTubeAPIError(
          "Channel not found. Please check the channel ID.",
          status
        );
      }

      throw new YouTubeAPIError(message, status);
    }

    return data;
  } catch (error) {
    if (error instanceof YouTubeAPIError) {
      throw error;
    }

    if (error.name === "AbortError") {
      throw new YouTubeAPIError("Request timed out. Please try again.");
    }

    // Handle network errors
    console.error("Network error:", error);
    throw new YouTubeAPIError(
      "Unable to connect to YouTube. Please check your connection."
    );
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch latest videos from YouTube channel
 */
export async function getLatestVideos(
  limit: number = 6
): Promise<YouTubeVideo[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      throw new YouTubeAPIError("YouTube API key or channel ID not set");
    }

    // First get channel info
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&key=${apiKey}&${
      channelId.startsWith("UC") ? "id=" : "forUsername="
    }${channelId}`;

    const channelResponse = await fetchWithTimeout(channelUrl);

    if (!channelResponse.items?.length) {
      // Try searching by handle if direct lookup fails
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelId}&key=${apiKey}`;
      const searchResponse = await fetchWithTimeout(searchUrl);

      if (!searchResponse.items?.length) {
        throw new YouTubeAPIError("Channel not found");
      }

      // Use the found channel ID
      const foundChannelId = searchResponse.items[0].id.channelId;
      const foundChannelResponse = await fetchWithTimeout(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${foundChannelId}&key=${apiKey}`
      );

      if (!foundChannelResponse.items?.length) {
        throw new YouTubeAPIError("Channel details not accessible");
      }

      channelResponse.items = foundChannelResponse.items;
    }

    const uploadsPlaylistId =
      channelResponse.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      throw new YouTubeAPIError("Could not find uploads playlist");
    }

    // Get videos from the uploads playlist
    const playlistResponse = await fetchWithTimeout(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${limit}&playlistId=${uploadsPlaylistId}&key=${apiKey}`
    );

    if (!playlistResponse.items?.length) {
      return [];
    }

    // Get video IDs and fetch detailed information
    const videoIds = playlistResponse.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(",");
    const videosResponse = await fetchWithTimeout(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`
    );

    return videosResponse.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
      viewCount: parseInt(item.statistics.viewCount, 10),
      duration: item.contentDetails.duration,
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error;
  }
}

/**
 * Get channel information and check if it's currently live
 */
export async function getChannelInfo(): Promise<ChannelInfo> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      console.warn("YouTube API key or channel ID not set");
      return {
        id: "",
        name: "",
        description: "",
        thumbnail: "",
        subscriberCount: 0,
        videoCount: 0,
        isLive: false,
      };
    }

    // Try direct channel lookup first
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&key=${apiKey}&${
      channelId.startsWith("UC") ? "id=" : "forUsername="
    }${channelId}`;

    const channelResponse = await fetchWithTimeout(channelUrl);

    let channel;
    if (!channelResponse.items?.length) {
      // Try searching by handle if direct lookup fails
      console.log("Channel not found, trying search...");
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelId}&key=${apiKey}`;
      const searchResponse = await fetchWithTimeout(searchUrl);

      if (!searchResponse.items?.length) {
        throw new YouTubeAPIError("Channel not found");
      }

      // Use the found channel ID to get full details
      const foundChannelId = searchResponse.items[0].id.channelId;
      const foundChannelResponse = await fetchWithTimeout(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${foundChannelId}&key=${apiKey}`
      );

      if (!foundChannelResponse.items?.length) {
        throw new YouTubeAPIError("Channel details not accessible");
      }

      channel = foundChannelResponse.items[0];
    } else {
      channel = channelResponse.items[0];
    }

    // Check if the channel is currently live
    const searchResponse = await fetchWithTimeout(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&eventType=live&type=video&key=${apiKey}`
    );

    const liveStream = searchResponse.items?.[0]; // First result if live

    return {
      id: channel.id,
      name: channel.snippet.title,
      description: channel.snippet.description,
      thumbnail: channel.snippet.thumbnails.default.url,
      subscriberCount: parseInt(channel.statistics.subscriberCount, 10),
      videoCount: parseInt(channel.statistics.videoCount, 10),
      isLive: !!liveStream,
      liveStreamId: liveStream?.id.videoId,
      liveStreamTitle: liveStream?.snippet.title,
    };
  } catch (error) {
    console.error("Error fetching channel info:", error);
    if (error instanceof YouTubeAPIError) {
      throw error; // Re-throw YouTubeAPIError with specific message
    }
    // Convert unknown errors to YouTubeAPIError with a friendly message
    throw new YouTubeAPIError(
      "Unable to load channel content. Please try again later."
    );
  }
}
