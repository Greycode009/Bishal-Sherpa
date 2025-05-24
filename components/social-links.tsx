import React from "react";
import { cn } from "@/lib/utils";
import { FaYoutube, FaInstagram, FaDiscord, FaTiktok } from "react-icons/fa6";

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export default function SocialLinks({
  className,
  iconSize = 20,
}: SocialLinksProps) {
  const socialLinks = [
    {
      name: "YouTube",
      url: `https://youtube.com/@${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}`,
      icon: FaYoutube,
      color: "text-red-600 hover:text-red-700",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/iambishal.1",
      icon: FaInstagram,
      color: "text-pink-600 hover:text-pink-700",
    },
    {
      name: "Discord",
      url: "https://discord.gg/MvycvSPZxw",
      icon: FaDiscord,
      color: "text-indigo-600 hover:text-indigo-700",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@iambishal.1",
      icon: FaTiktok,
      color:
        "text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300",
    },
  ];

  return (
    <div className={cn("flex", className)}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className={cn("transition-colors", link.color)}
        >
          {React.createElement(link.icon, {
            size: iconSize,
          })}
        </a>
      ))}
    </div>
  );
}
