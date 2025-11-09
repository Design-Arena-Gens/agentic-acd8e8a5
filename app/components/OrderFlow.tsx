'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Battery, Wind, Package, CheckCircle2 } from 'lucide-react'

interface OrderFlowProps {
  onBack: () => void
}

export default function OrderFlow({ onBack }: OrderFlowProps) {
  const [step, setStep] = useState<'select' | 'tracking' | 'complete'>('select')
  const [countdown, setCountdown] = useState(480) // 8 minutes in seconds
  const [droneStatus, setDroneStatus] = useState({
    battery: 95,
    altitude: 120,
    speed: 45,
    distance: 2.3
  })

  useEffect(() => {
    if (step === 'tracking' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1)
        setDroneStatus(prev => ({
          battery: Math.max(85, prev.battery - 0.1),
          altitude: 120 + Math.sin(Date.now() / 1000) * 20,
          speed: 45 + Math.sin(Date.now() / 500) * 5,
          distance: Math.max(0, prev.distance - 0.005)
        }))
      }, 1000)
      return () => clearInterval(timer)
    } else if (countdown === 0) {
      setStep('complete')
    }
  }, [step, countdown])

  const products = [
    { name: 'Apollo Pharmacy', items: 'Paracetamol, Band-aids', price: '₹185', time: '8 min', image: '💊' },
    { name: 'MedPlus', items: 'Vitamin D, Antiseptic', price: '₹320', time: '7 min', image: '🏥' },
    { name: 'Burger King', items: 'Whopper Meal', price: '₹299', time: '9 min', image: '🍔' },
    { name: 'Dominos', items: 'Margherita Pizza', price: '₹399', time: '10 min', image: '🍕' },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-6"
          >
            <CheckCircle2 className="w-32 h-32 text-green-india" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Delivered!</h1>
          <p className="text-lg text-gray-600 mb-8">Your order arrived in 8 minutes</p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-saffron to-saffron-light text-white px-8 py-4 rounded-full font-semibold"
          >
            Order Again
          </button>
        </motion.div>
      </div>
    )
  }

  if (step === 'tracking') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-saffron to-saffron-light text-white px-6 py-4">
          <button onClick={onBack} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold mb-2">Tracking Your Delivery</h1>
          <p className="text-white/90">Order #ZPH{Math.floor(Math.random() * 10000)}</p>
        </div>

        {/* Countdown */}
        <div className="px-6 py-8 text-center bg-gradient-to-b from-saffron/5 to-transparent">
          <p className="text-gray-600 mb-2">Estimated Arrival</p>
          <motion.div
            key={countdown}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold text-saffron mb-4"
          >
            {formatTime(countdown)}
          </motion.div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-green-india">
              <Clock className="w-4 h-4" />
              <span>vs 45 min ground</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 relative overflow-hidden h-64">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              <motion.path
                d="M 50 200 Q 150 100 250 50"
                stroke="#FF9933"
                strokeWidth="3"
                strokeDasharray="10,10"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>

            {/* Start point */}
            <div className="absolute bottom-8 left-8 bg-green-india text-white w-8 h-8 rounded-full flex items-center justify-center text-xl" style={{ zIndex: 2 }}>
              🏪
            </div>

            {/* End point */}
            <div className="absolute top-8 right-8 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl" style={{ zIndex: 2 }}>
              📍
            </div>

            {/* Drone */}
            <motion.div
              animate={{
                x: [50, 150, 250],
                y: [200, 100, 50]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute text-4xl"
              style={{ zIndex: 3 }}
            >
              🚁
            </motion.div>
          </div>
        </div>

        {/* Drone Stats */}
        <div className="px-6 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Drone Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Battery className="w-5 h-5 text-green-india" />
                <div>
                  <p className="text-xs text-gray-500">Battery</p>
                  <p className="text-lg font-bold text-gray-900">{Math.floor(droneStatus.battery)}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wind className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Speed</p>
                  <p className="text-lg font-bold text-gray-900">{Math.floor(droneStatus.speed)} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">⬆️</span>
                <div>
                  <p className="text-xs text-gray-500">Altitude</p>
                  <p className="text-lg font-bold text-gray-900">{Math.floor(droneStatus.altitude)}m</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-saffron" />
                <div>
                  <p className="text-xs text-gray-500">Distance</p>
                  <p className="text-lg font-bold text-gray-900">{droneStatus.distance.toFixed(1)} km</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="px-6 pb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{products[0].image}</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{products[0].name}</p>
                <p className="text-sm text-gray-600">{products[0].items}</p>
              </div>
              <p className="font-bold text-gray-900">{products[0].price}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        <button onClick={onBack} className="mb-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Select Product</h1>
        <p className="text-sm text-gray-600">Choose from nearby stores</p>
      </div>

      {/* Products */}
      <div className="px-6 py-6 space-y-4">
        {products.map((product, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStep('tracking')}
            className="w-full bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="text-5xl">{product.image}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.items}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 mb-1">{product.price}</p>
                <p className="text-xs text-green-india font-medium">+ ₹45 delivery</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-saffron" />
                <span className="text-sm font-medium text-saffron">{product.time} via drone</span>
              </div>
              <span className="text-xs text-gray-400">vs 45 min ground</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
