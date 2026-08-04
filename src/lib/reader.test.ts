import { describe, expect, it } from "vitest"

import {
  clampPage,
  getNextPage,
  getPreviousPage,
  getSwipeDirection,
  getVisiblePages,
} from "./reader"

describe("reader navigation", () => {
  it("clamps page numbers to the document", () => {
    expect(clampPage(-2, 70)).toBe(1)
    expect(clampPage(12, 70)).toBe(12)
    expect(clampPage(99, 70)).toBe(70)
  })

  it("shows one page on narrow screens", () => {
    expect(getVisiblePages(5, 70, false)).toEqual([5])
    expect(getNextPage(5, 70, false)).toBe(6)
    expect(getPreviousPage(5, 70, false)).toBe(4)
  })

  it("keeps the cover single and pairs interior pages on wide screens", () => {
    expect(getVisiblePages(1, 70, true)).toEqual([1])
    expect(getVisiblePages(2, 70, true)).toEqual([2, 3])
    expect(getVisiblePages(3, 70, true)).toEqual([2, 3])
    expect(getVisiblePages(70, 70, true)).toEqual([70])
  })

  it("moves between desktop spreads without skipping the cover", () => {
    expect(getNextPage(1, 70, true)).toBe(2)
    expect(getNextPage(2, 70, true)).toBe(4)
    expect(getNextPage(69, 70, true)).toBe(70)
    expect(getPreviousPage(2, 70, true)).toBe(1)
    expect(getPreviousPage(8, 70, true)).toBe(6)
  })

  it("does not advance when an odd final page is already visible", () => {
    expect(getVisiblePages(68, 69, true)).toEqual([68, 69])
    expect(getNextPage(68, 69, true)).toBe(68)
    expect(getVisiblePages(72, 73, true)).toEqual([72, 73])
    expect(getNextPage(72, 73, true)).toBe(72)
  })

  it("classifies horizontal swipes and ignores vertical or tiny drags", () => {
    expect(getSwipeDirection(-100, 10)).toBe("next")
    expect(getSwipeDirection(100, 10)).toBe("previous")
    expect(getSwipeDirection(-30, 5)).toBeNull()
    expect(getSwipeDirection(10, -100)).toBeNull()
    expect(getSwipeDirection(-60, -80)).toBeNull()
  })
})
