import { Metadata } from 'next';
import { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';
import SocialLinks from '@/components/social-links';
import { siteConfig } from '@/lib/site-config';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Get in touch with Bishal Sherpa for collaborations, coaching, or just to say hello.',
};

export default function ContactPage() {
  return (
    <div className="container max-w-5xl py-12 mt-8">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Contact Me</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-lg mb-6">
            I'm always open to collaborations, coaching opportunities, or just chatting about chess.
            Feel free to reach out using the form or connect with me on social media.
          </p>
          
          <Card className="p-6 mb-8">
            <div className="flex items-start mb-4">
              <Mail className="h-5 w-5 mr-3 mt-1 text-primary" />
              <div>
                <h3 className="text-lg font-medium mb-1">Email</h3>
                <a 
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} 
                  className="text-primary hover:underline"
                >
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MessageSquare className="h-5 w-5 mr-3 mt-1 text-primary" />
              <div>
                <h3 className="text-lg font-medium mb-1">Discord</h3>
                <p>Join my Discord server for community discussions, game analysis, and more.</p>
              </div>
            </div>
          </Card>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Connect With Me</h3>
            <SocialLinks className="flex gap-4" iconSize={24} />
          </div>
        </div>
        
        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Send Me a Message</h2>
            <Suspense fallback={<p>Loading form...</p>}>
              <ContactForm />
            </Suspense>
          </Card>
        </div>
      </div>
    </div>
  );
}