'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle, Zap, Phone } from 'lucide-react'

interface EmergencyModeProps {
  onBack: () => void
}

export default function EmergencyMode({ onBack }: EmergencyModeProps) {
  const [isActivated, setIsActivated] = useState(false)
  const [countdown, setCountdown] = useState(420) // 7 minutes in seconds

  useEffect(() => {
    if (isActivated && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isActivated, countdown])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isActivated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-500 to-red-600 text-white">
        <div className="px-6 py-4">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-12 text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8"
          >
            <AlertCircle className="w-32 h-32 mx-auto mb-4" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-4">Emergency Drone Dispatched</h1>
          <p className="text-red-100 mb-12">Priority delivery in progress</p>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <p className="text-sm text-red-100 mb-2">Estimated Arrival</p>
            <motion.div
              key={countdown}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-7xl font-bold mb-4"
            >
              {formatTime(countdown)}
            </motion.div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm">70% faster than standard</span>
            </div>
          </div>

          {/* Priority Route Visualization */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8">
            <h3 className="font-semibold mb-4">Priority Routing Active</h3>
            <div className="relative h-32">
              {/* Animated route */}
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🏪</div>
                  <motion.div
                    animate={{
                      x: [0, 20, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex-1"
                  >
                    <div className="h-1 bg-white/50 w-32 rounded-full">
                      <motion.div
                        animate={{
                          x: [0, 120, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="h-1 bg-white w-8 rounded-full"
                      />
                    </div>
                  </motion.div>
                  <div className="text-4xl">🚁</div>
                  <motion.div
                    animate={{
                      x: [0, 20, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2
                    }}
                    className="flex-1"
                  >
                    <div className="h-1 bg-white/50 w-32 rounded-full">
                      <motion.div
                        animate={{
                          x: [0, 120, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="h-1 bg-white w-8 rounded-full"
                      />
                    </div>
                  </motion.div>
                  <div className="text-4xl">🏥</div>
                </div>
              </motion.div>
            </div>
            <p className="text-sm text-red-100 mt-4">Direct route · No stops · Maximum priority</p>
          </div>

          {/* Help Button */}
          <button className="w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
            <Phone className="w-5 h-5" />
            Call Support
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <button onClick={onBack} className="mb-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Emergency Mode</h1>
        <p className="text-sm text-gray-600">For urgent medical & critical deliveries</p>
      </div>

      <div className="px-6 py-8">
        {/* Warning Card */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 mb-2">Emergency Delivery Protocol</h3>
              <p className="text-sm text-red-700 leading-relaxed">
                This activates priority routing with express handling. Only use for genuine emergencies like medical supplies or critical documents.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Priority Routing</p>
                <p className="text-sm text-gray-600">Direct path, no delays</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">7 Min Delivery</p>
                <p className="text-sm text-gray-600">70% faster than standard</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Live Support</p>
                <p className="text-sm text-gray-600">24/7 emergency hotline</p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Use Cases */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-4">Common Emergency Uses</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '💊', label: 'Medicine' },
              { icon: '🩹', label: 'First Aid' },
              { icon: '💉', label: 'Insulin' },
              { icon: '📄', label: 'Documents' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-saffron to-saffron-light rounded-2xl p-6 mb-8 text-white">
          <p className="text-sm text-white/90 mb-1">Emergency Delivery Fee</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold">₹99</span>
            <span className="text-white/90">+ product cost</span>
          </div>
          <p className="text-sm text-white/90">No surge pricing · Fixed rate 24/7</p>
        </div>

        {/* Activate Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActivated(true)}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-6 rounded-full font-bold text-lg shadow-lg relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-red-400 rounded-full"
          />
          <span className="relative flex items-center justify-center gap-3">
            <AlertCircle className="w-6 h-6" />
            Activate SOS Delivery
          </span>
        </motion.button>
      </div>
    </div>
  )
}
