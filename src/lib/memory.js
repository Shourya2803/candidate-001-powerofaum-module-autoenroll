// lib/memory.js

let trialData = {
  totalTrials: 0,
  activeTrials: 0,
  activeTrialUserIds: [],
};

export function getTrials() {
  return trialData;
}

export function saveTrials(data) {
  trialData = data;
}
