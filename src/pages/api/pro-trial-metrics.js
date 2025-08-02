import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  // Fetch trials with pro_trial = 'pro'
  const { data: trials, error } = await supabase
    .from('trials')
    .select('user_id, end_date')
    .eq('pro_trials', 'pro');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const now = new Date();
  const totalTrials = trials.length;

  const activeTrials = trials.filter(trial => new Date(trial.end_date) > now);
  const activeTrialUserIds = activeTrials.map(trial => trial.user_id);

  return res.status(200).json({
    totalTrials,
    activeTrials: activeTrialUserIds.length,
    activeTrialUserIds,
  });
}
