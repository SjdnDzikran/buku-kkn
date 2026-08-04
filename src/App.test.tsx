import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"

vi.mock("react-pdf", () => ({
  pdfjs: { GlobalWorkerOptions: { workerSrc: "" } },
  Document: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Page: ({ pageNumber }: { pageNumber: number }) => <div>Page {pageNumber}</div>,
}))

import App from "./App"

describe("App routes", () => {
  it("renders the library at the home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    )

    expect(
      screen.getByRole("heading", { name: "Perpustakaan Buku KKN" })
    ).toBeInTheDocument()
  })

  it("renders a book reader at its direct route", async () => {
    render(
      <MemoryRouter initialEntries={["/books/akses-lbh"]}>
        <App />
      </MemoryRouter>
    )

    expect(
      await screen.findByRole("main", { name: "Pembaca Buku 1" })
    ).toBeInTheDocument()
    expect(await screen.findByText("Page 1")).toBeInTheDocument()
  })
})
