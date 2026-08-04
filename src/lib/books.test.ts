import { describe, expect, it } from "vitest"

import { books, getBook } from "./books"

describe("book catalog", () => {
  it("contains the four KKN books in reading order", () => {
    expect(books).toHaveLength(4)
    expect(books.map((book) => book.id)).toEqual([
      "akses-lbh",
      "edukasi-legalitas-pertanian",
      "edukasi-peternak",
      "edukasi-umkm",
    ])
    expect(books.map((book) => book.pageCount)).toEqual([66, 69, 73, 70])
  })

  it("stores the extracted titles and public asset paths", () => {
    expect(books[0]).toMatchObject({
      title: "Pengenalan dan Cara Akses Lembaga Bantuan Hukum (LBH)",
      author: "Nabil Zaidan Hermawan",
      fileUrl: "/books/akses-lbh.pdf",
      coverUrl: "/books/covers/akses-lbh.webp",
    })
    expect(books[3].title).toBe(
      "Edukasi Izin Usaha, Hak, dan Kewajiban bagi UMKM"
    )
  })

  it("finds books by id and rejects unknown ids", () => {
    expect(getBook("edukasi-legalitas-pertanian")).toBe(books[1])
    expect(getBook("unknown")).toBeUndefined()
  })
})
