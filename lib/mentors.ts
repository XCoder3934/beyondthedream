import { createClient } from "@/lib/supabase/server";
import type { Mentor } from "@/types/mentor";

export const SAMPLE_MENTORS: Mentor[] = [
  {
    id: "sample-1",
    name: "Dr. Elena Vasquez",
    bio: "Research scientist passionate about making STEM accessible. I help students explore biology, chemistry, and research pathways.",
    category: "STEM",
    skills: ["Biology", "Chemistry", "Research", "Lab Skills"],
  },
  {
    id: "sample-2",
    name: "James Okonkwo",
    bio: "Professional illustrator and art educator. I guide students in visual storytelling, digital art, and portfolio development.",
    category: "Arts",
    skills: ["Illustration", "Digital Art", "Portfolio", "Design"],
  },
  {
    id: "sample-3",
    name: "Sophie Laurent",
    bio: "Polyglot language coach with experience in French and Spanish immersion programs for high school students.",
    category: "Languages",
    skills: ["French", "Spanish", "Conversation", "Writing"],
  },
];

export async function getMentors(): Promise<Mentor[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return SAMPLE_MENTORS;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("mentors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data?.length) return SAMPLE_MENTORS;
    return data as Mentor[];
  } catch {
    return SAMPLE_MENTORS;
  }
}
