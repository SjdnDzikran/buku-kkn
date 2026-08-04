import {
  Alert02Icon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Download04Icon,
  FullScreenIcon,
  ZoomInAreaIcon,
  ZoomOutAreaIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Link, useParams } from "react-router-dom"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getBook } from "@/lib/books"
import {
  getNextPage,
  getPreviousPage,
  getVisiblePages,
} from "@/lib/reader"
import { cn } from "@/lib/utils"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

const WIDE_READER_QUERY = "(min-width: 1024px)"

function useReaderViewport() {
  const [viewport, setViewport] = useState(() => ({
    isWide: window.matchMedia(WIDE_READER_QUERY).matches,
    width: window.innerWidth,
  }))

  useEffect(() => {
    const mediaQuery = window.matchMedia(WIDE_READER_QUERY)
    const updateViewport = () => {
      setViewport({ isWide: mediaQuery.matches, width: window.innerWidth })
    }

    mediaQuery.addEventListener("change", updateViewport)
    window.addEventListener("resize", updateViewport)

    return () => {
      mediaQuery.removeEventListener("change", updateViewport)
      window.removeEventListener("resize", updateViewport)
    }
  }, [])

  return viewport
}

type ReaderButtonProps = {
  label: string
  disabled?: boolean
  onClick: () => void
  icon: Parameters<typeof HugeiconsIcon>[0]["icon"]
}

function ReaderButton({ label, disabled, onClick, icon }: ReaderButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
          />
        }
      >
        <HugeiconsIcon icon={icon} />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

type BookReaderProps = {
  bookId: string | undefined
}

function BookReader({ bookId }: BookReaderProps) {
  const book = getBook(bookId)
  const readerRef = useRef<HTMLElement>(null)
  const { isWide, width: viewportWidth } = useReaderViewport()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(book?.pageCount ?? 1)
  const [zoom, setZoom] = useState(1)
  const [loadError, setLoadError] = useState(false)

  const handleLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setTotalPages(numPages)
    setLoadError(false)
  }, [])
  const handleLoadError = useCallback(() => setLoadError(true), [])

  useEffect(() => {
    if (loadError) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setCurrentPage((page) => getPreviousPage(page, totalPages, isWide))
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        setCurrentPage((page) => getNextPage(page, totalPages, isWide))
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [loadError, totalPages, isWide])

  if (!book) {
    return (
      <main className="mx-auto flex min-h-svh w-full max-w-xl items-center px-5 py-16">
        <Alert variant="destructive">
          <HugeiconsIcon icon={Alert02Icon} />
          <AlertTitle>Buku tidak ditemukan</AlertTitle>
          <AlertDescription>
            Tautan buku ini tidak tersedia. {" "}
            <Link to="/">Kembali ke perpustakaan</Link>.
          </AlertDescription>
        </Alert>
      </main>
    )
  }

  const visiblePages = getVisiblePages(currentPage, totalPages, isWide)
  const nextPage = getNextPage(currentPage, totalPages, isWide)
  const pageWidth = Math.round(
    Math.max(
      260,
      Math.min(isWide ? (viewportWidth - 112) / 2 : viewportWidth - 32, 560)
    ) * zoom
  )
  const canGoBack = currentPage > 1
  const canGoForward = nextPage !== currentPage
  const pageLabel =
    visiblePages.length === 2
      ? `${visiblePages[0]}-${visiblePages[1]}`
      : String(visiblePages[0])

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await readerRef.current?.requestFullscreen()
  }

  return (
    <main
      ref={readerRef}
      className="flex min-h-svh flex-col bg-muted"
      aria-label={`Pembaca ${book.volume}`}
    >
      <header className="sticky top-0 z-10 flex flex-col bg-background shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-3 py-3 sm:px-6">
          <Link
            to="/"
            aria-label="Kembali ke perpustakaan"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground">
              {book.volume}
            </p>
            <h1 className="truncate font-heading text-sm font-medium sm:text-base">
              {book.title}
            </h1>
          </div>
          <a
            href={book.fileUrl}
            download
            aria-label="Unduh PDF"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <HugeiconsIcon icon={Download04Icon} data-icon="inline-start" />
            <span className="hidden sm:inline">Unduh</span>
          </a>
        </div>

        <Separator />

        <div
          className="mx-auto flex w-full max-w-7xl items-center justify-center gap-1 px-3 py-2 sm:gap-2 sm:px-6"
          role="group"
          aria-label="Kontrol pembaca"
        >
          <ReaderButton
            label="Halaman sebelumnya"
            icon={ArrowLeft02Icon}
            disabled={!canGoBack}
            onClick={() =>
              setCurrentPage((page) =>
                getPreviousPage(page, totalPages, isWide)
              )
            }
          />
          <output
            className="min-w-20 text-center text-xs font-medium tabular-nums sm:min-w-28 sm:text-sm"
            aria-live="polite"
          >
            Halaman {pageLabel} dari {totalPages}
          </output>
          <ReaderButton
            label="Halaman berikutnya"
            icon={ArrowRight02Icon}
            disabled={!canGoForward}
            onClick={() =>
              setCurrentPage((page) => getNextPage(page, totalPages, isWide))
            }
          />
          <Separator orientation="vertical" className="mx-1 h-6" />
          <ReaderButton
            label="Perkecil"
            icon={ZoomOutAreaIcon}
            disabled={zoom <= 0.75}
            onClick={() => setZoom((value) => Math.max(0.75, value - 0.25))}
          />
          <span className="hidden min-w-10 text-center text-xs tabular-nums sm:inline">
            {Math.round(zoom * 100)}%
          </span>
          <ReaderButton
            label="Perbesar"
            icon={ZoomInAreaIcon}
            disabled={zoom >= 1.5}
            onClick={() => setZoom((value) => Math.min(1.5, value + 0.25))}
          />
          <ReaderButton
            label="Layar penuh"
            icon={FullScreenIcon}
            onClick={() => void toggleFullscreen()}
          />
        </div>
      </header>

      <section className="flex flex-1 items-start justify-center overflow-auto px-4 py-6 sm:px-8 sm:py-10">
        {loadError ? (
          <Alert variant="destructive" className="max-w-lg">
            <HugeiconsIcon icon={Alert02Icon} />
            <AlertTitle>PDF gagal dimuat</AlertTitle>
            <AlertDescription>
              Periksa koneksi Anda, lalu muat ulang halaman ini.
            </AlertDescription>
          </Alert>
        ) : (
          <Document
            file={book.fileUrl}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
            loading={
              <div className="flex gap-3" aria-label="Memuat buku">
                <Skeleton className="h-[72vh] w-[min(78vw,520px)]" />
                {isWide && (
                  <Skeleton className="hidden h-[72vh] w-[min(40vw,520px)] lg:block" />
                )}
              </div>
            }
            className="flex items-start justify-center gap-1 sm:gap-2"
          >
            {visiblePages.map((pageNumber) => (
              <Page
                key={pageNumber}
                pageNumber={pageNumber}
                width={pageWidth}
                className="overflow-hidden bg-card shadow-xl"
                loading={<Skeleton className="h-[72vh] w-[min(78vw,520px)]" />}
              />
            ))}
          </Document>
        )}
      </section>
    </main>
  )
}

export function BookReaderPage() {
  const { bookId } = useParams()

  return <BookReader key={bookId} bookId={bookId} />
}
