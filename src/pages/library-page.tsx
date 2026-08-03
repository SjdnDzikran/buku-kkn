import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "react-router-dom"

import { BrandLockup } from "@/components/brand-lockup"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { books } from "@/lib/books"
import { cn } from "@/lib/utils"

export function LibraryPage() {
  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:gap-16 lg:px-10 lg:py-20">
        <header className="flex flex-col items-center gap-10">
          <BrandLockup />
          <Separator />
        </header>

        <section aria-labelledby="library-heading" className="flex flex-col gap-8">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              KKN-PPM UGM 2026
            </p>
            <h1
              id="library-heading"
              className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Perpustakaan Buku KKN
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Panduan hukum praktis untuk mendukung kegiatan dan usaha masyarakat
              Tanjungsari.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <Card
                key={book.id}
                role="article"
                className="h-full pt-0 transition-transform duration-200 hover:-translate-y-1"
              >
                <Link
                  to={`/books/${book.id}`}
                  aria-label={`Buka sampul ${book.volume}`}
                  className="block overflow-hidden rounded-t-[min(var(--radius-4xl),24px)] bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                >
                  <img
                    src={book.coverUrl}
                    alt={`Sampul ${book.volume}`}
                    className="aspect-[720/1022] w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    width={720}
                    height={1022}
                    loading="lazy"
                  />
                </Link>
                <CardHeader>
                  <Badge variant="secondary">{book.volume}</Badge>
                  <CardTitle className="mt-2 leading-snug">{book.title}</CardTitle>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto text-xs text-muted-foreground">
                  {book.pageCount} halaman
                </CardContent>
                <CardFooter>
                  <Link
                    to={`/books/${book.id}`}
                    aria-label={`Baca ${book.volume}`}
                    className={cn(buttonVariants(), "w-full")}
                  >
                    Baca buku
                    <HugeiconsIcon icon={ArrowRight02Icon} data-icon="inline-end" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
