# 🚀 Portfolio CMS

A modern, full-stack portfolio website with a built-in Content Management System (CMS). Built with Next.js 16, TypeScript, and Supabase, this application allows developers to showcase their work, skills, and achievements with a beautiful, responsive interface.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3ECFF8?style=flat-square&logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### Public Portfolio

- 🏠 **Home Page** - Dynamic profile showcase with skills, career, and achievements
- 📂 **Projects** - Project gallery with detailed views and technology tags
- 🏆 **Certificates** - Organized certificate display with categories
- 📧 **Contact Form** - Functional contact form with message storage
- 📊 **GitHub Contributions** - Interactive contribution graph

### Admin Dashboard

- 🔐 **Secure Authentication** - OTP-based login with JWT tokens
- 👤 **Profile Management** - Update personal information and social links
- 💼 **Career History** - Manage work experience and positions
- 🛠️ **Skills Management** - Organize technical skills by category
- 🏅 **Achievements** - Track awards and accomplishments
- 📁 **Projects CMS** - Full CRUD operations for portfolio projects
- 📜 **Certificates CMS** - Manage certifications with star ratings
- 📄 **CV Management** - Upload and manage resume files

### Technical Features

- 🌍 **Internationalization** - English and Indonesian language support
- 🌓 **Theme Support** - Dark/light mode with system preference detection
- 📱 **Responsive Design** - Mobile-first approach with sidebar navigation
- ⚡ **Performance** - Optimized with React Query and server components
- 🎨 **Modern UI** - Built with Radix UI and Tailwind CSS
- 🔒 **Type Safety** - Full TypeScript implementation

## 🛠️ Tech Stack

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| **Framework**        | Next.js 16 (App Router)      |
| **Language**         | TypeScript 5                 |
| **Styling**          | Tailwind CSS 4               |
| **UI Components**    | Radix UI, Shadcn/ui          |
| **Database**         | Supabase (PostgreSQL)        |
| **State Management** | React Query (TanStack Query) |
| **Forms**            | React Hook Form, Zod         |
| **Animations**       | Framer Motion                |
| **Icons**            | Lucide React, Tabler Icons   |
| **i18n**             | next-intl                    |
| **Authentication**   | Custom OTP with JWT          |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+
- npm, yarn, pnpm, or bun
- A Supabase account and project

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portofolio-cms.git
cd portofolio-cms
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API to get your credentials
3. Run the database schema from [`docs/supabase-schema.sql`](docs/supabase-schema.sql:1) in the Supabase SQL Editor
4. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
portofolio-cms/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public pages
│   │   ├── page.tsx         # Home page
│   │   ├── projects/        # Projects pages
│   │   ├── certificates/    # Certificates pages
│   │   └── contact/         # Contact page
│   ├── dashboard/           # Admin dashboard
│   ├── login/               # Authentication
│   ├── actions/             # Server actions
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   ├── features/           # Feature-specific components
│   └── examples/           # Example components
├── hooks/                  # Custom React hooks
│   ├── use-profile.ts
│   ├── use-skills.ts
│   ├── use-career.ts
│   └── ...
├── lib/                    # Utility functions
│   ├── supabase.ts         # Supabase client
│   ├── i18n-helpers.ts    # i18n utilities
│   └── schemas.ts          # Zod validation schemas
├── services/               # API service layer
│   ├── home.service.ts
│   ├── project.service.ts
│   └── ...
├── types/                  # TypeScript definitions
│   └── index.ts
├── i18n/                   # Internationalization config
├── messages/               # Translation files
│   ├── en.json            # English translations
│   └── id.json            # Indonesian translations
├── docs/                   # Documentation
│   └── supabase-schema.sql
└── public/                 # Static assets
```

## 🔐 Authentication

The application uses a custom OTP-based authentication system:

1. Users enter their email
2. An OTP code is generated and sent (implementation required)
3. User enters the OTP to verify
4. Upon successful verification, a JWT token is issued
5. The token is stored and used for authenticated requests

**Note:** You'll need to implement the email sending service for OTP delivery.

## 🌍 Internationalization

The application supports multiple languages through `next-intl`:

- **English (en)** - Default language
- **Indonesian (id)** - Secondary language

To add a new language:

1. Create a new translation file in [`messages/`](messages/)
2. Update the locale configuration in [`i18n/config.ts`](i18n/config.ts:1)
3. Add language switcher options if needed

## 📊 Database Schema

The application uses Supabase with the following main tables:

| Table               | Purpose                               |
| ------------------- | ------------------------------------- |
| `user_profile`      | Personal information and social links |
| `user_description`  | Bio/description with i18n support     |
| `user_skills`       | Technical skills by category          |
| `user_career`       | Work experience history               |
| `user_achievements` | Awards and accomplishments            |
| `user_cv`           | Resume/CV files                       |
| `user_projects`     | Portfolio projects                    |
| `user_certificates` | Certifications                        |
| `contacts`          | Contact form submissions              |

See [`docs/supabase-schema.sql`](docs/supabase-schema.sql:1) for the complete schema.

## 🎨 Customization

### Theme Colors

Modify the theme colors in [`app/globals.css`](app/globals.css:1) or use CSS variables.

### Fonts

The application uses Roboto and Roboto Mono fonts. Change them in [`app/layout.tsx`](app/layout.tsx:9).

### UI Components

All UI components are located in [`components/ui/`](components/ui/) and can be customized as needed.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- Render
- AWS Amplify
- Self-hosted (Node.js server)

## 📝 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Syahridho Arjuna Syahputra**

- Portfolio: [Your Portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - The backend platform
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact me through the portfolio contact form.

---

Made with ❤️ using Next.js and TypeScript
