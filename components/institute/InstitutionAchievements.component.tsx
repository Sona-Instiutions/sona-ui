import { AchievementSection } from "@/components/institute/AchievementSection.client";
import { getAchievementsByInstitution } from "@/services/server/institution.server";

interface InstitutionAchievementsProps {
  /** Institution identifier used to fetch achievements */
  institutionId?: number | null;
}

/**
 * Server component wrapper responsible for loading the achievement section.
 */
export async function InstitutionAchievements({ institutionId }: InstitutionAchievementsProps) {
  if (!institutionId || institutionId <= 0) {
    return null;
  }

  const achievementSection = await getAchievementsByInstitution(institutionId).catch((error) => {
    console.error("Failed to load achievements section", error);
    return null;
  });

  if (!achievementSection || achievementSection.achievements.length === 0) {
    return null;
  }

  return <AchievementSection achievementSection={achievementSection} />;
}
