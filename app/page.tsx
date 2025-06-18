"use client"

import { useState } from "react"
import { SemiCircleProgress } from "@/components/semi-circle-progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function Home() {
  const [score, setScore] = useState(3.5)
  const [customScore, setCustomScore] = useState([3.5])

  const presetScores = [1.0, 1.8, 2.5, 3.2, 4.1, 4.7, 5.0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Semi-Circle Progress Bar</h1>
          <p className="text-gray-300">Interactive progress visualization with angular gradient mapping</p>
        </div>

        {/* Main Progress Display */}
        <Card className="w-full bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Current Score</CardTitle>
            <CardDescription className="text-gray-300">
              Angular gradient with opacity mapped to score value
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <SemiCircleProgress score={score} size={300} strokeWidth={16} animated={true} duration={1200} />
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Preset Scores */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Preset Scores</CardTitle>
              <CardDescription className="text-gray-300">Click to test different score values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {presetScores.map((presetScore) => (
                  <Button
                    key={presetScore}
                    variant={score === presetScore ? "default" : "outline"}
                    onClick={() => setScore(presetScore)}
                    className="text-sm"
                  >
                    {presetScore.toFixed(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Score Slider */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Custom Score</CardTitle>
              <CardDescription className="text-gray-300">
                Use the slider to set any score between 1.0 and 5.0
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="px-2">
                <Slider
                  value={customScore}
                  onValueChange={(value) => {
                    setCustomScore(value)
                    setScore(value[0])
                  }}
                  max={5.0}
                  min={1.0}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <div className="text-center text-sm text-gray-600">Current: {customScore[0].toFixed(1)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Multiple Examples */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Multiple Progress Bars</CardTitle>
            <CardDescription className="text-gray-300">Different sizes and configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-white">Small (150px)</h3>
                <SemiCircleProgress score={2.1} size={150} strokeWidth={10} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-white">Medium (200px)</h3>
                <SemiCircleProgress score={3.8} size={200} strokeWidth={12} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-white">Large (250px)</h3>
                <SemiCircleProgress score={4.9} size={250} strokeWidth={14} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gradient Explanation */}
        <Card className="w-full bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Angular Gradient Mapping</CardTitle>
            <CardDescription className="text-gray-300">
              The filled area uses an angular gradient that varies opacity across the arc
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-white font-semibold">1.0</div>
                <div className="text-gray-300 text-sm">High Opacity</div>
                <div className="text-gray-400 text-xs">No Glow</div>
              </div>
              <div className="space-y-2">
                <div className="text-white font-semibold">2.0</div>
                <div className="text-gray-300 text-sm">Medium-High</div>
                <div className="text-gray-400 text-xs">No Glow</div>
              </div>
              <div className="space-y-2">
                <div className="text-white font-semibold">3.0</div>
                <div className="text-gray-300 text-sm">Medium</div>
                <div className="text-gray-400 text-xs">Glow Starts</div>
              </div>
              <div className="space-y-2">
                <div className="text-white font-semibold">4.0</div>
                <div className="text-gray-300 text-sm">Low Opacity</div>
                <div className="text-gray-400 text-xs">Medium Glow</div>
              </div>
              <div className="space-y-2">
                <div className="text-white font-semibold">5.0</div>
                <div className="text-gray-300 text-sm">Very Low</div>
                <div className="text-gray-400 text-xs">Full Glow</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-300 text-sm">
                <strong>Angular Gradient:</strong> Creates a sweep effect across the arc with varying opacity
                <br />
                <strong>Fixed Clipping:</strong> Added proper padding and SVG dimensions to prevent cutoff
                <br />
                <strong>Enhanced Visibility:</strong> Glow effect helps maintain visibility at higher scores
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
