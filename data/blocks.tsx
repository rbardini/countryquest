import blocks from './preval/blocks'

export type Block = {
  name: string
  countries: string[]
}

export default blocks as Record<string, Block>
