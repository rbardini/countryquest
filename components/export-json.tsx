import { type Ref, useCallback, useImperativeHandle } from 'react'
import {
  brandedIdToCountryId,
  evolu,
  visitsQuery,
  wishesQuery,
} from '../lib/evolu'
import { toast } from '../lib/toast'

type Props = {
  ref: Ref<{ show(): void }>
  onClose?(): void
}

export default function ExportJSON({ ref, onClose }: Props) {
  const onExport = useCallback(async () => {
    const [visits, wishes] = await Promise.all(
      evolu.loadQueries([visitsQuery, wishesQuery]),
    )
    const json = {
      visits: visits.map(({ id }) => ({ id: brandedIdToCountryId(id) })),
      wishes: wishes.map(({ id }) => ({ id: brandedIdToCountryId(id) })),
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
  }, [])

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
  }, [onClose, onExport])

  return null
}
