import { Separator } from "@/components/ui/separator"

export function BrandLockup() {
  return (
    <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
      <div className="flex items-center gap-4 sm:gap-6">
        <img
          src="/images/logo-kkn.png"
          alt="Logo KKN-PPM UGM"
          className="size-14 object-contain sm:size-16"
          width={64}
          height={64}
        />
        <Separator orientation="vertical" className="h-9 sm:h-11" />
        <img
          src="/images/logo-tanjungsari.png"
          alt="Logo Tanjungsari"
          className="h-12 w-auto object-contain sm:h-16"
        />
      </div>
      <img
        src="/images/typography-tanjungsari.png"
        alt="Tanjungsari Bestari"
        className="h-16 w-auto max-w-[78vw] object-contain dark:brightness-0 dark:invert sm:h-20"
      />
    </div>
  )
}
