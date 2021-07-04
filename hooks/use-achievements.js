import { useMemo } from "react";
import achievements from "../data/achievements";

export default function useAchievements(countriesData) {
  return useMemo(() => {
    const [formattedAchievements, completedCount] = achievements.reduce(
      (acc, achievement) => {
        const value = achievement.value(countriesData);
        const progress = value / achievement.max;
        const completed = progress === 1;

        acc[0].push({
          ...achievement,
          completed,
          formattedMaxValue: achievement.formatValue(achievement.max),
          formattedValue: achievement.formatValue(value),
          progress,
          value,
        });
        acc[1] += completed;

        return acc;
      },
      [[], 0]
    );

    return [
      formattedAchievements.sort((a, b) => b.progress - a.progress),
      completedCount,
    ];
  }, [countriesData]);
}
