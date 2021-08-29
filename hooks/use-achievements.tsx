import { useMemo } from 'react'
import type { Achievement } from '../lib/achievements'
import achievements from '../lib/achievements'
import type { CountryData } from './use-countries-data'

type CalculatedAchievement = Omit<Achievement, 'value' | 'formatValue'> & {
  completed: boolean
  formattedMaxValue: ReturnType<Achievement['formatValue']>
  formattedValue: ReturnType<Achievement['formatValue']>
  progress: number
  value: ReturnType<Achievement['value']>
}

export default function useAchievements(countriesData: CountryData[]) {
  return useMemo(() => {
    const [formattedAchievements, completedCount] = achievements.reduce<
      [CalculatedAchievement[], number]
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

    return [
      formattedAchievements.sort((a, b) => b.progress - a.progress),
      completedCount,
    ] as const
  }, [countriesData])
}
