export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export const sortByNewest = (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
export const sortByOldest = (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
export const sortByTitle = (a, b) => (a.title || '').localeCompare(b.title || '')
