import { useState } from 'react'

function Header({ onSearch, searchTerm, showArchive, onToggleArchive }) {
  const [inputValue, setInputValue] = useState(searchTerm)

  const handleSearch = (e) => {
    const value = e.target.value
    setInputValue(value)
    onSearch(value)
  }

  const handleClear = () => {
    setInputValue('')
    onSearch('')
  }

  return (
    <header className="bg-yellow-500 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z" />
            </svg>
            <h1 className="text-white text-2xl font-bold hidden sm:block">
              Notes
            </h1>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search notes..."
                value={inputValue}
                onChange={handleSearch}
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:bg-white transition-all"
              />
              {inputValue && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <button
            onClick={onToggleArchive}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              showArchive
                ? 'bg-white text-yellow-600'
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
          >
            {showArchive ? 'Notes' : 'Archive'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
