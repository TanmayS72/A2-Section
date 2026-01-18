# A2 Chronicles: The Techcup Showcase
A2 Chronicles is an immersive, story-driven, 3D-powered web experience built to represent the talent, unity, memories, and achievements of Section A2. Designed and developed for Techcup, the platform goes beyond a traditional website—serving as a digital time capsule that blends technology, storytelling, and interaction.

## 🌟 Project Vision
The goal of this project was to create a modern, emotionally engaging digital showcase that captures:

The journey of Section A2

Collective achievements and milestones

Personal voices and reflections

Shared memories and hidden stories

By combining advanced frontend technologies with thoughtful UX design, the website reflects both technical excellence and human connection.

## 🌐 Website Sections Overview
### 🏠 Home
The Home section is the primary entry point to the platform. It establishes the identity of Section A2, introduces the overall theme, and provides intuitive navigation to all major sections of the website.

### 🧭 Journey
The Journey section narrates the collective path of Section A2—from the beginning to the Techcup experience. It presents milestones, growth, and key events in a structured, storytelling-focused layout that emphasizes progression and unity.

### 🧠 Memories
The Memories section is an interactive 3D memory wall showcasing photos and moments captured throughout the year. Users can explore individual memories placed in a spatial layout, making the experience immersive and emotionally engaging.

### 🏆 Achievements
The Achievements section highlights what Section A2 accomplished together. It combines statistics, milestones, and visual indicators to showcase participation, wins, celebrations, and overall impact—reinforcing collective pride.

### 🗣️ Voices
The Voices section features personal quotes and reflections from members of Section A2. These testimonials capture leadership experiences, late-night efforts, humor, and emotions—offering an authentic, human layer to the project.

### 📝 Blog
The Blog section acts as a written archive of stories, reflections, and moments. It allows users to explore deeper narratives behind events and memories, preserving A2’s journey through words and visuals.

### 🗄️ Backend, Database & Authentication (Supabase)

This project uses Supabase as a complete backend solution, handling authentication, database management, and media storage.

### 🔐 Authentication System

Supabase Authentication is integrated to enable secure user sign-in.

Authentication is primarily used on the Blog section.

Only authenticated users can access protected admin functionality.

Session handling ensures secure access across page reloads.

### 📝 Admin-Only Blog Access

The Blog section is strictly restricted to an admin account.

Only the admin can create, publish, or manage blog posts

Public users can view blog content but cannot post or modify anything

Authorization is enforced both at the UI level and via Supabase rules

### Admin Credentials (For Evaluation Only)
Email: tanmaysatbhai72@gmail.com
Password: asdfghjkl

## 🎁 Surprise
The Surprise section introduces an interactive Mystery Box experience. Each box unlocks a hidden story, inside joke, or memorable moment from A2’s history—designed to reward curiosity and preserve fun, secret memories in a playful format.

## 🛠️ Tech Stack
This project uses a modern, production-ready stack focused on performance, interactivity, and type safety.
Core
React 18
TypeScript
Vite
Styling & UI
Tailwind CSS
Shadcn UI (built on Radix Primitives)
3D & Animations
Three.js (@react-three/fiber, @react-three/drei)
GSAP
Framer Motion
State & Data Management
TanStack Query
React Context API
Backend & Authentication
Supabase
Forms & Validation
React Hook Form
Zod
Routing
React Router DOM

## ✨ Key Features
Immersive 3D scenes integrated seamlessly into the UI

Smooth scroll-based and timeline animations

Dark / Light mode support

Secure, validated forms

Real-time data fetching and caching

Interactive charts and data visualization

Responsive, touch-optimized carousels

Accessible, keyboard-navigable UI components

## ⚙️ Architecture & Implementation
Modular Codebase: Clean folder structure with reusable components

Type Safety: Strict TypeScript configuration to reduce runtime errors

Component Composition: Accessible Radix primitives styled with Tailwind CSS

Optimized Assets: 3D models and textures optimized for web performance

State Separation: Server state handled via TanStack Query, UI state via Context

## 🔍 SEO & Accessibility
The project follows modern SEO and accessibility best practices:

Semantic HTML (main, section, article)

Dynamic page titles and meta descriptions

ARIA labels and focus management

Keyboard-friendly interactions

Optimized Core Web Vitals (LCP, TBT, CLS)


## 🚀 Running the Project Locally
Clone the repository
git clone https://github.com/TanmayS72/A2-Section.git

Navigate into the project directory
cd A2-Section

Install dependencies
npm install

Start the development server
npm run dev

Open the URL shown in your terminal (usually http://localhost:5173) to view the project.

👥 Contributors

Tanmay Satbhai

Piyush Dhanuka

Mayank Dhapodkar

Aryan Jumde

Om Jaiswal

## 🏁 Conclusion
A2 Chronicles is more than a website—it is a digital representation of teamwork, creativity, and shared experiences. The project demonstrates how modern web technologies can be used not only to build performant applications, but also to tell meaningful stories.
 ## Git Commit History :
 <img width="1435" height="668" alt="image" src="https://github.com/user-attachments/assets/1a8c614f-209b-4d6f-bbdd-63f71fcf87cc" />
Due to time constraints during the final stages of development, a force push was accidentally performed, which resulted in the original commit history being overwritten.
To maintain transparency and accurately reflect the development effort and collaboration involved in this project, we have included screenshots of the original commit history as part of the submission.


