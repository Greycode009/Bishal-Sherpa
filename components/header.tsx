"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { Menu, ChevronRight, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "YouTube", href: "/youtube" },
  { label: "Contact", href: "/contact" },
];

// ✅ Safe logic outside component
const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export const youtubeUrl = channelId
  ? channelId.startsWith("UCuUnxCnWpEP9d9XSe6uGsLw")
    ? `https://youtube.com/channel/${channelId}?sub_confirmation=1`
    : `https://youtube.com/@${channelId}?sub_confirmation=1`
  : null;


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-200 backdrop-blur-sm",
        isScrolled ? "bg-background/90 border-b shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif font-bold text-xl transition-colors hover:text-primary"
        >
          <ChevronRight className="h-6 w-6" />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-md font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild>
            <a
              href={youtubeUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 border rounded text-sm"
            >
              Subscribe
            </a>
          </Button>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
  <SheetTrigger asChild>
    <Button variant={"ghost"} size={"icon"} aria-label="Menu">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>

  <SheetContent side="right" className="w-[80vw] sm:w-[350px] flex flex-col">
    <div className="flex items-center justify-between mb-6 p-4">
      <div className="flex items-center gap-2 font-serif font-bold text-xl">
        <ChevronRight className="h-6 w-6" />
        <span>{siteConfig.name}</span>
      </div>

    </div>
    <nav className="flex flex-col gap-4 px-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-lg font-medium py-2 transition-colors hover:text-primary"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
    <div className="mt-auto pt-6 px-4 pb-4">
      <Button asChild>
        <a
          href={youtubeUrl ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white border-red-600/50 bg-red-600 hover:border-red-700 px-4 py-2 border rounded text-sm"
        >
          Subscribe to YouTube
        </a>
      </Button>
    </div>
  </SheetContent>
</Sheet>

        </div>
      </div>
    </header>
  );
}
