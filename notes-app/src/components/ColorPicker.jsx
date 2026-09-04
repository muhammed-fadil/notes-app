import { useState } from 'react'
import { COLORS } from '../data/colors'

function ColorPicker({ selectedColor, onColorSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors flex items-center justify-center"
        style={{ backgroundColor: selectedColor }}
        title="Select color"
      >
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 p-3 bg-white rounded-lg shadow-xl z-50 grid grid-cols-4 gap-2 min-w-[200px]">
            {COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => {
                  onColorSelect(color.value)
                  setIsOpen(false)
                }}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  selectedColor === color.value
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ColorPicker
