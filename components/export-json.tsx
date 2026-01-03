import { useAtomValue } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import { type Ref, useCallback, useImperativeHandle } from 'react'
import { visitsAtom, wishesAtom } from '../atoms/countries'
import toastAtom from '../atoms/toast'

type Props = {
  ref: Ref<{ show(): void }>
  onClose?(): void
}

export default function ExportJSON({ ref, onClose }: Props) {
  const { toast } = useAtomValue(toastAtom)
  const readVisitedCountriesData = useAtomCallback(
    useCallback(get => get(visitsAtom).data[0], []),
  )
  const readWishedCountriesData = useAtomCallback(
    useCallback(get => get(wishesAtom).data[0], []),
  )

  const onExport = useCallback(async () => {
    const json = {
      visits: readVisitedCountriesData().map(({ id }) => ({ id })),
      wishes: readWishedCountriesData().map(({ id }) => ({ id })),
    }

    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `countryquest_${new Date().toISOString().replaceAll(':', '.')}.json`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }, [readVisitedCountriesData, readWishedCountriesData])

  useImperativeHandle(ref, () => {
    return {
      show() {
        return toast.promise(onExport(), {
          loading: {
            title: 'Exporting your country list to JSON...',
            onCloseComplete: onClose,
          },
          success: {
            title: 'Country list exported to JSON',
            onCloseComplete: onClose,
          },
          error: {
            title: `Oops, we couldn't export your country list to JSON`,
            onCloseComplete: onClose,
          },
        })
      },
    }
  }, [onClose, onExport, toast])

  return null
}
