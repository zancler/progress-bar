"use client"

import { useEffect, useState } from "react"

interface SemiCircleProgressProps {
  score: number // 1.0 to 5.0
  size?: number
  strokeWidth?: number
  backgroundColor?: string
  baseColor?: string // Base color for the gradient
  textColor?: string
  showScore?: boolean
  animated?: boolean
  duration?: number
}

export function SemiCircleProgress({
  score,
  size = 200,
  strokeWidth = 12,
  backgroundColor = "#e5e7eb",
  baseColor = "#ffffff", // White base color
  textColor = "#1f2937",
  showScore = true,
  animated = true,
  duration = 1000,
}: SemiCircleProgressProps) {
  const [animatedScore, setAnimatedScore] = useState(animated ? 1.0 : score)

  // Clamp score between 1.0 and 5.0
  const clampedScore = Math.max(1.0, Math.min(5.0, score))

  // Calculate progress percentage (0% to 100%)
  const progressPercentage = ((clampedScore - 1.0) / 4.0) * 100
  const animatedPercentage = ((animatedScore - 1.0) / 4.0) * 100

  // Map score to opacity (1.0 = opacity 1.0, 5.0 = opacity 0.0)
  const opacity = 1.0 - (animatedScore - 1.0) / 4.0

  // SVG dimensions with padding for glow effect
  const padding = strokeWidth + 10
  const svgSize = size + padding * 2
  const svgHeight = size / 2 + padding + strokeWidth
  const radius = (size - strokeWidth) / 2
  const centerX = svgSize / 2
  const centerY = svgSize / 2

  // Semi-circle path (180 degrees)
  const circumference = Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  useEffect(() => {
    if (!animated) {
      setAnimatedScore(clampedScore)
      return
    }

    const startTime = Date.now()
    const startScore = animatedScore
    const targetScore = clampedScore

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentScore = startScore + (targetScore - startScore) * easeOut

      setAnimatedScore(currentScore)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [clampedScore, animated, duration])

  // Create unique gradient ID for this component instance
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: svgSize, height: svgHeight }}>
        <svg width={svgSize} height={svgHeight} className="overflow-visible">
          <defs>
            {/* Angular/Conic gradient for the progress */}
            <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={baseColor} stopOpacity={Math.max(0.2, opacity)} />
              <stop offset="30%" stopColor={baseColor} stopOpacity={Math.max(0.4, opacity)} />
              <stop offset="70%" stopColor={baseColor} stopOpacity={Math.max(0.6, opacity)} />
              <stop offset="100%" stopColor={baseColor} stopOpacity={Math.max(0.8, opacity)} />
            </radialGradient>

            {/* Sweep gradient effect using multiple stops */}
            <linearGradient
              id={`sweep-${gradientId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor={baseColor} stopOpacity={Math.max(0.3, opacity * 1.2)} />
              <stop offset="25%" stopColor={baseColor} stopOpacity={Math.max(0.5, opacity * 1.1)} />
              <stop offset="50%" stopColor={baseColor} stopOpacity={Math.max(0.7, opacity)} />
              <stop offset="75%" stopColor={baseColor} stopOpacity={Math.max(0.6, opacity * 0.9)} />
              <stop offset="100%" stopColor={baseColor} stopOpacity={Math.max(0.4, opacity * 0.8)} />
            </linearGradient>

            {/* Background gradient for unfilled area */}
            <linearGradient id={`bg-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#374151" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#4b5563" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#374151" stopOpacity="0.6" />
            </linearGradient>

            {/* Glow effect for higher scores */}
            <filter id={`glow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={opacity < 0.5 ? "0" : "3"} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background arc - unfilled area */}
          <path
            d={`M ${padding + strokeWidth / 2} ${centerY} A ${radius} ${radius} 0 0 1 ${svgSize - padding - strokeWidth / 2} ${centerY}`}
            fill="none"
            stroke={`url(#bg-${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress arc - filled area with angular gradient and glow */}
          <path
            d={`M ${padding + strokeWidth / 2} ${centerY} A ${radius} ${radius} 0 0 1 ${svgSize - padding - strokeWidth / 2} ${centerY}`}
            fill="none"
            stroke={`url(#sweep-${gradientId})`}
            strokeWidth={strokeWidth + 2}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            filter={`url(#glow-${gradientId})`}
            style={{
              transition: animated ? `stroke-dashoffset ${duration}ms ease-out, filter ${duration}ms ease-out` : "none",
            }}
          />
          {/* Score dividers at 2.0, 3.0, and 4.0 */}
          {[2.0, 3.0, 4.0].map((dividerScore) => {
            const dividerPercentage = ((dividerScore - 1.0) / 4.0) * 100
            // Fix angle calculation: semi-circle goes from π (left) to 0 (right)
            const dividerAngle = Math.PI - (dividerPercentage / 100) * Math.PI

            // Calculate inner and outer points for the divider line
            const innerRadius = radius - strokeWidth / 2 - 2
            const outerRadius = radius + strokeWidth / 2 + 2

            const innerX = centerX + innerRadius * Math.cos(dividerAngle)
            const innerY = centerY - innerRadius * Math.sin(dividerAngle)
            const outerX = centerX + outerRadius * Math.cos(dividerAngle)
            const outerY = centerY - outerRadius * Math.sin(dividerAngle)

            return (
              <line
                key={dividerScore}
                x1={innerX}
                y1={innerY}
                x2={outerX}
                y2={outerY}
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )
          })}
        </svg>

        {/* Score text */}
        {showScore && (
          <div
            className="absolute inset-0 flex items-end justify-center"
            style={{
              color: textColor,
              paddingBottom: `${padding}px`,
            }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold">{animatedScore.toFixed(1)}</div>
              <div className="text-sm text-gray-500">out of 5.0</div>
              <div className="text-xs text-gray-400 mt-1">
                Progress: {animatedPercentage.toFixed(0)}% | Glow: {opacity < 0.5 ? "Off" : "On"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
