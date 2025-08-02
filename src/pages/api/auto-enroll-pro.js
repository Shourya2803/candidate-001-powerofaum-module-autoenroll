// src/pages/api/auto-enroll-pro.js

import { getTrials, saveTrials } from "@/lib/memory";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const trials = getTrials();

  // If user already enrolled, ignore
  if (trials.activeTrialUserIds.includes(userId)) {
    return res.status(200).json({ message: "User already enrolled in trial" });
  }

  trials.totalTrials += 1;
  trials.activeTrials += 1;
  trials.activeTrialUserIds.push(userId);

  saveTrials(trials);

  return res.status(200).json({ message: "User enrolled in trial", trials });
}
