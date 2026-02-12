/**
 * Graduation-cap + orange-sphere logo — pure inline SVG, no image files.
 * Matches the brand SVG provided by the client.
 *
 * Usage:
 *   <LogoIcon />           → 40×40 default
 *   <LogoIcon size={32} /> → 32×32 for pill nav
 */

interface LogoIconProps {
    size?: number;
    className?: string;
}

export function LogoIcon({ size = 40, className = "" }: LogoIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            width={size}
            height={size}
            className={className}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="logoSphereGrad" x1="25%" y1="25%" x2="85%" y2="85%">
                    <stop offset="0%" stopColor="#FF9400" />
                    <stop offset="100%" stopColor="#CC7600" />
                </linearGradient>
                <linearGradient id="logoHatShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#000" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#000" stopOpacity={0} />
                </linearGradient>
            </defs>

            {/* Orange sphere body */}
            <circle cx={200} cy={240} r={130} fill="url(#logoSphereGrad)" />

            {/* Shadow under the hat brim */}
            <path d="M 100 160 Q 200 100 300 160 Q 200 210 100 160 Z" fill="url(#logoHatShadow)" />

            {/* Sphere highlight */}
            <path d="M 270 170 Q 310 190 315 220 Q 290 180 250 175" fill="#fff" fillOpacity={0.9} />

            {/* Cap base */}
            <path d="M 100 160 L 100 135 L 300 135 L 300 160 Q 200 100 100 160 Z" fill="#5D2D8F" />

            {/* White curve under brim */}
            <path
                d="M 105 155 Q 200 105 295 155"
                stroke="#fff"
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
            />

            {/* Cap top diamond */}
            <path d="M 200 40 L 360 110 L 200 150 L 40 110 Z" fill="#5D2D8F" stroke="#4A2375" strokeWidth={1} />

            {/* 3D depth panels */}
            <path d="M 300 135 L 300 110 L 200 150 L 200 165 Z" fill="#421C6B" />
            <path d="M 100 135 L 100 110 L 200 150 L 200 165 Z" fill="#5D2D8F" />

            {/* Cap highlights */}
            <path d="M 180 142 Q 250 140 280 120" stroke="#fff" strokeWidth={3} fill="none" opacity={0.6} />
            <path d="M 200 40 L 360 110" stroke="#7A4BAB" strokeWidth={2} />

            {/* Tassel */}
            <g>
                <path d="M 65 118 L 65 180" stroke="#5D2D8F" strokeWidth={4} />
                <circle cx={65} cy={118} r={5} fill="#5D2D8F" />
                <path d="M 55 180 L 75 180 L 70 215 L 60 215 Z" fill="#5D2D8F" />
            </g>
        </svg>
    );
}
