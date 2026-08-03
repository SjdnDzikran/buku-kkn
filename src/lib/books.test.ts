import { describe, expect, it } from "vitest"

import { books, getBook } from "./books"

describe("book catalog", () => {
  it("contains the four KKN books in reading order", () => {
    expect(books).toHaveLength(4)
    expect(books.map((book) => book.id)).toEqual(["1", "2", "3", "4"])
    expect(books.map((book) => book.pageCount)).toEqual([66, 69, 73, 70])
  })

  it("stores the extracted titles and public asset paths", () => {
    expect(books[0]).toMatchObject({
      title: "Pengenalan dan Cara Akses Lembaga Bantuan Hukum (LBH)",
      author: "Nabil Zaidan Hermawan",
      fileUrl: "/books/Buku1-.pdf",
      coverUrl: "/books/covers/buku-1.webp",
    })
    expect(books[3].title).toBe(
      "Edukasi Izin Usaha, Hak, dan Kewajiban bagi UMKM"
    )
  })

  it("finds books by id and rejects unknown ids", () => {
    expect(getBook("2")).toBe(books[1])
    expect(getBook("unknown")).toBeUndefined()
  })
})
