// src/pages/api/pro-trial-metrics.js

import { getTrials } from "@/lib/memory";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const trials = getTrials();

  return res.status(200).json({
    totalTrials: trials.totalTrials,
    activeTrials: trials.activeTrials,
    activeTrialUserIds: trials.activeTrialUserIds,
  });
}
