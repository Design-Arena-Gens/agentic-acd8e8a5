'use client'

import { useState, useEffect } from 'react'
import OnboardingFlow from './components/OnboardingFlow'
import HomeScreen from './components/HomeScreen'
import OrderFlow from './components/OrderFlow'
import EmergencyMode from './components/EmergencyMode'
import ProfileScreen from './components/ProfileScreen'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'home' | 'order' | 'emergency' | 'profile'>('onboarding')
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenOnboarding')
    if (seen) {
      setHasSeenOnboarding(true)
      setCurrentScreen('home')
    }
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setHasSeenOnboarding(true)
    setCurrentScreen('home')
  }

  return (
    <main className="min-h-screen bg-white">
      {currentScreen === 'onboarding' && (
        <OnboardingFlow onComplete={completeOnboarding} />
      )}
      {currentScreen === 'home' && (
        <HomeScreen
          onNavigate={setCurrentScreen}
        />
      )}
      {currentScreen === 'order' && (
        <OrderFlow onBack={() => setCurrentScreen('home')} />
      )}
      {currentScreen === 'emergency' && (
        <EmergencyMode onBack={() => setCurrentScreen('home')} />
      )}
      {currentScreen === 'profile' && (
        <ProfileScreen onBack={() => setCurrentScreen('home')} />
      )}
    </main>
  )
}
