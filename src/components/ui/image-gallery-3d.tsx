"use client"

import React, { Suspense, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import { Heart, X, ZoomIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Card Context
type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

// Starfield background
function Starfield({ count = 2000 }) {
  const points = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#10b981"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Floating card in 3D space
function FloatingCard({
  card,
  position,
  rotation,
  index,
}: {
  card: Card
  position: [number, number, number]
  rotation: [number, number, number]
  index: number
}) {
  const { setSelectedCard } = useCard()
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  // Load texture
  useMemo(() => {
    const loader = new THREE.TextureLoader()
    loader.load(card.imageUrl, (tex) => {
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      setTexture(tex)
    })
  }, [card.imageUrl])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.position.y =
        position[1] + Math.sin(time * 0.5 + index) * 0.3
      meshRef.current.rotation.y = rotation[1] + Math.sin(time * 0.3 + index) * 0.05
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setSelectedCard(card)}
    >
      <planeGeometry args={[2.5, 1.8]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={hovered ? 1 : 0.85}
        side={THREE.DoubleSide}
        emissive={hovered ? "#10b981" : "#000000"}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
      
      {hovered && (
        <Html center position={[0, -1.2, 0]}>
          <div className="bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/30 whitespace-nowrap">
            <p className="text-xs text-white font-medium">{card.title}</p>
          </div>
        </Html>
      )}
    </mesh>
  )
}

// Modal for selected image
function ImageModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [liked, setLiked] = useState(false)

  if (!selectedCard) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
        onClick={() => setSelectedCard(null)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-4xl w-full glass rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedCard(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Image */}
          <div className="relative aspect-video">
            <img
              src={selectedCard.imageUrl}
              alt={selectedCard.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Info */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-1">
                {selectedCard.title}
              </h3>
              <p className="text-white/60 text-sm">{selectedCard.alt}</p>
            </div>
            <button
              onClick={() => setLiked(!liked)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                liked ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60 hover:text-red-400'
              }`}
            >
              <Heart size={20} fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Main Gallery Component
interface ImageGallery3DProps {
  title?: string
  subtitle?: string
  images?: Card[]
  className?: string
}

const defaultImages: Card[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop",
    alt: "Group celebration",
    title: "Section Cup Victory"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
    alt: "College friends",
    title: "First Day Together"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop",
    alt: "Campus life",
    title: "Campus Adventures"
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
    alt: "Study group",
    title: "Late Night Studies"
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&auto=format&fit=crop",
    alt: "Celebration moment",
    title: "Celebrating Together"
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop",
    alt: "Team meeting",
    title: "Planning Sessions"
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop",
    alt: "Outdoor fun",
    title: "Weekend Vibes"
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&auto=format&fit=crop",
    alt: "Friendship moment",
    title: "Bonds That Last"
  },
]

export const ImageGallery3D = ({
  title = "Memories Wall",
  subtitle = "Moments that made us A2",
  images = defaultImages,
  className = ""
}: ImageGallery3DProps) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  // Generate positions in a spiral/scattered pattern
  const cardPositions = useMemo(() => {
    return images.map((_, i) => {
      const angle = (i / images.length) * Math.PI * 2
      const radius = 4 + Math.random() * 2
      const x = Math.cos(angle) * radius
      const y = (Math.random() - 0.5) * 3
      const z = Math.sin(angle) * radius - 3
      return {
        position: [x, y, z] as [number, number, number],
        rotation: [
          (Math.random() - 0.5) * 0.3,
          -angle + Math.PI,
          (Math.random() - 0.5) * 0.1
        ] as [number, number, number]
      }
    })
  }, [images])

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards: images }}>
      <section className={`relative min-h-screen bg-background ${className}`}>
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 text-center pt-20 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
          >
            <span className="gradient-text">{title}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-white/60 max-w-xl mx-auto mb-4"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-sm text-emerald-400"
          >
            <ZoomIn size={16} />
            <span>Click on any memory to explore</span>
          </motion.div>
        </div>

        {/* 3D Canvas */}
        <div className="w-full h-screen">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />

              <Starfield count={1500} />

              {images.map((card, index) => (
                <FloatingCard
                  key={card.id}
                  card={card}
                  position={cardPositions[index].position}
                  rotation={cardPositions[index].rotation}
                  index={index}
                />
              ))}

              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={15}
                autoRotate
                autoRotateSpeed={0.5}
              />
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>

        {/* Modal */}
        <ImageModal />

        {/* Instruction */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <p className="text-xs text-white/40 uppercase tracking-widest">
            Drag to rotate • Scroll to zoom
          </p>
        </div>
      </section>
    </CardContext.Provider>
  )
}

export default ImageGallery3D
