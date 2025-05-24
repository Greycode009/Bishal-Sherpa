import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import SocialLinks from '@/components/social-links';
import { ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-secondary/20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 font-serif font-bold text-xl mb-4"
            >
              <ChevronRight className="h-6 w-6" />
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Sharing my passion for chess through tutorials, game analysis, 
              and entertaining content. Join me on this chess journey!
            </p>
            <SocialLinks className="flex gap-4" />
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/youtube" className="text-muted-foreground hover:text-foreground transition-colors">
                  YouTube Videos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.chess.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Chess.com
                </a>
              </li>
              <li>
                <a 
                  href="https://lichess.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lichess.org
                </a>
              </li>
              <li>
                <a 
                  href="https://www.fide.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FIDE
                </a>
              </li>
              <li>
                <a 
                  href={`https://youtube.com/channel/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  My YouTube Channel
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}