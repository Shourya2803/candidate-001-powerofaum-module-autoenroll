# 🧪 Pro Trial Subscription Backend - PowerOfAum

This is a mock backend module that simulates a **Pro Trial Subscription system** for users, built using **Next.js API routes** and **local JSON storage**.

It provides the following features:
- **Auto-enroll** a user into a trial
- **Cron-based expiration check**
- **Trial metrics overview**

---

## 📁 Folder Structure

project-root/
├── lib/
│ ├── memory.js # Reads/writes trial data from/to JSON
│ └── trials.json # Stores trial user data
└── pages/
└── api/
├── auto-enroll-pro.js # POST: Enrolls a user in trial
├── cron-check-trials.js # GET: Checks for expired trials
└── trial-metrics.js # GET: Returns active and expired trial stats


---

Let me know if you want a version with a database (MongoDB/Firebase/PostgreSQL) or a frontend for this!
