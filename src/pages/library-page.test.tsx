import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { LibraryPage } from "./library-page"

describe("LibraryPage", () => {
  it("presents the KKN brand and all four books", () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    expect(
      screen.getByRole("heading", { name: "Perpustakaan Buku KKN" })
    ).toBeInTheDocument()
    expect(screen.getByAltText("Tanjungsari Bestari")).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(4)
    expect(
      screen.getByText("Pengenalan dan Cara Akses Lembaga Bantuan Hukum (LBH)")
    ).toBeInTheDocument()
    expect(screen.getAllByText("Nabil Zaidan Hermawan")).toHaveLength(4)
  })

  it("links every cover and action to its reader route", () => {
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    )

    expect(screen.getByAltText("Sampul Buku 1")).toHaveAttribute(
      "src",
      "/books/covers/buku-1.webp"
    )
    expect(
      screen.getByRole("link", { name: "Buka sampul Buku 1" })
    ).toHaveAttribute("href", "/books/1")
    expect(screen.getByRole("link", { name: "Baca Buku 1" })).toHaveAttribute(
      "href",
      "/books/1"
    )
    expect(screen.getByRole("link", { name: "Baca Buku 4" })).toHaveAttribute(
      "href",
      "/books/4"
    )
  })
})
