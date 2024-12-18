'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { TabContainer } from '@/components/tab-container'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 bg-opacity-80 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <div className="bg-gray-800 bg-opacity-95 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          <TabContainer />
        </div>
      </main>
      <Footer />
    </div>
  )
}

