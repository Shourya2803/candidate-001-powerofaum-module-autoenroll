// pages/api/auto-enroll-pro.js
import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.body;

  // Check if user already enrolled
  const { data: existingTrial, error: fetchError } = await supabase
    .from("trials")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error checking existing trial:", fetchError.message);
    return res.status(500).json({ error: "Error checking existing trial" });
  }

  if (existingTrial) {
    return res.status(200).json({ message: "User already enrolled in trial" });
  }

  // Set trial dates
  const now = new Date();
  const end = new Date();
  end.setDate(now.getDate() + 7); // 7-day trial

  // Insert new trial record
  const { error } = await supabase.from("trials").insert([
    {
      user_id: userId,
      start_date: now.toISOString(),
      end_date: end.toISOString(),
      status: "active",
      pro_trials: "pro", // ✅ set the 'pro_trials' column
    },
  ]);

  if (error) {
    console.error("Supabase Insert Error:", error.message);
    return res.status(500).json({ error: "Error enrolling user" });
  }

  return res.status(200).json({ message: "User enrolled successfully" });
}
