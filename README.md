# AstrAID - Canine Training Assistant

AstrAID is a modern, mobile-friendly web application that helps pet owners access and discuss canine training guides. The platform combines a public Training Knowledge Hub with an AI chat assistant powered by a self-hosted Gemma 3 model (served through Ollama), plus secure user login to save chats and personalized training plans.

## Features

- **Public Training Knowledge Hub**: Browse and read comprehensive dog training guides without requiring login
- **AI Chat Assistant**: Get personalized training advice using the Gemma 3b model via Ollama
- **User Authentication**: Secure email/password login with role-based access (user/admin)
- **Training Plan Builder**: Create customized training schedules based on available guides
- **Admin Panel**: Manage users and access control

## Tech Stack

- **Next.js 14 App Router** with TypeScript
- **Tailwind CSS** for styling
- **Prisma ORM** with SQLite (designed to be easily migrated to PostgreSQL)
- **next-auth** for authentication and authorization
- **Zod** for runtime validation
- **React-Hook-Form** for form handling
- **@tanstack/react-query** for client data fetching/caching

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Ollama installed locally with the Gemma 3b model

### Installation

1. Clone the repository

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up your environment variables by creating a `.env.local` file:
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET=changeme
   NEXTAUTH_URL=http://localhost:3000
   OLLAMA_URL=http://localhost:11434
   GEMMA_MODEL=gemma:3b-instruct
   ```

4. Generate the database and seed it with example data
   ```bash
   npx prisma migrate dev --name init
   pnpm ts-node prisma/seed.ts
   ```

5. Start Ollama with the Gemma 3b model
   ```bash
   ollama run gemma:3b-instruct
   ```

6. Start the development server
   ```bash
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser

## Default Users

After running the seed script, you can log in with these credentials:

- **Admin User**:
  - Email: admin@astraid.com
  - Password: admin123

- **Regular User**:
  - Email: user@example.com
  - Password: user123

## Project Structure

```
app/
  (routes)/              # Main application routes
    page.tsx             # Landing page
    about/page.tsx       # About Us page
    hub/                 # Training Knowledge Hub
      page.tsx           # Guide list
      [slug]/page.tsx    # Guide detail
    chat/page.tsx        # AI assistant
    admin/...            # Admin panel
components/              # Reusable UI components
lib/                     # Utility functions and services
prisma/                  # Database schema and migrations
  schema.prisma
  seed.ts
```

## License

This project is licensed under the MIT License.
