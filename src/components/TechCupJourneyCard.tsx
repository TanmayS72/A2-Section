import { useState } from 'react';
import { 
  Trophy, Users, Target, Sparkles, ChevronLeft, ChevronRight, 
  Rocket, Code, Heart, Star, Lightbulb, Award, Zap, Globe, Image,
  type LucideIcon 
} from 'lucide-react';
import './TechCupJourneyCard.css';

interface PageContent {
  title: string;
  icon: LucideIcon;
  text: string;
  quote: string;
  highlights: { icon: LucideIcon; label: string }[];
  image?: string;
  imageCaption?: string;
}

const pagesContent: PageContent[] = [
  {
    title: "The Beginning",
    icon: Rocket,
    text: "TechCup began with curiosity and excitement. We came together with one goal—to build, learn, and experience what it truly means to create something from scratch.",
    quote: "Every journey starts with a single idea.",
    highlights: [
      { icon: Sparkles, label: "Idea" },
      { icon: Heart, label: "Motivation" },
      { icon: Target, label: "Vision" }
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    imageCaption: "Facing challenges together"
  },
  {
    title: "Understanding the Challenge",
    icon: Target,
    text: "Before jumping into development, we focused on understanding the problem clearly. Discussions, doubts, and ideas helped us shape the right direction.",
    quote: "Clarity builds confidence.",
    highlights: [
      { icon: Lightbulb, label: "Thinking" },
      { icon: Users, label: "Discussion" },
      { icon: Target, label: "Direction" }
    ],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    imageCaption: "Creative brainstorming"
  },
  {
    title: "Planning & Innovation",
    icon: Lightbulb,
    text: "This phase was all about ideas. Brainstorming sessions helped us design features, plan workflows, and imagine how users would interact with our project.",
    quote: "Ideas shape the build.",
    highlights: [
      { icon: Code, label: "Logic" },
      { icon: Sparkles, label: "Creativity" },
      { icon: Star, label: "Innovation" }
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    imageCaption: "Coding through the night"
  },
  {
    title: "Building the Project",
    icon: Code,
    text: "Late nights, continuous debugging, and constant improvements defined this stage. Every line of code brought us closer to our final vision.",
    quote: "Build. Test. Improve.",
    highlights: [
      { icon: Zap, label: "Development" },
      { icon: Target, label: "Focus" },
      { icon: Award, label: "Quality" }
    ],
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=300&fit=crop",
    imageCaption: "Celebrating success"
  },
  {
    title: "Key Milestones",
    icon: Award,
    text: "Completing features, fixing major bugs, and seeing the project finally work felt rewarding. Each milestone boosted our confidence.",
    quote: "Progress feels powerful.",
    highlights: [
      { icon: Trophy, label: "Achievements" },
      { icon: Star, label: "Growth" },
      { icon: Heart, label: "Satisfaction" }
    ],
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
    imageCaption: "Our amazing team"
  },
  {
    title: "Team & Fun",
    icon: Users,
    text: "Beyond coding, TechCup gave us memories. Laughter, teamwork, and shared struggles made the journey enjoyable and unforgettable.",
    quote: "Fun fuels creativity.",
    highlights: [
      { icon: Heart, label: "Bonding" },
      { icon: Users, label: "Teamwork" },
      { icon: Sparkles, label: "Moments" }
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    imageCaption: "Reaching the world"
  },
  {
    title: "Impact & Exposure",
    icon: Globe,
    text: "Presenting our work and seeing others interact with it gave us exposure and confidence. It felt great to showcase what we built.",
    quote: "Learning beyond the screen.",
    highlights: [
      { icon: Globe, label: "Exposure" },
      { icon: Zap, label: "Impact" },
      { icon: Star, label: "Confidence" }
    ],
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop",
    imageCaption: "Awards ceremony"
  },
  {
    title: "Recognition & Learning",
    icon: Trophy,
    text: "Recognition mattered, but learning mattered more. TechCup helped us grow as developers and as a team.",
    quote: "Experience over trophies.",
    highlights: [
      { icon: Award, label: "Recognition" },
      { icon: Lightbulb, label: "Learning" },
      { icon: Heart, label: "Growth" }
    ],
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=300&fit=crop",
    imageCaption: "Knowledge gained"
  },
  {
    title: "Lessons Learned",
    icon: Lightbulb,
    text: "From technical skills to teamwork, this journey taught us lessons that will stay with us far beyond this event.",
    quote: "Learning never stops.",
    highlights: [
      { icon: Lightbulb, label: "Wisdom" },
      { icon: Sparkles, label: "Experience" },
      { icon: Heart, label: "Growth" }
    ],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop",
    imageCaption: "To infinity and beyond"
  },
  {
    title: "Looking Ahead",
    icon: Rocket,
    text: "TechCup was not the end—it was a beginning. With new skills and confidence, we’re excited for future projects and challenges.",
    quote: "The journey continues.",
    highlights: [
      { icon: Rocket, label: "Future" },
      { icon: Star, label: "Ambition" },
      { icon: Sparkles, label: "Hope" }
    ]
    // intentionally no image
  },
];


const TechCupJourneyCard = ({ transparent = false }) => {
  const [currentPage, setCurrentPage] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalPages = pagesContent.length;

  const flipNext = () => {
    if (isAnimating || currentPage >= totalPages - 1) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsAnimating(false);
    }, 500);
  };

  const flipPrev = () => {
    if (isAnimating || currentPage < 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(prev => prev - 1);
      setIsAnimating(false);
    }, 500);
  };

  const openBook = () => {
    if (currentPage === -1) {
      flipNext();
    }
  };

  return (
    <div
  className={`journey-wrapper ${
    transparent ? "journey-wrapper--transparent" : ""
  }`}
>

      <div className="journey-container">
        {/* The Book */}
        <div className="book3d-wrapper">
          <div className={`book3d ${currentPage >= 0 ? 'book3d--open' : ''}`}>
          {/* Book Cover */}
          <div 
            className={`book3d__cover ${currentPage >= 0 ? 'cover--flipped' : ''}`}
            onClick={openBook}
          >
            <div className="cover__face cover__face--front">
              <div className="cover__decoration cover__decoration--top" />
              <Trophy className="cover__trophy" size={68} strokeWidth={1.5} />
              <h1 className="cover__title">Tech Cup</h1>
              <p className="cover__subtitle">J O U R N E Y</p>
              <div className="cover__decoration cover__decoration--bottom" />
            </div>
            <div className="cover__face cover__face--back">
              <div className="cover__inner-texture" />
            </div>
          </div>

          {/* Pages */}
          {pagesContent.map((content, index) => {
            const PageIcon = content.icon;
            const isFlipped = index < currentPage;
            
            // For flipped pages, reverse z-index so most recently flipped is on top
            const zIndex = isFlipped ? index + 1 : totalPages - index;
            
            return (
              <div 
                key={index}
                className={`book3d__page ${isFlipped ? 'page--flipped' : ''} ${isAnimating && index === currentPage ? 'page--animating' : ''}`}
                style={{ 
                  zIndex: zIndex,
                } as React.CSSProperties}
              >
                {/* Front of page */}
                <div className="page__face page__face--front">
                  <div className="page__paper">
                    <div className="page__content">
                      <div className="page__header">
                        <PageIcon className="page__icon" size={28} />
                        <h2 className="page__title">{content.title}</h2>
                      </div>
                      
                      <p className="page__text">{content.text}</p>
                      
                      <p className="page__quote">"{content.quote}"</p>
                      
                      <div className="page__highlights">
                        {content.highlights.map((h, i) => {
                          const HIcon = h.icon;
                          return (
                            <div key={i} className="highlight-badge">
                              <HIcon size={16} />
                              <span>{h.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="page__number">{index + 1}</div>
                    </div>
                  </div>
                </div>
                
                {/* Back of page */}
                <div className="page__face page__face--back">
                  <div className="page__paper page__paper--back">
                    <div className="page__illustration">
                      <div className="page__image-container">
                        {content.image ? (
                          <img 
                            src={content.image} 
                            alt={content.imageCaption || content.title}
                            className="page__image"
                          />
                        ) : (
                          <div className="page__image-placeholder">
                            <Image size={40} />
                            <span>Add your image</span>
                          </div>
                        )}
                      </div>
                      <div className="illustration-box">
                        <PageIcon className="illustration-icon" size={32} />
                      </div>
                      <p className="illustration-caption">{content.imageCaption || content.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Back Cover */}
          <div className="book3d__back-cover" />
        </div>
        </div>

        {/* Navigation */}
        <div className="book-navigation">
          <button 
            className="nav-button nav-button--prev" 
            onClick={flipPrev}
            disabled={currentPage < 0 || isAnimating}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="nav-info">
            <span className="nav-text">
              {currentPage < 0 ? 'Click to open' : `Page ${currentPage + 1} of ${totalPages}`}
            </span>
            <div className="nav-dots">
              {pagesContent.map((_, i) => (
                <span 
                  key={i} 
                  className={`nav-dot ${i === currentPage ? 'nav-dot--active' : ''} ${i < currentPage ? 'nav-dot--passed' : ''}`}
                />
              ))}
            </div>
          </div>
          
          <button 
            className="nav-button nav-button--next" 
            onClick={flipNext}
            disabled={currentPage >= totalPages - 1 || isAnimating}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechCupJourneyCard;
