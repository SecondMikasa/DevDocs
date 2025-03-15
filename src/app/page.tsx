import Link from "next/link"
import { Navbar } from "../components/navbar"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-[#fafbfd] p-4">
        <Navbar />
      </div>
      {/* Due to navbar behaving as a fixed component it gets hidden behind the navbar hence we added mt-16 to prevent that behaviour*/}
      <div className="mt-24">
        Click
        <Link href="/documents/123">
          &nbsp;
          <span className="text-blue-500 underline">
            here
          </span>
          &nbsp;
        </Link>
        to go to document id
      </div>
    </div>

  )
}

// Page file in Next.js always has a export default 
export default Home