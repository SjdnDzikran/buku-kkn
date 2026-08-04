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
    id: "akses-lbh",
    volume: "Buku 1",
    title: "Pengenalan dan Cara Akses Lembaga Bantuan Hukum (LBH)",
    author: "Nabil Zaidan Hermawan",
    pageCount: 66,
    fileUrl: "/books/akses-lbh.pdf",
    coverUrl: "/books/covers/akses-lbh.webp",
  },
  {
    id: "edukasi-legalitas-pertanian",
    volume: "Buku 2",
    title: "Edukasi Izin, Hak, dan Kewajiban untuk Menjamin Legalitas Pertanian",
    author: "Nabil Zaidan Hermawan",
    pageCount: 69,
    fileUrl: "/books/edukasi-legalitas-pertanian.pdf",
    coverUrl: "/books/covers/edukasi-legalitas-pertanian.webp",
  },
  {
    id: "edukasi-peternak",
    volume: "Buku 3",
    title: "Edukasi Izin, Hak, dan Kewajiban bagi Peternak",
    author: "Nabil Zaidan Hermawan",
    pageCount: 73,
    fileUrl: "/books/edukasi-peternak.pdf",
    coverUrl: "/books/covers/edukasi-peternak.webp",
  },
  {
    id: "edukasi-umkm",
    volume: "Buku 4",
    title: "Edukasi Izin Usaha, Hak, dan Kewajiban bagi UMKM",
    author: "Nabil Zaidan Hermawan",
    pageCount: 70,
    fileUrl: "/books/edukasi-umkm.pdf",
    coverUrl: "/books/covers/edukasi-umkm.webp",
  },
]

export function getBook(id: string | undefined) {
  return books.find((book) => book.id === id)
}
