/** The four accent-coloured corner brackets from the app icon, in a 100x100 box. */
export const SCAN_FRAME_PATH =
  'M8 30V18a10 10 0 0 1 10-10h12M70 8h12a10 10 0 0 1 10 10v12M92 70v12a10 10 0 0 1-10 10H70M30 92H18a10 10 0 0 1-10-10V70'

/** The brackets alone, cropped so the lines sit close to the edges. Fills its parent's width. */
export function AddressUiScanFrame() {
  return (
    <svg aria-hidden className="block w-full" viewBox="6 6 88 88">
      <path d={SCAN_FRAME_PATH} fill="none" stroke="var(--accent)" strokeLinecap="round" strokeWidth={1.5} />
    </svg>
  )
}
