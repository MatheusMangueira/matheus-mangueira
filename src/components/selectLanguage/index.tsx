'use client'
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent, useTransition } from "react"

export const SelectLanguage = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value

    startTransition(() => {
      router.replace(`/${nextLocale}/${pathname.split("/")[2] || ""}`);
    });
  }

  return (
    <label className="group relative inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-2.5 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-foreground/15 hover:text-foreground">
      <span className="sr-only">Language</span>
      <select
        defaultValue={localActive}
        className="cursor-pointer appearance-none bg-transparent pr-6 text-xs font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
        onChange={onSelectChange}
        disabled={isPending}
        aria-label="Change language"
      >
        <option value='en'>English</option>
        <option value="es">Español</option>
        <option value='pt'>Português</option>
      </select>
      <span
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[0.65rem] text-muted-foreground transition-colors group-hover:text-foreground"
        aria-hidden
      >
        ▾
      </span>
    </label>

  )
}
