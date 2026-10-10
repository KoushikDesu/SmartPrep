/**
 * SmartPrep — Daily Streak Tracker with 4-Day Streak Freeze
 * 
 * Rules:
 * 1. Starting today gives a streak of 1 day and the maximum of 4 freeze protections.
 * 2. If the user practices consecutive days, streak increases (+1).
 * 3. If a day is missed:
 *    - Each missed day consumes 1 freeze.
 *    - Up to 4 consecutive missed days are protected by the 4-day freeze.
 *    - If missed days <= freezes available, the streak is PRESERVED!
 *    - When the user resumes practicing, their freeze count refills back to 4.
 * 4. If inactive for more than 4 missed days (> 4 freezes), the streak resets to 1 day,
 *    and they receive their fresh 4 freezes back.
 */

import { supabase } from './supabase.js';

const MAX_FREEZES = 4;

function getStorageKey(userId) {
  return `smartprep_streak_${userId || 'guest'}`;
}

function getTodayDateStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateStr(str) {
  if (!str) return null;
  const parts = str.split('-');
  if (parts.length !== 3) return null;
  return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
}

function daysDiff(date1, date2) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / msPerDay);
}

/**
 * Get current streak information
 * @param {string} userId 
 * @returns {Promise<{ streak: number, freezes: number, lastActiveDate: string, frozen: boolean }>}
 */
export async function getStreakInfo(userId) {
  const todayStr = getTodayDateStr();
  const key = getStorageKey(userId);
  let localData = null;

  try {
    const raw = localStorage.getItem(key);
    if (raw) localData = JSON.parse(raw);
  } catch (e) {
    localData = null;
  }

  // Fallback defaults
  let streak = localData?.streak || 0;
  let freezes = typeof localData?.freezes === 'number' ? localData.freezes : MAX_FREEZES;
  let lastActiveDate = localData?.lastActiveDate || null;

  // Try fetching from Supabase profiles if logged in
  if (supabase && userId && userId !== 'guest' && !localData) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('streak, freezes, last_active_date')
        .eq('id', userId)
        .maybeSingle();

      if (data) {
        if (typeof data.streak === 'number') streak = data.streak;
        if (typeof data.freezes === 'number') freezes = data.freezes;
        if (data.last_active_date) lastActiveDate = data.last_active_date;
      }
    } catch (e) {
      console.warn('Could not read streak from Supabase:', e);
    }
  }

  // Evaluate elapsed days against freezes
  let frozen = false;
  if (lastActiveDate) {
    const today = parseDateStr(todayStr);
    const lastDate = parseDateStr(lastActiveDate);
    const gap = daysDiff(lastDate, today);

    if (gap === 0) {
      // Practiced today
    } else if (gap === 1) {
      // Yesterday was practiced, streak active
    } else if (gap > 1) {
      // User missed (gap - 1) days
      const missedDays = gap - 1;
      if (missedDays <= freezes) {
        // Freeze protects the streak!
        freezes = freezes - missedDays;
        frozen = true;
      } else {
        // Freeze exhausted: Streak resets
        streak = 0;
        freezes = MAX_FREEZES;
      }
    }
  }

  return {
    streak,
    freezes: Math.max(0, Math.min(MAX_FREEZES, freezes)),
    lastActiveDate,
    frozen
  };
}

/**
 * Record practice activity for today
 * Resets freezes to MAX_FREEZES (4) upon resuming and advances streak
 * @param {string} userId 
 * @returns {Promise<{ streak: number, freezes: number, isNewStreakDay: boolean }>}
 */
export async function recordDailyActivity(userId) {
  const todayStr = getTodayDateStr();
  const current = await getStreakInfo(userId);

  let newStreak = current.streak;
  let newFreezes = MAX_FREEZES; // Refill to 4 freezes on activity!
  let isNewStreakDay = false;

  if (!current.lastActiveDate) {
    newStreak = 1;
    isNewStreakDay = true;
  } else {
    const today = parseDateStr(todayStr);
    const lastDate = parseDateStr(current.lastActiveDate);
    const gap = daysDiff(lastDate, today);

    if (gap === 0) {
      // Already recorded for today
      newStreak = Math.max(1, current.streak);
      newFreezes = MAX_FREEZES;
      isNewStreakDay = false;
    } else if (gap === 1) {
      // Practiced yesterday: streak increments!
      newStreak = (current.streak || 0) + 1;
      newFreezes = MAX_FREEZES; // Full refill on resumption
      isNewStreakDay = true;
    } else {
      const missedDays = gap - 1;
      if (missedDays <= MAX_FREEZES) {
        // Protected by freezes! Streak continues + 1
        newStreak = Math.max(1, current.streak) + 1;
        newFreezes = MAX_FREEZES; // Reset freeze bank to max 4 on resume
        isNewStreakDay = true;
      } else {
        // Freeze expired (> 4 days gap)
        newStreak = 1;
        newFreezes = MAX_FREEZES;
        isNewStreakDay = true;
      }
    }
  }

  const updatedRecord = {
    streak: newStreak,
    freezes: newFreezes,
    lastActiveDate: todayStr
  };

  // 1. Save to localStorage
  const key = getStorageKey(userId);
  try {
    localStorage.setItem(key, JSON.stringify(updatedRecord));
  } catch (e) {}

  // 2. Dispatch custom event so navbar and widgets update immediately
  window.dispatchEvent(new CustomEvent('smartprep-streak-updated', {
    detail: updatedRecord
  }));

  // 3. Sync to Supabase profile if logged in
  if (supabase && userId && userId !== 'guest') {
    try {
      await supabase
        .from('profiles')
        .update({
          streak: newStreak,
          freezes: newFreezes,
          last_active_date: todayStr,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
    } catch (e) {
      console.warn('Could not sync streak to Supabase:', e);
    }
  }

  return {
    streak: newStreak,
    freezes: newFreezes,
    isNewStreakDay
  };
}
