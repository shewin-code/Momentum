# Momentum — PWA

A personal-development tracker that turns daily habits, training, nutrition, skincare and goals into a single RPG-style system. Installable as a Progressive Web App on iPhone or Android, and fully offline after the first load.

Everything is one self-contained web app — no accounts, no server, no data leaves your device.

## The idea

Momentum is built around **five stats** — Physical, Mental, Financial, Character and Aesthetic. Ticking off habits and completing goals deposits XP into the relevant stat, and each stat levels up on an RPG curve (fast early, slow to master). Physical and Aesthetic are fed by your daily routines; Mental, Financial and Character are fed only by goals you set yourself — which is the built-in nudge to grow in the areas you'd otherwise neglect.

## Features

**Today**
* Clustered daily checklist — Training & activity, Nutrition, Skincare & hair, Sleep, and your own Goals & todos, each in one tidy card
* Every tickable shows the XP it awards, coloured by the stat it feeds
* A 7-dot header meter that fills in with the week's completion (tap it to jump to Stats)

**Training**
* Full-body A/B/C rotation — the right split for training 3× a week
* Three equipment modes: Full gym, School gym, and Bodyweight
* Rest-lock: log a session any day, and the next two days lock as recovery
* Bodyweight progression ladders (climb a rung instead of adding weight)
* Optional extras — dead hang, incline walk, log your weights
* Gym log for recording sets (kg × reps, or reps-only for bodyweight) with per-exercise progress charts

**Nutrition**
* Training-day vs rest-day calorie targets that switch automatically
* Live protein tracking toward your daily goal, with a protein streak
* A full meal-plan reference page built around your staples

**Skincare & hair**
* Daily routines plus a cadence system for the non-daily items
* Benzoyl peroxide every 3rd day (soft-locked), hair wash every other day (flexible), weekly exfoliation — automatically kept off benzoyl-peroxide nights

**Goals & todos**
* Three types — Project (steps, with XP dripping as you tick them), Commitment (recurring), and One-off task (or a plain no-reward todo)
* Goals are fully editable and deletable, with XP that always reconciles correctly

**Progress**
* Track weight, waist, hip (with waist-to-hip ratio), chest, arm and thigh, each with its own chart and editable/deletable history
* Saved training sessions with a total-volume-over-time graph

**Stats**
* Five stat level bars, a weekly completion summary, and streaks with milestone messages
* Export / Import backup — save all your data to a file and restore it any time

**General**
* Fully offline — works with no internet after the first load
* Data is saved locally on your device; nothing is ever sent anywhere
* Habit ticks reset each week; stats, goals, logs, measurements and streaks all persist

## Backing up your data (important on iPhone)

iOS can clear a web app's local storage between updates, so **your progress is not guaranteed to survive forever on its own.** Use the **Export backup** button on the Stats page to download a `momentum-backup-<date>.json` file every so often, and **Import backup** to restore everything after an update or a reset. This is the reliable way to keep your history safe.

## How to deploy (GitHub Pages)

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from branch → main → / (root)**
4. Your app will be live at `https://<your-username>.github.io/<repo-name>/`

When you push an update, the service worker uses a network-first strategy for the app, so the new version reaches installed devices on next launch. If you ever change what's cached, bump the `CACHE` version string in `sw.js` so the update propagates.

## How to install on your phone

**iPhone (Safari)**
1. Open the GitHub Pages URL in Safari
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add**

**Android (Chrome)**
1. Open the URL in Chrome
2. Tap the three-dot menu
3. Tap **Add to Home screen**
4. Tap **Add**

Once installed it opens fullscreen like a native app and works offline.

## File structure

```
/
├── index.html       # The entire app (UI, logic, styles)
├── manifest.json    # PWA manifest
├── sw.js            # Service worker (offline support + update handling)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

The whole app lives in `index.html` — markup, styling and logic in one file — with `manifest.json` and `sw.js` making it installable and offline-capable.

## Notes

* Habit ticks reset automatically each week; everything else (stats, XP, goals, gym logs, measurements, streaks) persists
* All data is stored in your browser's local storage — the app never sends anything to a server
* Because local storage can be cleared by the OS, export a backup periodically to be safe
