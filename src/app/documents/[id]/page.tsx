"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useDocumentStore } from '@/store/document-store'
import EditorComponent from '@/components/editor'
import Toolbar from '@/app/documents/_components/toolbar'

export default function DocumentPage() {
  const params = useParams()
  const router = useRouter()
  const documentId = params?.id as string
  
  const [title, setTitle] = useState("Untitled Document")
  const [isLoading, setIsLoading] = useState(true)
  
  const getDocument = useDocumentStore(state => state.getDocument)
  const updateDocument = useDocumentStore(state => state.updateDocument)
  const document = getDocument(documentId)
  
  // Load document or redirect if not found
  useEffect(() => {
    if (documentId) {
      const doc = getDocument(documentId)
      if (doc) {
        setTitle(doc.title)
        setIsLoading(false)
      } else {
        // Document not found, redirect to home
        router.push('/')
      }
    }
  }, [documentId, getDocument, router])
  
  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
  }
  
  // Save title when focus is lost
  const handleTitleBlur = () => {
    if (documentId) {
      updateDocument(documentId, { title })
    }
  }
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b bg-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            className="text-xl font-semibold focus:outline-none focus:border-b border-dashed border-gray-300 px-2 py-1"
            placeholder="Untitled Document"
          />
          
          {/* You can add navigation back to home here */}
        </div>
      </header>
      
      <div className="sticky top-16 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto p-2">
          <Toolbar />
        </div>
      </div>
      
      <main className="flex-1 overflow-auto">
        <EditorComponent />
      </main>
    </div>
  )
}