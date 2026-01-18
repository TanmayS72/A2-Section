import { ImageGallery3D } from "@/components/ui/image-gallery-3d";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingCharacters } from "@/components/FloatingCharacters";
import { motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";

// Gallery images
const galleryImages = [
  {
    id: "1",
    imageUrl: "/gallery/glibli.jpeg",
    alt: "Smoooth",
    title: "Activity"
  },
  {
    id: "2",
    imageUrl: "/gallery/group.png",
    alt: "End sem celebration",
    title: "End sem done"

  },
  {
    id: "3",
    imageUrl: "/gallery/i1.png",
     alt: "Section Cup celebration",
    title: "Tug of War"
  },
  {
    id: "4",
    imageUrl: "/gallery/i2.png",
    alt: "Basketball match",
    title: "Day One - New Beginnings"
  
  },
  {
    id: "5",
    imageUrl: "/gallery/i8.jpeg",
     alt: "Friendship goals",
    title: "Bonds That Last"
   
  },
  {
    id: "6",
    imageUrl: "/gallery/tech-fest.jpeg",
    alt: "Pikachu!!",
    title: "Tech Fest Fun"
  },
  {
    id: "7",
    imageUrl: "/gallery/i5.png",
    alt: "Random Activity",
    title: "Celebrating Nothing"
  
  },
  {
    id: "8",
    imageUrl: "/gallery/i6.png",
    alt: "Girls power",
    title: "Dodge ball"
   
  },
  {
    id: "9",
    imageUrl: "/gallery/i7.png",
    alt: "End sem celebration",
    title: "End Sem done"
  },
  {
    id: "10",
    imageUrl: "/gallery/i3.png",
    alt: "Group laughter",
    title: "Joyful Moments"
  },
  {
    id: "11",
    imageUrl: "/gallery/i4.png",
    alt: "Tuesday hangout",
    title: "Faces on Tuesday"
  },
  {
    id: "12",
    imageUrl: "/gallery/random.jpeg",
    alt: "Problem solving session",
    title: "Discussion"
  },
];

const Memories = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <FloatingCharacters />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium"
            >
              <Camera size={16} />
              3D Memory Gallery
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white">
              Memory Wall
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Explore our memories in an immersive 3D space. 
              Click and drag to navigate, click on photos to view them.
            </p>
            <div className="flex items-center justify-center gap-2 text-rose-400">
              <Heart size={20} className="fill-rose-400" />
              <span className="text-sm">{galleryImages.length} memories and counting</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 text-sm text-white/40"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">🖱️</span>
              <span>Drag to rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">🔍</span>
              <span>Scroll to zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">👆</span>
              <span>Click to view</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3D Image Gallery */}
      <ImageGallery3D
        title=""
        subtitle=""
        images={galleryImages}
      />

      <Footer />
    </main>
  );
};

export default Memories;
