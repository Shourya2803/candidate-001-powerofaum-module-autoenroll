import { loadTrials, saveTrials } from "@/lib/memory";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const now = new Date();
  const trials = loadTrials();

  const updatedTrials = trials.filter((trial) => {
    const isActive = new Date(trial.expiresAt) > now;
    return isActive;
  });

  saveTrials(updatedTrials);

  res.status(200).json({ message: "Expired trials removed", remaining: updatedTrials.length });
}
