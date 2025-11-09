'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, MapPin, Pill, UtensilsCrossed, FileText, Laptop, User, Menu } from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: 'home' | 'order' | 'emergency' | 'profile') => void
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [address, setAddress] = useState('')
  const [isDroneZone, setIsDroneZone] = useState(true)

  const categories = [
    { icon: <Pill className="w-8 h-8" />, label: 'Medicine', color: 'bg-red-50 text-red-600' },
    { icon: <UtensilsCrossed className="w-8 h-8" />, label: 'Food', color: 'bg-orange-50 text-orange-600' },
    { icon: <FileText className="w-8 h-8" />, label: 'Documents', color: 'bg-blue-50 text-blue-600' },
    { icon: <Laptop className="w-8 h-8" />, label: 'Electronics', color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-saffron to-saffron-light rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Zephyr</h1>
              <p className="text-xs text-gray-500">Drone Delivery</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Emergency Button */}
        <motion.button
          onClick={() => onNavigate('emergency')}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 mb-6 shadow-lg relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-red-400 rounded-2xl"
          />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold">Emergency Mode</p>
                <p className="text-sm text-red-100">One-tap SOS delivery</p>
              </div>
            </div>
            <div className="text-3xl">🚨</div>
          </div>
        </motion.button>

        {/* Address Input */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-saffron" />
            <input
              type="text"
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 text-gray-900 placeholder-gray-400 outline-none"
            />
          </div>
          {isDroneZone && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <div className="w-2 h-2 bg-green-india rounded-full animate-pulse" />
              <p className="text-xs text-green-india font-medium">Drone Zone Available</p>
            </div>
          )}
        </div>

        {/* Live Tracker Map */}
        <div className="bg-gradient-to-br from-saffron/10 to-green-india/10 rounded-2xl p-6 mb-6 relative overflow-hidden h-48">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

          <motion.div
            animate={{
              x: [0, 100, 200, 100, 0],
              y: [0, 50, 0, -30, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="text-4xl">🚁</div>
          </motion.div>

          <div className="relative">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Live Drone Tracker</h3>
            <p className="text-sm text-gray-600">3 drones active nearby</p>
          </div>

          <div className="absolute bottom-4 right-4 bg-white rounded-lg px-3 py-2 shadow-md">
            <p className="text-xs text-gray-500">Avg. Delivery Time</p>
            <p className="text-xl font-bold text-green-india">8 min</p>
          </div>
        </div>

        {/* Quick Categories */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('order')}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-3 mx-auto`}>
                  {category.icon}
                </div>
                <p className="text-sm font-semibold text-gray-900">{category.label}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-saffron">₹45</p>
            <p className="text-xs text-gray-500">Fixed Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-india">8 min</p>
            <p className="text-xs text-gray-500">Avg Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">24/7</p>
            <p className="text-xs text-gray-500">Available</p>
          </div>
        </div>
      </div>
    </div>
  )
}
