import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for full access
);

export async function GET() {
  const now = new Date().toISOString();

  // Step 1: Get all trials where pro_trial is 'pro' and expired_at is before now
  const { data: expiredTrials, error } = await supabase
    .from("trial")
    .select("*")
    .eq("pro_trial", "pro")
    .lt("expired_at", now);

  if (error) {
    return NextResponse.json({ error: "Error fetching expired trials" }, { status: 500 });
  }

  if (!expiredTrials || expiredTrials.length === 0) {
    return NextResponse.json({ message: "No expired pro trials found" });
  }

  // Step 2: Downgrade each expired trial to 'free'
  const updates = expiredTrials.map((trial) =>
    supabase
      .from("trial")
      .update({ pro_trial: "free" })
      .eq("id", trial.id)
  );

  await Promise.all(updates);

  return NextResponse.json({
    message: `${expiredTrials.length} pro trials downgraded to free.`,
  });
}
