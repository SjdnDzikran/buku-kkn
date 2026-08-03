export type Book = {
  id: string
  volume: string
  title: string
  author: string
  pageCount: number
  fileUrl: string
  coverUrl: string
}

export const books: readonly Book[] = [
  {
    id: "1",
    volume: "Buku 1",
    title: "Pengenalan dan Cara Akses Lembaga Bantuan Hukum (LBH)",
    author: "Nabil Zaidan Hermawan",
    pageCount: 66,
    fileUrl: "/books/Buku1-.pdf",
    coverUrl: "/books/covers/buku-1.webp",
  },
  {
    id: "2",
    volume: "Buku 2",
    title: "Edukasi Izin, Hak, dan Kewajiban untuk Menjamin Legalitas Pertanian",
    author: "Nabil Zaidan Hermawan",
    pageCount: 69,
    fileUrl: "/books/Buku2-.pdf",
    coverUrl: "/books/covers/buku-2.webp",
  },
  {
    id: "3",
    volume: "Buku 3",
    title: "Edukasi Izin, Hak, dan Kewajiban bagi Peternak",
    author: "Nabil Zaidan Hermawan",
    pageCount: 73,
    fileUrl: "/books/Buku3-.pdf",
    coverUrl: "/books/covers/buku-3.webp",
  },
  {
    id: "4",
    volume: "Buku 4",
    title: "Edukasi Izin Usaha, Hak, dan Kewajiban bagi UMKM",
    author: "Nabil Zaidan Hermawan",
    pageCount: 70,
    fileUrl: "/books/Buku4-.pdf",
    coverUrl: "/books/covers/buku-4.webp",
  },
]

export function getBook(id: string | undefined) {
  return books.find((book) => book.id === id)
}
