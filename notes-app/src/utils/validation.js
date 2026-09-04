export const validateNote = (title, content, existingNotes = [], editingId = null) => {
  const errors = {}

  if (!content || content.trim() === '') {
    errors.content = 'Content is required'
  }

  if (title && title.length > 100) {
    errors.title = 'Title must be 100 characters or less'
  }

  if (title && content) {
    const isDuplicate = existingNotes.some(
      (note) =>
        note.title.toLowerCase() === title.toLowerCase() &&
        note.content.toLowerCase() === content.toLowerCase() &&
        note.id !== editingId
    )
    if (isDuplicate) {
      errors.duplicate = 'A note with this title and content already exists'
    }
  }

  return errors
}
