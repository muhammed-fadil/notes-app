import { useState } from 'react'
import ColorPicker from './ColorPicker'
import { validateNote } from '../utils/validation'
import { DEFAULT_COLOR } from '../data/colors'

function NoteForm({ onAddNote, existingNotes }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [tags, setTags] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validateNote(title, content, existingNotes)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const newNote = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      title: title.trim(),
      content: content.trim(),
      color,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      isArchived: false,
    }

    onAddNote(newNote)
    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setContent('')
    setColor(DEFAULT_COLOR)
    setTags('')
    setErrors({})
    setIsExpanded(false)
  }

  const handleCancel = () => {
    resetForm()
  }

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-lg overflow-hidden transition-all"
        style={{ backgroundColor: color }}
      >
        {!isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="w-full px-4 py-3 text-left text-gray-600 hover:bg-black/5 transition-colors"
          >
            Take a note...
          </button>
        )}

        {isExpanded && (
          <div className="p-4">
            <input
              type="text"
              placeholder="Title (optional)"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors({ ...errors, title: null })
              }}
              maxLength={100}
              className="w-full px-2 py-1 text-lg font-semibold bg-transparent border-none outline-none placeholder-gray-600"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
            <p className="text-xs text-gray-500 text-right mb-2">
              {title.length}/100
            </p>

            <textarea
              placeholder="Take a note..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                if (errors.content) setErrors({ ...errors, content: null })
              }}
              rows={4}
              className="w-full px-2 py-1 bg-transparent border-none outline-none resize-none placeholder-gray-600"
            />
            {errors.content && (
              <p className="text-red-600 text-sm mt-1">{errors.content}</p>
            )}
            {errors.duplicate && (
              <p className="text-red-600 text-sm mt-1">{errors.duplicate}</p>
            )}

            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-2 py-1 text-sm bg-transparent border-none outline-none placeholder-gray-600 mt-2"
            />

            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-300/50">
              <div className="flex items-center gap-3">
                <ColorPicker selectedColor={color} onColorSelect={setColor} />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-black/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default NoteForm
