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
    <label className='border-none'>
      <p className='sr-only'>change language</p>
      <select
        defaultValue={localActive}
        className='bg-transparent py-2'
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value='en'>English</option>
        <option value="es">Espanhol</option>
        <option value='pt'>Português</option>
      </select>
    </label>

  )
}