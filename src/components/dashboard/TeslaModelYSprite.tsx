import React from 'react';

export type TeslaModelType =
  | 'model-y'
  | 'model-3'
  | 'model-s'
  | 'model-x'
  | 'cybertruck'
  | 'cybercab'
  | 'roadster';

export type TeslaPaintColor = 'white' | 'red' | 'black' | 'grey' | 'blue' | 'gold';

export interface TeslaModelInfo {
  id: TeslaModelType;
  name: string;
  category: string;
  acceleration: string;
  perk: string;
  badge: string;
}

export const TESLA_FLEET: TeslaModelInfo[] = [
  {
    id: 'model-y',
    name: 'Model Y',
    category: 'Compact SUV AWD',
    acceleration: '3.5s',
    perk: '🔋 Balanced Long-Range & Panoramic Vision',
    badge: 'Dual Motor',
  },
  {
    id: 'model-3',
    name: 'Model 3 Highland',
    category: 'Sport Sedan',
    acceleration: '2.9s',
    perk: '⚡ Ultra-Agile Cornering & Low Drag',
    badge: 'Performance',
  },
  {
    id: 'model-s',
    name: 'Model S Plaid',
    category: 'Tri-Motor Hyper-Sedan',
    acceleration: '1.99s',
    perk: '🚀 1,020 HP Ludicrous Speed Warp',
    badge: 'PLAID',
  },
  {
    id: 'model-x',
    name: 'Model X Plaid',
    category: 'Falcon Wing SUV',
    acceleration: '2.5s',
    perk: '🦅 Falcon Radar Wide-Scan Radius',
    badge: 'Falcon Wing',
  },
  {
    id: 'cybertruck',
    name: 'Cybertruck',
    category: 'Stainless Steel Exoskeleton',
    acceleration: '2.6s',
    perk: '🛡️ Armor Glass & Horizon Laser Lightbar',
    badge: 'Cyberbeast',
  },
  {
    id: 'cybercab',
    name: 'Cybercab (Robotaxi)',
    category: 'Autonomous AI Pod',
    acceleration: '4.0s',
    perk: '🤖 100% Vision-Only AI FSD Boost',
    badge: 'Robotaxi',
  },
  {
    id: 'roadster',
    name: 'Next-Gen Roadster',
    category: 'SpaceX Hypercar',
    acceleration: '1.1s',
    perk: '🌌 Cold Gas Thrusters Turbo Leap',
    badge: 'SpaceX Package',
  },
];

interface TeslaModelYSpriteProps {
  model?: TeslaModelType;
  color?: TeslaPaintColor;
  angle?: number; // 0 = heading right, 90 = down, 180 = left, 270 = up
  headlights?: boolean;
  size?: number; // width in pixels (e.g. 36)
}

export const TeslaModelYSprite: React.FC<TeslaModelYSpriteProps> = ({
  model = 'model-y',
  color = 'white',
  angle = 0,
  headlights = true,
  size = 36,
}) => {
  // Tesla Paint Gradients & Colors
  const paintMap: Record<
    TeslaPaintColor,
    { body: string; shadow: string; highlight: string; frunk: string }
  > = {
    white: {
      body: '#F8FAFC',
      shadow: '#CBD5E1',
      highlight: '#FFFFFF',
      frunk: '#E2E8F0',
    },
    red: {
      body: '#E11D48',
      shadow: '#9F1239',
      highlight: '#FB7185',
      frunk: '#BE123C',
    },
    black: {
      body: '#1E293B',
      shadow: '#0F172A',
      highlight: '#334155',
      frunk: '#0F172A',
    },
    grey: {
      body: '#64748B',
      shadow: '#334155',
      highlight: '#94A3B8',
      frunk: '#475569',
    },
    blue: {
      body: '#2563EB',
      shadow: '#1E40AF',
      highlight: '#60A5FA',
      frunk: '#1D4ED8',
    },
    gold: {
      body: '#D97706',
      shadow: '#92400E',
      highlight: '#FDE68A',
      frunk: '#B45309',
    },
  };

  const isCybertruck = model === 'cybertruck';
  const effectiveColor = isCybertruck ? 'grey' : color;
  const paint = paintMap[effectiveColor] || paintMap.white;

  // Render SVG Vehicle Geometry based on Model
  const renderVehicleGeometry = () => {
    switch (model) {
      case 'cybertruck':
        // Angular origami polygon exoskeleton
        return (
          <>
            {/* Stainless Steel Exoskeleton Polygon */}
            <polygon
              points="94,25 76,8 14,8 6,15 6,35 14,42 76,42"
              fill="url(#stainlessSteel)"
              stroke="#0F172A"
              strokeWidth="1.2"
            />
            {/* Vault Bed Area */}
            <polygon points="14,12 48,12 48,38 14,38" fill="#1E293B" stroke="#0F172A" strokeWidth="0.8" />
            <line x1="18" y1="12" x2="18" y2="38" stroke="#334155" strokeWidth="1" />
            <line x1="28" y1="12" x2="28" y2="38" stroke="#334155" strokeWidth="1" />
            <line x1="38" y1="12" x2="38" y2="38" stroke="#334155" strokeWidth="1" />
            {/* Angular Glass Roof */}
            <polygon points="48,14 74,14 74,36 48,36" fill="#090D16" stroke="#334155" strokeWidth="0.8" />
            {/* Full-width Cyber Horizon Lightbar (Front) */}
            <line x1="93" y1="21" x2="93" y2="29" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="square" />
            {/* Rear Cyber Lightbar */}
            <line x1="6" y1="16" x2="6" y2="34" stroke="#EF4444" strokeWidth="2" strokeLinecap="square" />
          </>
        );

      case 'model-s':
        // Wide Hyper-Sedan (Model S Plaid)
        return (
          <>
            {/* Wide Silhouette Body */}
            <path
              d="M 94 25 C 94 17, 88 8, 76 7 C 54 6, 42 7, 28 6 C 14 5, 6 12, 5 25 C 6 38, 14 45, 28 44 C 42 43, 54 44, 76 43 C 88 42, 94 33, 94 25 Z"
              fill={`url(#bodyGrad-${color})`}
              stroke="#0F172A"
              strokeWidth="1.2"
            />
            {/* Glass Roof with Wide Rear Hatch */}
            <path d="M 70 13 C 74 16, 74 34, 70 37 C 52 38, 38 37, 18 34 C 13 31, 13 19, 18 16 C 38 13, 52 12, 70 13 Z" fill="url(#glassRoof)" stroke="#0F172A" strokeWidth="0.9" />
            {/* Carbon Fiber Rear Lip Spoiler */}
            <path d="M 6 14 Q 4 25 6 36" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Front Sharp Matrix LED Headlights */}
            <polygon points="89,10 93,14 90,16 86,12" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="0.6" />
            <polygon points="89,40 93,36 90,34 86,38" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="0.6" />
            {/* Plaid Badge Graphic on Rear */}
            <rect x="7" y="23" width="3" height="4" fill="#EF4444" stroke="#FFFFFF" strokeWidth="0.4" />
          </>
        );

      case 'model-x':
        // Large Luxury Falcon Wing SUV
        return (
          <>
            {/* Large Wide Body */}
            <path
              d="M 92 25 C 92 16, 84 7, 72 6 C 52 6, 38 6, 26 5 C 14 5, 6 12, 6 25 C 6 38, 14 45, 26 45 C 38 44, 52 44, 72 44 C 84 43, 92 34, 92 25 Z"
              fill={`url(#bodyGrad-${color})`}
              stroke="#0F172A"
              strokeWidth="1.3"
            />
            {/* Expansive Helicopter Panoramic Windshield & Roof */}
            <path d="M 76 13 C 80 17, 80 33, 76 37 C 50 38, 34 38, 16 35 C 12 32, 12 18, 16 15 C 34 12, 50 12, 76 13 Z" fill="url(#glassRoof)" stroke="#0F172A" strokeWidth="1" />
            {/* Falcon Wing Door Cutlines */}
            <line x1="38" y1="6" x2="38" y2="44" stroke="#334155" strokeWidth="1.2" strokeDasharray="1 1" />
            <line x1="56" y1="6" x2="56" y2="44" stroke="#334155" strokeWidth="1.2" strokeDasharray="1 1" />
            <line x1="38" y1="25" x2="56" y2="25" stroke="#334155" strokeWidth="1.5" />
          </>
        );

      case 'cybercab':
        // Autonomous 2-door Butterfly Coupe
        return (
          <>
            {/* Compact Futuristic Pod Silhouette */}
            <path
              d="M 88 25 C 88 17, 82 8, 70 8 C 52 7, 38 7, 24 8 C 14 9, 8 16, 8 25 C 8 34, 14 41, 24 42 C 38 43, 52 43, 70 42 C 82 42, 88 33, 88 25 Z"
              fill="url(#cybercabGold)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            {/* Seamless Glass Dome (No steering wheel, giant center display) */}
            <path d="M 68 12 C 72 16, 72 34, 68 38 C 48 39, 32 38, 18 35 C 14 31, 14 19, 18 15 C 32 12, 48 11, 68 12 Z" fill="#090D16" stroke="#F59E0B" strokeWidth="0.8" />
            {/* Full-width Cyber Light Strips */}
            <line x1="86" y1="12" x2="86" y2="38" stroke="#FEF08A" strokeWidth="1.8" />
            <line x1="8" y1="14" x2="8" y2="36" stroke="#EF4444" strokeWidth="1.8" />
            {/* Giant Autonomous Screen */}
            <rect x="52" y="21" width="8" height="8" rx="1" fill="#06B6D4" />
          </>
        );

      case 'roadster':
        // Next-Gen SpaceX Hypercar
        return (
          <>
            {/* Ultra-Low Extreme Aerodynamic Curvature */}
            <path
              d="M 94 25 C 94 18, 86 10, 72 9 C 54 8, 40 8, 28 7 C 16 6, 8 13, 6 25 C 8 37, 16 44, 28 43 C 40 42, 54 42, 72 41 C 86 40, 94 32, 94 25 Z"
              fill={`url(#bodyGrad-${color})`}
              stroke="#0F172A"
              strokeWidth="1.2"
            />
            {/* Targa Glass Cockpit */}
            <path d="M 62 14 C 66 17, 66 33, 62 36 C 46 37, 34 36, 22 34 C 18 31, 18 19, 22 16 C 34 14, 46 13, 62 14 Z" fill="url(#glassRoof)" stroke="#0F172A" strokeWidth="0.9" />
            {/* Aggressive Front Aero Splitter */}
            <polygon points="94,22 96,25 94,28 92,25" fill="#0F172A" />
            {/* Rear SpaceX Cold Gas Thruster Badge */}
            <circle cx="8" cy="25" r="2.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="0.5" />
            {/* Extreme Rear Diffuser Fins */}
            <line x1="5" y1="12" x2="9" y2="12" stroke="#0F172A" strokeWidth="2" />
            <line x1="5" y1="38" x2="9" y2="38" stroke="#0F172A" strokeWidth="2" />
          </>
        );

      case 'model-3':
        // Model 3 Highland Sport Sedan
        return (
          <>
            {/* Sleek Streamlined Sport Sedan */}
            <path
              d="M 92 25 C 92 18, 86 9, 74 8 C 56 7, 44 8, 30 7 C 18 6, 8 13, 6 25 C 8 37, 18 44, 30 43 C 44 42, 56 43, 74 42 C 86 41, 92 32, 92 25 Z"
              fill={`url(#bodyGrad-${color})`}
              stroke="#0F172A"
              strokeWidth="1.2"
            />
            {/* Continuous Panoramic Glass Roof */}
            <path d="M 66 14 C 70 17, 70 33, 66 36 C 48 37, 34 36, 16 33 C 12 30, 12 20, 16 17 C 34 14, 48 13, 66 14 Z" fill="url(#glassRoof)" stroke="#0F172A" strokeWidth="0.9" />
            {/* Highland Sharp DRL Eyebrows */}
            <path d="M 86 11 L 91 14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 86 39 L 91 36" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            {/* Rear C-shaped Light Bar */}
            <path d="M 9 14 Q 6 25 9 36" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
          </>
        );

      case 'model-y':
      default:
        // Model Y Compact Fastback SUV (Default)
        return (
          <>
            {/* Model Y Body Shell */}
            <path
              d="M 92 25 C 92 18, 86 9, 74 8 C 56 7, 44 8, 30 7 C 18 6, 8 13, 6 25 C 8 37, 18 44, 30 43 C 44 42, 56 43, 74 42 C 86 41, 92 32, 92 25 Z"
              fill={`url(#bodyGrad-${color})`}
              stroke="#0F172A"
              strokeWidth="1.2"
            />
            {/* All-Glass Panoramic Roof */}
            <path d="M 68 14 C 72 17, 72 33, 68 36 C 50 37, 36 36, 18 33 C 14 30, 14 20, 18 17 C 36 14, 50 13, 68 14 Z" fill="url(#glassRoof)" stroke="#0F172A" strokeWidth="1" />
            {/* B-Pillar Structural Crossbar */}
            <line x1="44" y1="13.5" x2="44" y2="36.5" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            {/* Front Headrests Silhouettes */}
            <rect x="52" y="16" width="4" height="6" rx="1.5" fill="#F8FAFC" opacity="0.4" />
            <rect x="52" y="28" width="4" height="6" rx="1.5" fill="#F8FAFC" opacity="0.4" />
            {/* Center 15-inch Touchscreen */}
            <rect x="58" y="22.5" width="5" height="5" rx="0.8" fill="#06B6D4" opacity="0.9" />
            {/* Matrix LED Headlights */}
            <polygon points="87,11 91,15 88,17 84,13" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="0.6" />
            <polygon points="87,39 91,35 88,33 84,37" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="0.6" />
            {/* Rear Ducktail & Taillights */}
            <path d="M 8 16 Q 6 25 8 34" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <path d="M 12 12 Q 7 14 8 18" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 12 38 Q 7 36 8 32" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-150 select-none"
      style={{
        width: `${size}px`,
        height: `${size * 0.52}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      {/* Dynamic Headlight Light Beam Projection */}
      {headlights && (
        <div
          className="absolute right-[-45%] top-1/2 -translate-y-1/2 w-[65%] h-[90%] pointer-events-none opacity-80"
          style={{
            background:
              isCybertruck
                ? 'radial-gradient(ellipse at left, rgba(224, 242, 254, 0.9) 0%, rgba(56, 189, 248, 0.3) 50%, transparent 80%)'
                : 'radial-gradient(ellipse at left, rgba(6, 182, 212, 0.7) 0%, rgba(56, 189, 248, 0.25) 50%, transparent 80%)',
            clipPath: 'polygon(0% 25%, 100% 0%, 100% 100%, 0% 75%)',
            filter: 'blur(2px)',
          }}
        />
      )}

      {/* Rear Taillight Red Ambient Glow */}
      <div
        className="absolute left-[-15%] top-1/2 -translate-y-1/2 w-[25%] h-[60%] pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, transparent 70%)',
          filter: 'blur(1px)',
        }}
      />

      {/* SVG Vector Frame */}
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Body Gradient */}
          <linearGradient id={`bodyGrad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={paint.shadow} />
            <stop offset="25%" stopColor={paint.highlight} />
            <stop offset="50%" stopColor={paint.body} />
            <stop offset="75%" stopColor={paint.highlight} />
            <stop offset="100%" stopColor={paint.shadow} />
          </linearGradient>

          {/* Stainless Steel (Cybertruck) */}
          <linearGradient id="stainlessSteel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="30%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Cybercab Gold Metallic */}
          <linearGradient id="cybercabGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          {/* Panoramic Glass Roof */}
          <linearGradient id="glassRoof" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0F17" />
            <stop offset="40%" stopColor="#1E293B" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Wheel Gradient */}
          <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* 4 Aero Wheels */}
        {!isCybertruck && (
          <>
            <rect x="68" y="2" width="14" height="6" rx="2" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="0.5" />
            <rect x="68" y="42" width="14" height="6" rx="2" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="0.5" />
            <rect x="16" y="2" width="15" height="6.5" rx="2" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="0.5" />
            <rect x="16" y="41.5" width="15" height="6.5" rx="2" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="0.5" />
          </>
        )}

        {/* Vehicle Body Geometry */}
        {renderVehicleGeometry()}
      </svg>
    </div>
  );
};
