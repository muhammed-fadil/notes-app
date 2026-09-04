function EmptyState({ isArchiveView }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {isArchiveView ? (
        <>
          <svg
            className="w-24 h-24 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            No archived notes
          </h3>
          <p className="text-gray-400 text-center max-w-sm">
            Notes you archive will appear here. Archive notes to keep your main
            view organized.
          </p>
        </>
      ) : (
        <>
          <svg
            className="w-24 h-24 text-gray-300 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            Notes you add appear here
          </h3>
          <p className="text-gray-400 text-center max-w-sm">
            Click "Take a note..." to create your first note. You can add
            titles, colors, tags, and more.
          </p>
        </>
      )}
    </div>
  )
}

export default EmptyState
