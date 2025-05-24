import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/lib/site-config';
import { BookOpen, Trophy, Users, Clock, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Bishal Sherpa, chess content creator and gaming enthusiast.',
};

export default function AboutPage() {
  return (
    <div className="container max-w-5xl py-12 mt-8 space-y-16">
      <section>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About Me</h1>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-lg mb-4">
              Hello! I'm Bishal Sherpa, a passionate chess player, educator, and content creator. 
              My journey with chess began from last year, and it has been 
              a lifelong passion ever since.
            </p>
            <p className="text-lg mb-4">
              Through my YouTube channel, I share my love for chess with tutorials, game analysis, 
              opening strategies, and occasional live streams where we can all learn together.
            </p>
            <p className="text-lg mb-4">
              When I'm not moving pieces on the board, I also enjoy exploring other games 
              and sharing those experiences with my community.
            </p>
            <div className="flex items-center mt-6">
              <ChevronRight className="h-6 w-6 mr-2 text-primary" />
              <span className="text-lg font-medium">Chess.com Rating: 1500</span>
            </div>
          </div>
          <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="https://i.postimg.cc/gkb7zy27/image.png"
              alt="Bishal Sherpa portrait" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-3xl font-serif font-bold mb-8">My Chess Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 mr-3 text-chart-1" />
                <h3 className="text-xl font-bold">Started</h3>
              </div>
              <p>Began playing chess at the age of 10, learning from my grandfather who was a local champion.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Trophy className="h-8 w-8 mr-3 text-chart-2" />
                <h3 className="text-xl font-bold">Competitions</h3>
              </div>
              <p>Participated in over 50 national tournaments and achieved the title of National Master in 2021.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 mr-3 text-chart-3" />
                <h3 className="text-xl font-bold">Teaching</h3>
              </div>
              <p>Coached junior players for 5 years and developed a unique approach to teaching chess fundamentals.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 mr-3 text-chart-4" />
                <h3 className="text-xl font-bold">Content</h3>
              </div>
              <p>Created a YouTube channel in 2020 to share chess knowledge and build a community of enthusiasts.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-3xl font-serif font-bold mb-8">What I Create</h2>
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-3">Chess Tutorials</h3>
              <p className="text-muted-foreground">
                Step-by-step guides on openings, middlegame tactics, endgame techniques, and puzzle solutions
                designed for players of all levels.
              </p>
            </div>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-md order-1 md:order-2">
              <Image 
                src="https://images.pexels.com/photos/7994815/pexels-photo-7994815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Chess tutorial" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-md">
              <Image 
                src="https://images.pexels.com/photos/6686455/pexels-photo-6686455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Game analysis" 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Game Analysis</h3>
              <p className="text-muted-foreground">
                Detailed breakdowns of my games and famous matches, highlighting critical decisions,
                missed opportunities, and brilliant moves.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-3">Live Streams</h3>
              <p className="text-muted-foreground">
                Interactive sessions where we play together, analyze games in real-time, and 
                have fun with various chess challenges and formats.
              </p>
            </div>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-md order-1 md:order-2">
              <Image 
                src="https://images.pexels.com/photos/7256897/pexels-photo-7256897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Live stream setup" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}