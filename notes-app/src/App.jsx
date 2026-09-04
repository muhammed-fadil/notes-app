import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import FilterBar from './components/FilterBar'
import EmptyState from './components/EmptyState'
import { useLocalStorage } from './hooks/useLocalStorage'
import { sortByNewest, sortByOldest, sortByTitle } from './utils/helpers'

function App() {
  const [notes, setNotes] = useLocalStorage('keep-notes', [])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [showArchive, setShowArchive] = useState(false)
  const [filterPinned, setFilterPinned] = useState(false)
  const [isMultiSelect, setIsMultiSelect] = useState(false)
  const [selectedNotes, setSelectedNotes] = useState([])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMultiSelect) {
        setIsMultiSelect(false)
        setSelectedNotes([])
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'a' && isMultiSelect) {
        e.preventDefault()
        const currentNotes = getFilteredNotes()
        setSelectedNotes(currentNotes.map((n) => n.id))
      }
      if (e.key === 'Delete' && isMultiSelect && selectedNotes.length > 0) {
        handleBulkDelete()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMultiSelect, selectedNotes, notes])

  const handleAddNote = (newNote) => {
    setNotes((prev) => [newNote, ...prev])
  }

  const handleUpdateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    )
  }

  const handleDeleteNote = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
    setSelectedNotes((prev) => prev.filter((id) => id !== noteId))
  }

  const handleArchiveNote = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, isArchived: !note.isArchived } : note
      )
    )
  }

  const handlePinNote = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
      )
    )
  }

  const handleSelectNote = (noteId) => {
    setSelectedNotes((prev) =>
      prev.includes(noteId)
        ? prev.filter((id) => id !== noteId)
        : [...prev, noteId]
    )
  }

  const handleBulkDelete = () => {
    setNotes((prev) => prev.filter((note) => !selectedNotes.includes(note.id)))
    setSelectedNotes([])
    setIsMultiSelect(false)
  }

  const handleToggleMultiSelect = () => {
    setIsMultiSelect(!isMultiSelect)
    setSelectedNotes([])
  }

  const getFilteredNotes = useCallback(() => {
    let filtered = notes

    filtered = filtered.filter((note) => note.isArchived === showArchive)

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (note) =>
          (note.title && note.title.toLowerCase().includes(term)) ||
          note.content.toLowerCase().includes(term) ||
          (note.tags &&
            note.tags.some((tag) => tag.toLowerCase().includes(term)))
      )
    }

    if (filterPinned) {
      filtered = filtered.filter((note) => note.isPinned)
    }

    switch (sortBy) {
      case 'oldest':
        filtered = [...filtered].sort(sortByOldest)
        break
      case 'title':
        filtered = [...filtered].sort(sortByTitle)
        break
      case 'newest':
      default:
        filtered = [...filtered].sort(sortByNewest)
        break
    }

    return filtered
  }, [notes, searchTerm, sortBy, showArchive, filterPinned])

  const filteredNotes = getFilteredNotes()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        showArchive={showArchive}
        onToggleArchive={() => {
          setShowArchive(!showArchive)
          setIsMultiSelect(false)
          setSelectedNotes([])
        }}
      />

      <main className="py-8">
        {!showArchive && (
          <NoteForm onAddNote={handleAddNote} existingNotes={notes} />
        )}

        <FilterBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterPinned={filterPinned}
          onFilterPinnedChange={() => setFilterPinned(!filterPinned)}
          isMultiSelect={isMultiSelect}
          onToggleMultiSelect={handleToggleMultiSelect}
          selectedCount={selectedNotes.length}
          onBulkDelete={handleBulkDelete}
        />

        {filteredNotes.length > 0 ? (
          <NoteList
            notes={filteredNotes}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
            onArchive={handleArchiveNote}
            onPin={handlePinNote}
            selectedNotes={selectedNotes}
            onSelectNote={handleSelectNote}
            isMultiSelect={isMultiSelect}
          />
        ) : (
          <EmptyState isArchiveView={showArchive} />
        )}
      </main>

      {isMultiSelect && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          Press <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">Esc</kbd> to
          cancel
          {selectedNotes.length > 0 && (
            <>
              {' '}or{' '}
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">Del</kbd> to
              delete selected
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App
