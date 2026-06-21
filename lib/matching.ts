import type { MatchInput, MatchResult, Mentor } from "@/types/mentor";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function interestMatchesSkill(interest: string, skill: string) {
  const a = normalize(interest);
  const b = normalize(skill);
  return a === b || a.includes(b) || b.includes(a);
}

function interestMatchesCategory(interest: string, category: string) {
  const a = normalize(interest);
  const b = normalize(category);
  return a === b || a.includes(b) || b.includes(a);
}

export function matchMentors(
  input: MatchInput,
  mentors: Mentor[],
  limit = 6,
): MatchResult[] {
  const interests = input.interests.map(normalize).filter(Boolean);

  const scored = mentors
    .map((mentor) => {
      const matchedSkills = mentor.skills.filter((skill) =>
        interests.some((interest) => interestMatchesSkill(interest, skill)),
      );

      const categoryMatches = interests.filter((interest) =>
        interestMatchesCategory(interest, mentor.category),
      );

      const score = matchedSkills.length * 2 + categoryMatches.length;

      return { mentor, score, matchedSkills };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}
