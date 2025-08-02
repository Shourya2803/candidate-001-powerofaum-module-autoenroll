import { loadTrials, saveTrials } from '@/lib/memory';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.body;

    const trials = loadTrials();

    if (trials.find((trial) => trial.userId === userId)) {
      return res.status(400).json({ error: 'Already enrolled' });
    }

    const expiresAt = new Date(Date.now() + 3 * 86400000).toISOString(); // +3 days

    const trialInfo = { userId, plan: 'pro_trial', expiresAt };
    trials.push(trialInfo);
    saveTrials(trials);

    return res.status(200).json({ success: true, trialInfo });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
