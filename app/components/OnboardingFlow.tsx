'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Clock, IndianRupee, Plane } from 'lucide-react'

interface OnboardingFlowProps {
  onComplete: () => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: <Plane className="w-24 h-24 text-saffron" />,
      title: "Skip traffic, not deliveries",
      description: "Get your essentials delivered by AI-powered drones in minutes",
      color: "from-saffron to-saffron-light"
    },
    {
      icon: <Clock className="w-24 h-24 text-green-india" />,
      title: "Medicine at 3AM? We deliver",
      description: "24/7 emergency deliveries when you need them most",
      color: "from-green-india to-green-light"
    },
    {
      icon: <IndianRupee className="w-24 h-24 text-saffron" />,
      title: "₹45 delivery across cities",
      description: "Fixed pricing. No surge. No waiting.",
      color: "from-saffron-dark to-saffron"
    }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="relative h-full flex flex-col">
        {/* Skip button */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={handleSkip}
            className="text-gray-500 text-sm font-medium hover:text-gray-700"
          >
            Skip
          </button>
        </div>

        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Icon with gradient background */}
              <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br ${slides[currentSlide].color} mb-8`}>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-white"
                >
                  {slides[currentSlide].icon}
                </motion.div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg text-gray-600 max-w-sm mx-auto">
                {slides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom section with indicators and button */}
        <div className="pb-12 px-8">
          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-saffron'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-saffron to-saffron-light text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
