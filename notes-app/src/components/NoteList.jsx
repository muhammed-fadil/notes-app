import NoteCard from './NoteCard'

function NoteList({
  notes,
  onUpdate,
  onDelete,
  onArchive,
  onPin,
  selectedNotes,
  onSelectNote,
  isMultiSelect,
}) {
  if (notes.length === 0) {
    return null
  }

  const pinnedNotes = notes.filter((note) => note.isPinned)
  const unpinnedNotes = notes.filter((note) => !note.isPinned)

  return (
    <div className="max-w-6xl mx-auto px-4">
      {pinnedNotes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Pinned
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onArchive={onArchive}
                onPin={onPin}
                selectedNotes={selectedNotes}
                onSelectNote={onSelectNote}
                isMultiSelect={isMultiSelect}
              />
            ))}
          </div>
        </div>
      )}

      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && (
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Others
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {unpinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onArchive={onArchive}
                onPin={onPin}
                selectedNotes={selectedNotes}
                onSelectNote={onSelectNote}
                isMultiSelect={isMultiSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteList
