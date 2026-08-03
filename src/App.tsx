import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { Skeleton } from "@/components/ui/skeleton"
import { LibraryPage } from "@/pages/library-page"

const BookReaderPage = lazy(() =>
  import("@/pages/book-reader-page").then((module) => ({
    default: module.BookReaderPage,
  }))
)

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LibraryPage />} />
      <Route
        path="/books/:bookId"
        element={
          <Suspense
            fallback={
              <main className="flex min-h-svh items-center justify-center bg-muted p-6">
                <Skeleton className="h-[72vh] w-[min(80vw,520px)]" />
              </main>
            }
          >
            <BookReaderPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
