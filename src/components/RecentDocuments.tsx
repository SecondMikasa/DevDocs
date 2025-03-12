"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { File, Trash2 } from "lucide-react"
import { useDocumentStore } from '@/store/document-store'

const RecentDocuments = () => {
  const router = useRouter()
  const documents = useDocumentStore(state => state.documents)
  const deleteDocument = useDocumentStore(state => state.deleteDocument)

  // Sort documents by updatedAt (most recent first)
  const sortedDocuments = [...documents].sort((a, b) => b.updatedAt - a.updatedAt)

  // Format date to a readable string
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleOpenDocument = (id: string) => {
    router.push(`/documents/${id}`)
  }

  const handleDeleteDocument = (e: React.MouseEvent, id: string) => {
    e.stopPropagation() // Prevent opening the document when clicking delete
    deleteDocument(id)
  }

  if (sortedDocuments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No documents yet. Create your first document!</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Documents</h2>
      <div className="space-y-3">
        {sortedDocuments.map(doc => (
          <div 
            key={doc.id}
            onClick={() => handleOpenDocument(doc.id)}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <File className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-medium">{doc.title}</h3>
                <p className="text-sm text-gray-500">Last edited {formatDate(doc.updatedAt)}</p>
              </div>
            </div>
            <button
              onClick={(e) => handleDeleteDocument(e, doc.id)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentDocuments