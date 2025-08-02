import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const now = new Date().toISOString();

  // Fetch all pro trials (no is_active filtering)
  const { data: proTrials, error } = await supabase
    .from('trials')
    .select('*')
    .eq('pro_trials', 'pro');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const expired = proTrials.filter(trial => new Date(trial.end_date) < new Date(now));

  return res.status(200).json({
    message: `Checked ${proTrials.length} pro trials`,
    expiredCount: expired.length,
    expiredTrials: expired.map(t => ({ id: t.id, end_date: t.end_date }))
  });
}
