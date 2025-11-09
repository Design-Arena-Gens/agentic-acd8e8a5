'use client'

import { ArrowLeft, Package, Clock, TrendingUp, Award, MapPin, Bell, CreditCard, HelpCircle, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProfileScreenProps {
  onBack: () => void
}

export default function ProfileScreen({ onBack }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-saffron to-saffron-light text-white px-6 py-6 rounded-b-3xl">
        <button onClick={onBack} className="mb-6">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h1 className="text-2xl font-bold">Rahul Sharma</h1>
            <p className="text-white/90">rahul.sharma@email.com</p>
            <p className="text-sm text-white/80 mt-1">Member since Jan 2025</p>
          </div>
        </div>

        {/* Drone Savings Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90 mb-1">Drone Savings</p>
              <p className="text-3xl font-bold">₹2,450</p>
              <p className="text-xs text-white/80">vs traditional delivery</p>
            </div>
            <div className="text-5xl">💰</div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-gray-200 text-center">
            <Package className="w-6 h-6 text-saffron mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">47</p>
            <p className="text-xs text-gray-500">Deliveries</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-200 text-center">
            <Clock className="w-6 h-6 text-green-india mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">6.8</p>
            <p className="text-xs text-gray-500">Avg Time</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-200 text-center">
            <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">98%</p>
            <p className="text-xs text-gray-500">On Time</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6 border border-yellow-200">
          <div className="flex items-center gap-4 mb-4">
            <Award className="w-8 h-8 text-yellow-600" />
            <div>
              <h3 className="font-bold text-gray-900">Sky Pioneer</h3>
              <p className="text-sm text-gray-600">Top 5% of users</p>
            </div>
          </div>
          <div className="flex gap-3">
            {['🏆', '⭐', '🚁', '⚡', '💎'].map((emoji, i) => (
              <div key={i} className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl border border-yellow-200">
                {emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {[
              { item: 'Apollo Pharmacy', time: '2 days ago', price: '₹230', icon: '💊' },
              { item: 'Dominos Pizza', time: '5 days ago', price: '₹444', icon: '🍕' },
              { item: 'Important Documents', time: '1 week ago', price: '₹90', icon: '📄' },
            ].map((order, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
                <div className="text-3xl">{order.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{order.item}</p>
                  <p className="text-sm text-gray-500">{order.time}</p>
                </div>
                <p className="font-bold text-gray-900">{order.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-2 mb-6">
          {[
            { icon: <MapPin className="w-5 h-5" />, label: 'Saved Addresses', color: 'text-blue-600' },
            { icon: <Bell className="w-5 h-5" />, label: 'Notifications', color: 'text-purple-600' },
            { icon: <CreditCard className="w-5 h-5" />, label: 'Payment Methods', color: 'text-green-600' },
            { icon: <HelpCircle className="w-5 h-5" />, label: 'Help & Support', color: 'text-orange-600' },
          ].map((item, i) => (
            <button key={i} className="w-full bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className={item.color}>{item.icon}</div>
              <span className="flex-1 text-left font-medium text-gray-900">{item.label}</span>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        {/* Footer */}
        <div className="text-center mt-8 space-y-1">
          <p className="text-sm text-gray-500">Zephyr v1.0.0</p>
          <p className="text-xs text-gray-400">Made with ❤️ in India</p>
        </div>
      </div>
    </div>
  )
}
