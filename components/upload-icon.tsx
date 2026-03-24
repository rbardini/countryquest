import { DownloadIcon } from '@chakra-ui/icons'
import type { ComponentProps } from 'react'

export default function UploadIcon(props: ComponentProps<typeof DownloadIcon>) {
  return <DownloadIcon transform="rotate(180deg)" {...props} />
}
