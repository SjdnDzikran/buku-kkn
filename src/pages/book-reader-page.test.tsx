import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"
import { describe, expect, it, vi } from "vitest"

vi.mock("react-pdf", async () => {
  const React = await import("react")

  return {
    pdfjs: { GlobalWorkerOptions: { workerSrc: "" } },
    Document: ({
      children,
      file,
      loading,
      onLoadError,
      onLoadSuccess,
    }: {
      children: React.ReactNode
      file: string
      loading: React.ReactNode
      onLoadError: () => void
      onLoadSuccess: (document: { numPages: number }) => void
    }) => {
      React.useEffect(() => {
        if (file.includes("edukasi-umkm")) {
          queueMicrotask(onLoadError)
          return
        }

        const pageCounts: Record<string, number> = {
          "akses-lbh.pdf": 66,
          "edukasi-legalitas-pertanian.pdf": 69,
          "edukasi-peternak.pdf": 73,
        }
        const fileName = file.split("/").at(-1) ?? ""
        onLoadSuccess({ numPages: pageCounts[fileName] ?? 1 })
      }, [file, onLoadError, onLoadSuccess])

      if (file.includes("edukasi-peternak")) {
        return <>{loading}</>
      }

      return <div data-testid="pdf-document">{children}</div>
    },
    Page: ({ pageNumber }: { pageNumber: number }) => (
      <div data-testid={`pdf-page-${pageNumber}`}>Page {pageNumber}</div>
    ),
  }
})

import { BookReaderPage } from "./book-reader-page"

function BookSwitcher() {
  const navigate = useNavigate()
    return <button onClick={() => navigate("/books/edukasi-legalitas-pertanian")}>Buka Buku 2</button>
}

function renderReader(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/books/:bookId"
          element={
            <>
              <BookSwitcher />
              <BookReaderPage />
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe("BookReaderPage", () => {
  it("shows an accessible error for an unknown book", () => {
    renderReader("/books/not-found")

    expect(screen.getByRole("alert")).toHaveTextContent("Buku tidak ditemukan")
    expect(screen.getByRole("link", { name: "Kembali ke perpustakaan" })).toHaveAttribute(
      "href",
      "/"
    )
  })

  it("loads a known book and exposes reader controls", async () => {
    const user = userEvent.setup()
    renderReader("/books/akses-lbh")

    expect(
      screen.getByRole("heading", {
        name: "Pengenalan dan Cara Akses Lembaga Bantuan Hukum (LBH)",
      })
    ).toBeInTheDocument()
    expect(await screen.findByTestId("pdf-page-1")).toBeInTheDocument()
    expect(screen.getByText("Halaman 1 dari 66")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Halaman sebelumnya" })).toBeDisabled()

    await user.click(screen.getByRole("button", { name: "Halaman berikutnya" }))

    expect(screen.getByText("Halaman 2 dari 66")).toBeInTheDocument()
    expect(await screen.findByTestId("pdf-page-2")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Unduh PDF" })).toHaveAttribute(
      "href",
      "/books/akses-lbh.pdf"
    )

    await user.click(screen.getByRole("button", { name: "Perbesar" }))
    expect(screen.getByText("125%")).toBeInTheDocument()
  })

  it("resets reading state when switching directly between books", async () => {
    const user = userEvent.setup()
    renderReader("/books/akses-lbh")

    await user.click(screen.getByRole("button", { name: "Halaman berikutnya" }))
    expect(screen.getByText("Halaman 2 dari 66")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Buka Buku 2" }))

    expect(
      screen.getByRole("heading", {
        name: "Edukasi Izin, Hak, dan Kewajiban untuk Menjamin Legalitas Pertanian",
      })
    ).toBeInTheDocument()
    expect(screen.getByText("Halaman 1 dari 69")).toBeInTheDocument()
  })

  it("shows loading and PDF error states", async () => {
    const { unmount } = renderReader("/books/edukasi-peternak")
    expect(screen.getByLabelText("Memuat buku")).toBeInTheDocument()
    unmount()

    renderReader("/books/edukasi-umkm")
    expect(await screen.findByRole("alert")).toHaveTextContent("PDF gagal dimuat")
  })
})
