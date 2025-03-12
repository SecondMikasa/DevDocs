"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { FilePlus } from "lucide-react"
import { useDocumentStore } from '@/store/document-store'

const NewDocumentButton = () => {
  const router = useRouter()
  const createDocument = useDocumentStore(state => state.createDocument)

  // Function to create a new document and navigate to it
  const handleCreateNewDocument = () => {
    const newDocId = createDocument()
    router.push(`/documents/${newDocId}`)
  }

  return (
    <div>
      <button
        onClick={handleCreateNewDocument}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white font-medium bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <FilePlus className="w-5 h-5" />
        <span>New Document</span>
      </button>
    </div>
  )
}

export default NewDocumentButton