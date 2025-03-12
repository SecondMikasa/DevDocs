import NewDocumentButton from "@/components/newDocumentButton"
import RecentDocuments from "@/components/RecentDocuments"

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <NewDocumentButton/>
        <div className="mt-6 border-t pt-4">
        <RecentDocuments/>
        </div>
      </div>
    </div>
  )
}

// Page file in Next.js always has a export default
export default Home

