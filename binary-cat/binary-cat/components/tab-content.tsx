'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { convertNumber, convertBinaryToText } from '@/lib/converter'
import { Copy, RefreshCw } from 'lucide-react'

interface TabContentProps {
  activeTab: string
}

export function TabContent({ activeTab }: TabContentProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState({
    binary: '-',
    decimal: '-',
    octal: '-',
    hexadecimal: '-',
    text: '-'
  })

  const textBinaryRef = useRef<HTMLSpanElement>(null);
  const binaryTextRef = useRef<HTMLSpanElement>(null);
  const decimalRef = useRef<HTMLSpanElement>(null);
  const octalRef = useRef<HTMLSpanElement>(null);
  const hexadecimalRef = useRef<HTMLSpanElement>(null);

  const handleConvert = () => {
    try {
      if (activeTab === 'binaryToText') {
        const result = convertBinaryToText(input)
        setOutput({ ...output, text: result })
      } else {
        const result = convertNumber(input, activeTab)
        setOutput(result)
      }
    } catch (error) {
      setOutput({
        binary: '-',
        decimal: '-',
        octal: '-',
        hexadecimal: '-',
        text: '-'
      })
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred');
      }
    }
  }

  const handleReset = () => {
    setInput('')
    setOutput({
      binary: '-',
      decimal: '-',
      octal: '-',
      hexadecimal: '-',
      text: '-'
    })
  }

  const getPlaceholder = () => {
    if (activeTab === 'text') return 'Enter text'
    if (activeTab === 'binaryToText') return 'Enter binary (space-separated bytes)'
    return `Enter ${activeTab} number`
  }

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    alert(`Copied ${field} to clipboard!`);
  }

  const renderCopyButton = (field: string, value: string) => (
    <button
      onClick={() => handleCopy(field, value)}
      className="ml-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors flex-shrink-0"
      aria-label={`Copy ${field}`}
    >
      <Copy size={16} />
    </button>
  )

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div>
        <label htmlFor={`${activeTab}-input`} className="block text-sm font-semibold mb-2 text-gray-300">
          {activeTab === 'binaryToText' ? 'Binary Input' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </label>
        <input
          type="text"
          id={`${activeTab}-input`}
          placeholder={getPlaceholder()}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <motion.button
          className="flex-1 bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center font-semibold"
          onClick={handleConvert}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Convert
        </motion.button>
        <motion.button
          className="flex-1 bg-gray-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-gray-500 transition-colors flex items-center justify-center font-semibold"
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={18} className="mr-2" />
          Reset
        </motion.button>
      </div>
      <div className="space-y-4">
        {activeTab === 'text' ? (
          <motion.div 
            className="bg-gray-700 p-3 md:p-4 rounded-lg flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-grow mr-2 break-all">
              <span className="font-semibold text-gray-300">Converted Binary:</span> <span id="text-binary" ref={textBinaryRef} className="text-white">{output.binary}</span>
            </div>
            {renderCopyButton('Binary', output.binary)}
          </motion.div>
        ) : activeTab === 'binaryToText' ? (
          <motion.div 
            className="bg-gray-700 p-3 md:p-4 rounded-lg flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-grow mr-2 break-all">
              <span className="font-semibold text-gray-300">Converted Text:</span> <span id="binary-text" ref={binaryTextRef} className="text-white">{output.text}</span>
            </div>
            {renderCopyButton('Text', output.text)}
          </motion.div>
        ) : (
          Object.entries(output).map(([key, value]) => {
            if (key !== activeTab && key !== 'text') {
              return (
                <motion.div 
                  key={key} 
                  className="bg-gray-700 p-3 md:p-4 rounded-lg flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-grow mr-2 break-all">
                    <span className="font-semibold text-gray-300">Converted {key.charAt(0).toUpperCase() + key.slice(1)}:</span>{' '}
                    <span id={`${activeTab}-${key}`} ref={key === 'decimal' ? decimalRef : key === 'octal' ? octalRef : key === 'hexadecimal' ? hexadecimalRef : null} className="text-white">{value}</span>
                  </div>
                  {renderCopyButton(key.charAt(0).toUpperCase() + key.slice(1), value)}
                </motion.div>
              )
            }
            return null
          })
        )}
      </div>
    </div>
  )
}

