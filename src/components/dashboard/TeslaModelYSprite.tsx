import React from 'react';

export type TeslaPaintColor = 'white' | 'red' | 'black' | 'grey' | 'blue';

interface TeslaModelYSpriteProps {
  color?: TeslaPaintColor;
  angle?: number; // 0 = heading right, 90 = down, 180 = left, 270 = up
  headlights?: boolean;
  size?: number; // width in pixels (e.g. 36)
}

export const TeslaModelYSprite: React.FC<TeslaModelYSpriteProps> = ({
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
  };

  const paint = paintMap[color] || paintMap.white;

  // ViewBox: 100 wide x 50 high (Car pointing right at 0 degrees)
  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-150 select-none"
      style={{
        width: `${size}px`,
        height: `${size * 0.52}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      {/* Dynamic Headlight Light Beam Projection (casts forward to the right) */}
      {headlights && (
        <div
          className="absolute right-[-45%] top-1/2 -translate-y-1/2 w-[65%] h-[90%] pointer-events-none opacity-80"
          style={{
            background:
              'radial-gradient(ellipse at left, rgba(6, 182, 212, 0.7) 0%, rgba(56, 189, 248, 0.25) 50%, transparent 80%)',
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

      {/* Realistic Tesla Model Y SVG Vector */}
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

          {/* Panoramic Glass Tint Gradient */}
          <linearGradient id="glassRoof" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0F17" />
            <stop offset="40%" stopColor="#1E293B" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Wheel Rubber & Rim Texture */}
          <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* 4 Aero Wheels (Visible outside body contours) */}
        {/* Front-Top Wheel */}
        <rect x="68" y="2" width="14" height="6" rx="2" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="0.5" />
        {/* Front-Bottom Wheel */}
        <rect x="68" y="42" width="14" height="6" rx="2" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="0.5" />
        {/* Rear-Top Wheel */}
        <rect x="16" y="2" width="15" height="6.5" rx="2" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="0.5" />
        {/* Rear-Bottom Wheel */}
        <rect x="16" y="41.5" width="15" height="6.5" rx="2" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="0.5" />

        {/* Side Mirrors */}
        {/* Top Mirror */}
        <path d="M 58 8 Q 58 4 63 3 Q 66 4 64 8 Z" fill={paint.body} stroke={paint.shadow} strokeWidth="0.5" />
        <ellipse cx="61" cy="5" rx="1.5" ry="0.8" fill="#0EA5E9" opacity="0.6" />
        {/* Bottom Mirror */}
        <path d="M 58 42 Q 58 46 63 47 Q 66 46 64 42 Z" fill={paint.body} stroke={paint.shadow} strokeWidth="0.5" />
        <ellipse cx="61" cy="45" rx="1.5" ry="0.8" fill="#0EA5E9" opacity="0.6" />

        {/* Model Y Main Aerodynamic Silhouette Body Shell */}
        <path
          d="
            M 92 25
            C 92 18, 86 9, 74 8
            C 56 7, 44 8, 30 7
            C 18 6, 8 13, 6 25
            C 8 37, 18 44, 30 43
            C 44 42, 56 43, 74 42
            C 86 41, 92 32, 92 25
            Z
          "
          fill={`url(#bodyGrad-${color})`}
          stroke="#0F172A"
          strokeWidth="1.2"
        />

        {/* Frunk Character Crease Lines */}
        <path d="M 75 14 Q 85 18 89 22" fill="none" stroke={paint.shadow} strokeWidth="0.8" opacity="0.8" />
        <path d="M 75 36 Q 85 32 89 28" fill="none" stroke={paint.shadow} strokeWidth="0.8" opacity="0.8" />
        <path d="M 72 17 L 84 21" fill="none" stroke={paint.highlight} strokeWidth="0.6" />
        <path d="M 72 33 L 84 29" fill="none" stroke={paint.highlight} strokeWidth="0.6" />

        {/* Tesla Signature T Emblem on Frunk */}
        <path
          d="M 88 23 C 89 22, 91 22, 92 23 M 90 23 L 90 27 M 88.5 24 L 91.5 24"
          fill="none"
          stroke="#E11D48"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Model Y Signature All-Glass Panoramic Roof (Windshield -> Glass Roof -> Rear Window) */}
        <path
          d="
            M 68 14
            C 72 17, 72 33, 68 36
            C 50 37, 36 36, 18 33
            C 14 30, 14 20, 18 17
            C 36 14, 50 13, 68 14
            Z
          "
          fill="url(#glassRoof)"
          stroke="#0F172A"
          strokeWidth="1"
        />

        {/* B-Pillar Structural Crossbar (Under Glass) */}
        <line x1="44" y1="13.5" x2="44" y2="36.5" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

        {/* Interior Front Headrests Silhouettes Visible Through Glass */}
        <rect x="52" y="16" width="4" height="6" rx="1.5" fill="#F8FAFC" opacity="0.4" />
        <rect x="52" y="28" width="4" height="6" rx="1.5" fill="#F8FAFC" opacity="0.4" />

        {/* Center 15-inch Touchscreen Display (Glowing Cyan) */}
        <rect x="58" y="22.5" width="5" height="5" rx="0.8" fill="#06B6D4" opacity="0.9" />

        {/* Matrix LED Headlights (Jewel Eye Sharp Cut) */}
        <polygon points="87,11 91,15 88,17 84,13" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="0.6" />
        <polygon points="87,39 91,35 88,33 84,37" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="0.6" />
        {/* Headlight LED DRL Eyebrow */}
        <path d="M 85 11 Q 90 14 91 16" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        <path d="M 85 39 Q 90 36 91 34" fill="none" stroke="#FFFFFF" strokeWidth="1" />

        {/* Rear Ducktail Spoiler Lip & C-Shaped LED Taillights */}
        <path d="M 8 16 Q 6 25 8 34" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        {/* Top Taillight */}
        <path d="M 12 12 Q 7 14 8 18" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
        {/* Bottom Taillight */}
        <path d="M 12 38 Q 7 36 8 32" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />

        {/* Rear Tesla Model Y Dual Motor Line */}
        <line x1="8" y1="23" x2="8" y2="27" stroke="#EF4444" strokeWidth="1" />
      </svg>
    </div>
  );
};
