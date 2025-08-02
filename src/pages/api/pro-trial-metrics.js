import { loadTrials } from '@/lib/memory';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const trials = loadTrials();

  const totalTrials = trials.length;
  const now = new Date();
  const activeTrials = trials.filter((trial) => new Date(trial.expiresAt) > now);

  res.status(200).json({
    totalTrials,
    activeTrials: activeTrials.length,
    activeTrialUserIds: activeTrials.map((trial) => trial.userId),
  });
}
