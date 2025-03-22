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
      <div className="fixed top-0 left-0 right-0 z-10 h-16 p-4">
        <Navbar />
      </div>
      {/* Due to navbar behaving as a fixed component it gets hidden behind the navbar hence we added mt-16 to prevent that behaviour*/}
      <div className="mt-20">
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