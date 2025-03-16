"use client"

import { Navbar } from "@/components/navbar"
import { TemplateGallery } from "@/components/template-gallery"

import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

const Home = () => {

  const documents = useQuery(api.documents.get)

  if (documents === undefined) {
    return (
      <span className="inline-block w-12 h-12 border-5 border-white border-b-[#ad79e1] rounded-full animate-spin"/>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfd]">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 p-4">
        <Navbar />
      </div>
      {/* Due to navbar behaving as a fixed component it gets hidden behind the navbar hence we added mt-16 to prevent that behaviour*/}
      <div className="mt-20">
        <TemplateGallery />
        {
          documents?.map((document) => (
            <span
              key={document._id}
            >
              {document.title}
            </span>
          ))
        }
      </div>
    </div>

  )
}

// Page file in Next.js always has a export default 
export default Home