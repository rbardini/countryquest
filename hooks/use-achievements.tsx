import type { Achievement } from '../lib/achievements'
import achievements from '../lib/achievements'
import useVisitedCountries from './use-visited-countries'
import useWishedCountries from './use-wished-countries'

export type CalculatedAchievement = Omit<
  Achievement,
  'value' | 'formatValue'
> & {
  completed: boolean
  formattedMaxValue: ReturnType<Achievement['formatValue']>
  formattedValue: ReturnType<Achievement['formatValue']>
  progress: number
  value: ReturnType<Achievement['value']>
}

export default function useAchievements(includesWishes: boolean) {
  const { visitedCountriesData } = useVisitedCountries()
  const { wishedCountriesData } = useWishedCountries()

  const countriesData = includesWishes
    ? [...new Set([...visitedCountriesData, ...wishedCountriesData])]
    : visitedCountriesData

  const [formattedAchievements, completedCount] = achievements.reduce<
    [achievements: CalculatedAchievement[], completedCount: number]
  >(
    (acc, { formatValue, ...achievement }) => {
      const value = achievement.value(countriesData)
      const progress = value / achievement.max
      const completed = progress === 1

      acc[0].push({
        ...achievement,
        completed,
        formattedMaxValue: formatValue(achievement.max),
        formattedValue: formatValue(value),
        progress,
        value,
      })
      acc[1] += Number(completed)

      return acc
    },
    [[], 0],
  )

  return {
    achievements: formattedAchievements.sort((a, b) => b.progress - a.progress),
    completedCount,
  }
}
