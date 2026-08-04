export function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(Math.round(page), 1), Math.max(totalPages, 1))
}

function getSpreadStart(page: number, totalPages: number) {
  const clampedPage = clampPage(page, totalPages)

  if (clampedPage === 1) {
    return 1
  }

  return clampedPage % 2 === 0 ? clampedPage : clampedPage - 1
}

export function getVisiblePages(
  page: number,
  totalPages: number,
  isWide: boolean
) {
  if (!isWide) {
    return [clampPage(page, totalPages)]
  }

  const spreadStart = getSpreadStart(page, totalPages)
  if (spreadStart === 1 || spreadStart === totalPages) {
    return [spreadStart]
  }

  return [spreadStart, spreadStart + 1].filter(
    (visiblePage) => visiblePage <= totalPages
  )
}

export function getNextPage(
  page: number,
  totalPages: number,
  isWide: boolean
) {
  if (!isWide) {
    return clampPage(page + 1, totalPages)
  }

  const spreadStart = getSpreadStart(page, totalPages)
  const visiblePages = getVisiblePages(spreadStart, totalPages, true)
  if (visiblePages.at(-1) === totalPages) {
    return clampPage(page, totalPages)
  }

  return clampPage(spreadStart === 1 ? 2 : spreadStart + 2, totalPages)
}

export function getPreviousPage(
  page: number,
  totalPages: number,
  isWide: boolean
) {
  if (!isWide) {
    return clampPage(page - 1, totalPages)
  }

  const spreadStart = getSpreadStart(page, totalPages)
  return spreadStart <= 2 ? 1 : spreadStart - 2
}

export function getSwipeDirection(
  deltaX: number,
  deltaY: number,
  threshold = 50
): "next" | "previous" | null {
  if (Math.abs(deltaX) < threshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
    return null
  }

  return deltaX < 0 ? "next" : "previous"
}
