import { useState } from 'react'
import { formatDate } from '../utils/helpers'
import ColorPicker from './ColorPicker'

function NoteCard({
  note,
  onUpdate,
  onDelete,
  onArchive,
  onPin,
  selectedNotes,
  onSelectNote,
  isMultiSelect,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(note.title)
  const [editContent, setEditContent] = useState(note.content)
  const [editColor, setEditColor] = useState(note.color)
  const [editTags, setEditTags] = useState(note.tags?.join(', ') || '')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSave = () => {
    if (!editContent.trim()) return

    onUpdate({
      ...note,
      title: editTitle.trim(),
      content: editContent.trim(),
      color: editColor,
      tags: editTags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      updatedAt: new Date().toISOString(),
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(note.title)
    setEditContent(note.content)
    setEditColor(note.color)
    setEditTags(note.tags?.join(', ') || '')
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(note.id)
    setShowDeleteConfirm(false)
  }

  if (isEditing) {
    return (
      <div
        className="rounded-lg shadow-lg overflow-hidden"
        style={{ backgroundColor: editColor }}
      >
        <div className="p-4">
          <input
            type="text"
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            maxLength={100}
            className="w-full px-2 py-1 text-lg font-semibold bg-transparent border-none outline-none placeholder-gray-600"
          />
          <textarea
            placeholder="Content"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={4}
            className="w-full px-2 py-1 bg-transparent border-none outline-none resize-none placeholder-gray-600"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
            className="w-full px-2 py-1 text-sm bg-transparent border-none outline-none placeholder-gray-600 mt-2"
          />
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-300/50">
            <ColorPicker selectedColor={editColor} onColorSelect={setEditColor} />
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-black/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden group transition-all hover:shadow-lg ${
        note.isPinned ? 'ring-2 ring-yellow-400' : ''
      } ${selectedNotes?.includes(note.id) ? 'ring-2 ring-blue-500' : ''}`}
      style={{ backgroundColor: note.color }}
    >
      <div className="p-4">
        {isMultiSelect && (
          <div className="mb-2">
            <input
              type="checkbox"
              checked={selectedNotes?.includes(note.id)}
              onChange={() => onSelectNote(note.id)}
              className="w-4 h-4 rounded border-gray-300"
            />
          </div>
        )}

        {note.isPinned && (
          <div className="flex items-center gap-1 text-xs text-yellow-600 mb-2">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
            </svg>
            Pinned
          </div>
        )}

        {note.title && (
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
            {note.title}
          </h3>
        )}

        <p className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-6">
          {note.content}
        </p>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-black/10 text-gray-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-3">
          {note.updatedAt !== note.createdAt
            ? `Updated ${formatDate(note.updatedAt)}`
            : formatDate(note.createdAt)}
        </p>
      </div>

      <div className="px-4 pb-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPin(note.id)}
            className={`p-2 rounded-full transition-colors ${
              note.isPinned
                ? 'text-yellow-600 hover:bg-yellow-100'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            title={note.isPinned ? 'Unpin' : 'Pin'}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
            </svg>
          </button>

          <button
            onClick={() => onArchive(note.id)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
            title={note.isArchived ? 'Unarchive' : 'Archive'}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
            title="Edit"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delete note?
            </h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteCard
