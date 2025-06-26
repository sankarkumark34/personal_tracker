# 🚀 Personal Tracker - Next.js Edition

A comprehensive personal tracking application built with Next.js, TypeScript, Firebase Authentication, and Ant Design. Track your progress across professional, physical, and personal goals with a beautiful, modern interface.

## 🌟 Features

- **🔐 Firebase Authentication**
  - Email/Password login and signup
  - Google OAuth integration
  - Password reset functionality
  - Secure session management

- **📊 Personal Dashboard**
  - Progress tracking across multiple categories
  - Visual progress indicators
  - Statistics and analytics
  - Goal management

- **🎨 Modern UI/UX**
  - Beautiful gradient backgrounds
  - Responsive design with Tailwind CSS
  - Ant Design components
  - Smooth animations and transitions

- **⚡ Full-Stack Architecture**
  - Next.js App Router
  - API routes for backend functionality
  - TypeScript for type safety
  - Client-side and server-side rendering

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Ant Design
- **Authentication**: Firebase Auth
- **Backend**: Next.js API Routes
- **Database**: Firebase (ready for integration)
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-modern-app-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password and Google providers
   - Copy your Firebase config

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/           # Authentication API routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── auth/              # Authentication components
│   │   ├── AuthContainer.tsx
│   │   ├── LoginForm.tsx
│   │   ├── SignUpForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   └── GoogleSignInButton.tsx
│   └── Dashboard.tsx      # Main dashboard
├── config/
│   └── firebase.ts        # Firebase configuration
├── services/
│   └── firebaseAuthService.ts  # Authentication service
└── types/
    └── auth.ts            # TypeScript type definitions
```

## 🔧 API Routes

The application includes the following API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration  
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/logout` - User logout

## 🎯 Usage

1. **Authentication**
   - Sign up with email/password or Google
   - Login to access your dashboard
   - Reset password if needed

2. **Dashboard**
   - View your progress across different categories
   - Track professional, physical, and personal goals
   - Monitor statistics and streaks

3. **Profile Management**
   - Update your profile information
   - Manage account settings
   - Logout securely

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🔒 Security Features

- Firebase Authentication integration
- Secure API routes with validation
- Protected routes and components
- Environment variables for sensitive data
- CORS and security headers

## 🎨 Customization

The application is highly customizable:

- **Themes**: Modify the Ant Design theme in `page.tsx`
- **Colors**: Update Tailwind colors in `tailwind.config.js`
- **Components**: Extend or modify components in `/components`
- **API**: Add new API routes in `/app/api`

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Ant Design for beautiful UI components
- Firebase for authentication services
- Tailwind CSS for utility-first styling

---

**Happy Tracking! 🎉**
