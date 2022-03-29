import lines from './preval/lines'

export type Line = {
  name: string
  countries: string[]
}

export default lines as Record<string, Line>
