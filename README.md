# Bishal Sherpa's Website

A personal website built with Next.js, featuring YouTube integration, a contact form, and a modern UI design.

## Features

- 🎥 YouTube Integration
  - Display latest videos
  - Live stream status
  - Channel statistics
  - Subscribe button
- 📝 Contact Form
  - Email notifications using Resend
  - Form validation
  - Loading states
  - Success/error handling
- 🎨 Modern UI/UX
  - Responsive design
  - Dark/light mode
  - Loading skeletons
  - Error boundaries
  - Beautiful animations
- ⚡ Performance
  - Server-side rendering
  - Image optimization
  - API route handlers
  - Environment variables

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [YouTube API](https://developers.google.com/youtube/v3) - YouTube integration
- [Resend](https://resend.com/) - Email service

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id
NEXT_PUBLIC_CONTACT_EMAIL=your_email@example.com
RESEND_API_KEY=your_resend_api_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - React components
- `/lib` - Utility functions and configurations
- `/public` - Static assets
- `/styles` - Global styles

## Environment Variables

- `NEXT_PUBLIC_YOUTUBE_API_KEY` - YouTube Data API v3 key
- `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` - YouTube channel ID or handle
- `NEXT_PUBLIC_CONTACT_EMAIL` - Email for receiving contact form submissions
- `RESEND_API_KEY` - Resend API key for email service

## Contact Form Setup

1. Sign up for [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Add the API key to `.env.local`
4. Configure your sending domain (optional)

## YouTube Integration Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable YouTube Data API v3
3. Create API credentials
4. Add your channel ID/handle to environment variables

## Contributing

Feel free to contribute to this project. Open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
