"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP);

interface ShaderPlaneProps {
  vertexShader: string;
  fragmentShader: string;
  uniforms: { [key: string]: { value: unknown } };
}

const ShaderPlane = ({
  vertexShader,
  fragmentShader,
  uniforms,
}: ShaderPlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.FrontSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vUv;
uniform float u_time;
uniform vec3 u_resolution;

vec2 toPolar(vec2 p) {
  float r = length(p);
  float a = atan(p.y, p.x);
  return vec2(r, a);
}

vec2 fromPolar(vec2 polar) {
  return vec2(cos(polar.y), sin(polar.y)) * polar.x;
}

void main() {
  vec2 fragCoord = vUv * u_resolution.xy;
  vec2 p = 6.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);

  vec2 polar = toPolar(p);
  float r = polar.x;
  float a = polar.y;

  vec2 i = p;
  float c = 0.0;

  float rot = r + u_time + p.x * 0.100;
  for (float n = 0.0; n < 4.0; n++) {
    float rr = r + 0.15 * sin(u_time*0.7 + n + r*2.0);
    p *= mat2(
      cos(rot - sin(u_time / 10.0)), sin(rot),
      -sin(cos(rot) - u_time / 10.0), cos(rot)
    ) * -0.25;

    float t = r - u_time / (n + 30.0);
    i -= p + sin(t - i.y) + rr;

    c += 2.2 / length(vec2(
      (sin(i.x + t) / 0.15),
      (cos(i.y + t) / 0.15)
    ));
  }

  c /= 8.0;

  // Emerald green color palette
  vec3 baseColor = vec3(0.2, 0.7, 0.5);
  vec3 finalColor = baseColor * smoothstep(0.0, 1.0, c * 0.6);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface CTAButton {
  text: string;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
}

interface SyntheticHeroProps {
  badgeLabel?: string;
  badgeText?: string;
  title: string;
  description: string;
  ctaButtons?: CTAButton[];
  details?: string[];
}

export const SyntheticHero = ({
  badgeLabel = "Section A2",
  badgeText = "Experience",
  title = "We didn't choose Section A2. It chose us.",
  description = "A random shuffle. Unknown faces. Different stories. One section. This is where strangers became family.",
  ctaButtons = [
    { text: "Explore Our Journey", primary: true },
    { text: "The Memories", primary: false },
  ],
  details = [
    "Formed by chance, bonded by choice",
    "From AMCAT shuffle to real memories",
    "Section Cup warriors",
  ],
}: SyntheticHeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const microRef = useRef<HTMLUListElement | null>(null);

  const shaderUniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
    }),
    []
  );

  useGSAP(() => {
    if (!headingRef.current) return;

    // Simple animation without SplitText
    const elements = [badgeWrapperRef.current, headingRef.current, paragraphRef.current, ctaRef.current];
    
    gsap.set(elements.filter(Boolean), {
      autoAlpha: 0,
      y: 30,
    });

    const microItems = microRef.current
      ? Array.from(microRef.current.querySelectorAll("li"))
      : [];
    if (microItems.length > 0) {
      gsap.set(microItems, { autoAlpha: 0, y: 10 });
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

    if (badgeWrapperRef.current) {
      tl.to(badgeWrapperRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
    }

    if (headingRef.current) {
      tl.to(headingRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2);
    }

    if (paragraphRef.current) {
      tl.to(paragraphRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.5);
    }

    if (ctaRef.current) {
      tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.7);
    }

    if (microItems.length > 0) {
      tl.to(microItems, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.9);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Shader Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 1] }}
        >
          <ShaderPlane
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={shaderUniforms}
          />
        </Canvas>
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/50 via-transparent to-background/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div ref={badgeWrapperRef}>
          <Badge className="mb-6 bg-white/10 hover:bg-white/15 text-emerald-300 backdrop-blur-md border border-white/20 uppercase tracking-wider font-medium flex items-center gap-2 px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {badgeLabel}
            <span className="text-white/50">|</span>
            {badgeText}
          </Badge>
        </div>

        {/* Title */}
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 text-glow"
        >
          {title}
        </h1>

        {/* Description */}
        <p
          ref={paragraphRef}
          className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed"
        >
          {description}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {ctaButtons.map((button, index) => {
            const isPrimary = button.primary ?? index === 0;
            
            if (button.href) {
              return (
                <Link
                  key={index}
                  to={button.href}
                  className={isPrimary ? "btn-hero-primary" : "btn-hero-secondary"}
                >
                  {button.text}
                </Link>
              );
            }

            return (
              <Button
                key={index}
                onClick={button.onClick}
                className={isPrimary ? "btn-hero-primary" : "btn-hero-secondary"}
                variant="ghost"
              >
                {button.text}
              </Button>
            );
          })}
        </div>

        {/* Micro details */}
        <ul
          ref={microRef}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50"
        >
          {details.map((detail, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              {detail}
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full scroll-indicator" />
        </div>
      </div>
    </section>
  );
};

export default SyntheticHero;
