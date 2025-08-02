// src/pages/api/cron-check-trials.js

import { getTrials, saveTrials } from "@/lib/memory";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const trials = getTrials();

  // Simulate expiring all trials after one check
  trials.activeTrials = 0;
  trials.activeTrialUserIds = [];

  saveTrials(trials);

  return res.status(200).json({ message: "Trial check done. All trials expired.", trials });
}
