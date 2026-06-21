export const MENTOR_CATEGORIES = [
  "STEM",
  "Arts",
  "Languages",
  "Social Sciences",
] as const;

export type MentorCategory = (typeof MENTOR_CATEGORIES)[number];

export type UserRole = "student" | "mentor";

export interface Mentor {
  id: string;
  name: string;
  bio: string;
  category: MentorCategory;
  skills: string[];
  avatar?: string | null;
  email?: string | null;
  phone?: string | null;
  created_at?: string;
}

export interface MatchInput {
  age: number;
  interests: string[];
  goals: string;
}

export interface MatchResult {
  mentor: Mentor;
  score: number;
  matchedSkills: string[];
}
