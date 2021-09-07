import { AspectRatio, Box, Skeleton, useBoolean } from '@chakra-ui/react'
import { useAtomValue } from 'jotai/utils'
import { useRef } from 'react'
import visitsAtom from '../atoms/visits'
import useChart from '../hooks/use-chart'

export default function WorldMap() {
  const { loading } = useAtomValue(visitsAtom)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, { on: setIsReadyOn }] = useBoolean()
  useChart(containerRef, setIsReadyOn)

  return (
    <AspectRatio ratio={21 / 9}>
      <>
        <Skeleton isLoaded={!loading && isReady} />
        <Box ref={containerRef} />
      </>
    </AspectRatio>
  )
}
