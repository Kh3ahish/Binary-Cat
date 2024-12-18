'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TabContent } from './tab-content'

export function TabContainer() {
  const [activeTab, setActiveTab] = useState('binary')

  const tabs = [
    { id: 'binary', label: 'Binary' },
    { id: 'decimal', label: 'Decimal' },
    { id: 'octal', label: 'Octal' },
    { id: 'hexadecimal', label: 'Hexadecimal' },
    { id: 'text', label: 'Text to Binary' },
    { id: 'binaryToText', label: 'Binary to Text' }
  ]

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="flex flex-wrap md:flex-nowrap bg-gray-700 p-2 overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`px-3 py-2 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap mx-1 mb-2 md:mb-0 ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabContent activeTab={activeTab} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

