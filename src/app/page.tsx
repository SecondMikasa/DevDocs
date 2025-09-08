"use client"
import { useSearchParams } from "@/hooks/use-search-params"

import { Navbar } from "@/components/navbar"
import { TemplateGallery } from "@/components/template-gallery"
import { DocumentsTable } from "@/components/documents-table"

import { usePaginatedQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

const Home = () => {

  const [search] = useSearchParams("search")

  const {
    results,
    status,
    loadMore
  } = usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5 })

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfd]">
      <div className="fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] shadow-sm">
        <Navbar />
      </div>
      {/* Adjust top margin for mobile (two-row navbar ~116px) vs desktop (single-row navbar ~80px) */}
      <div className="mt-[120px] sm:mt-20">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>

  )
}

// Page file in Next.js always has a export default 
export default Home