// Shared challenge pool and date-seeded daily selection.
// Used by both challenges.jsx and exercise.jsx.

export const CHALLENGE_POOL = [
  // HIIT
  { id: 1,  title: 'Tabata Blast',         description: 'Complete the full Tabata HIIT circuit — 8 rounds of 20s on, 10s off. No skipping!',                        xpReward: 75,  category: 'hiit' },
  { id: 2,  title: 'AMRAP Attack',          description: 'Do as many rounds as possible of the AMRAP circuit for the full duration.',                                  xpReward: 70,  category: 'hiit' },
  { id: 3,  title: 'EMOM Grind',            description: 'Complete the EMOM workout — start a new move every minute on the minute.',                                   xpReward: 65,  category: 'hiit' },
  { id: 4,  title: 'Ladder Climber',        description: 'Finish the Ladder HIIT — add one rep each round and keep going until you max out.',                          xpReward: 80,  category: 'hiit' },
  { id: 5,  title: 'Double HIIT',           description: 'Complete any two HIIT circuits back to back today.',                                                          xpReward: 100, category: 'hiit' },
  { id: 6,  title: 'Burpee Minute',         description: 'Do as many burpees as you can in 60 seconds. Record your count and try to beat it.',                         xpReward: 40,  category: 'hiit' },
  { id: 7,  title: 'Jump Squat Sprint',     description: 'Complete 5 sets of 10 jump squats with 15 seconds rest between each set.',                                   xpReward: 35,  category: 'hiit' },
  { id: 8,  title: 'Mountain Climber Mile', description: 'Do 100 mountain climbers total, broken up however you need.',                                                 xpReward: 45,  category: 'hiit' },
  { id: 9,  title: 'Push-Up Pyramid',       description: 'Do 1, 2, 3, 4, 5, 4, 3, 2, 1 push-ups with 10 seconds rest between each set.',                              xpReward: 30,  category: 'hiit' },
  { id: 10, title: 'Core Crusher',          description: 'Complete 3 rounds of: 20 crunches, 30s plank, 15 leg raises. No rest between exercises.',                    xpReward: 50,  category: 'hiit' },
  // YOGA
  { id: 11, title: 'Beginner Flow',         description: 'Complete the full Beginner Yoga session without skipping a pose.',                                            xpReward: 40,  category: 'yoga' },
  { id: 12, title: 'Advanced Flow',         description: 'Push yourself through the full Advanced Yoga session from start to finish.',                                  xpReward: 60,  category: 'yoga' },
  { id: 13, title: 'Double Yoga Day',       description: 'Complete both the Beginner and Advanced yoga sessions today.',                                                xpReward: 90,  category: 'yoga' },
  { id: 14, title: 'Hold It Steady',        description: 'Pick any 3 yoga poses and hold each one for 60 seconds. Focus on your breathing.',                           xpReward: 25,  category: 'yoga' },
  { id: 15, title: 'Morning Salutation',    description: 'Complete the yoga session first thing in your day before any other activity.',                                xpReward: 35,  category: 'yoga' },
  { id: 16, title: 'Warrior Challenge',     description: 'Hold Warrior I and Warrior II on each side for 45 seconds each. Feel the burn.',                             xpReward: 30,  category: 'yoga' },
  { id: 17, title: 'Balance Master',        description: 'Practice tree pose on each leg for 60 seconds. No wall support allowed.',                                    xpReward: 20,  category: 'yoga' },
  { id: 18, title: 'Yoga & Breathe',        description: 'Complete a yoga session and spend 5 minutes on deep breathing afterward.',                                   xpReward: 45,  category: 'yoga' },
  { id: 19, title: 'Evening Unwind',        description: 'Do the Beginner Yoga session in the evening to wind down from the day.',                                     xpReward: 30,  category: 'yoga' },
  { id: 20, title: 'Flow & Focus',          description: 'Complete the Advanced Yoga session while focusing on alignment for every single pose.',                       xpReward: 55,  category: 'yoga' },
  // STRETCHES
  { id: 21, title: "Runner's Warm-Up",      description: 'Complete the full Running Stretches session before any other activity today.',                                xpReward: 15,  category: 'stretches' },
  { id: 22, title: "Lifter's Prep",         description: 'Complete the Weightlifting Stretches session to get your muscles fully ready.',                               xpReward: 15,  category: 'stretches' },
  { id: 23, title: 'Double Stretch',        description: 'Complete both the Running and Weightlifting stretch sessions back to back.',                                  xpReward: 25,  category: 'stretches' },
  { id: 24, title: 'Hamstring Hero',        description: 'Hold a hamstring stretch on each leg for 45 seconds. Do 3 rounds per side.',                                 xpReward: 10,  category: 'stretches' },
  { id: 25, title: 'Hip Opener',            description: 'Spend 5 minutes working through hip flexor stretches on both sides.',                                        xpReward: 15,  category: 'stretches' },
  { id: 26, title: 'Shoulder Unlock',       description: 'Complete all upper-body stretches in the Weightlifting session with a 5-second hold each.',                  xpReward: 20,  category: 'stretches' },
  { id: 27, title: 'Cooldown King',         description: 'Do the Running Stretches session immediately after finishing any workout today.',                             xpReward: 20,  category: 'stretches' },
  { id: 28, title: 'Full Body Stretch',     description: 'Spend 10 minutes stretching every major muscle group — legs, back, shoulders, and arms.',                    xpReward: 25,  category: 'stretches' },
  { id: 29, title: 'Neck & Back Reset',     description: 'Do 5 neck rolls each direction and 10 cat-cow stretches. Slow and controlled.',                              xpReward: 10,  category: 'stretches' },
  { id: 30, title: 'Stretch Streak',        description: 'Complete a stretching session three times today — morning, midday, and evening.',                            xpReward: 35,  category: 'stretches' },
  // TRIVIA
  { id: 31, title: 'Easy Does It',          description: 'Complete the Easy Trivia round and answer every question correctly.',                                         xpReward: 20,  category: 'trivia' },
  { id: 32, title: 'Medium Minded',         description: 'Complete the Medium Trivia round without getting any question wrong.',                                        xpReward: 40,  category: 'trivia' },
  { id: 33, title: 'Hard Knocks',           description: 'Complete the Hard Trivia round. Score at least 70% to claim this challenge.',                                xpReward: 60,  category: 'trivia' },
  { id: 34, title: 'Trivia Triple',         description: 'Complete all three trivia difficulty levels — Easy, Medium, and Hard — in one session.',                     xpReward: 100, category: 'trivia' },
  { id: 35, title: 'Jeopardy Champ',        description: 'Play a full game of Jeopardy with at least 2 teams and answer 10 questions.',                                xpReward: 50,  category: 'trivia' },
  { id: 36, title: 'Fitness Expert',        description: 'Answer 5 fitness-category questions correctly in the Jeopardy board.',                                       xpReward: 35,  category: 'trivia' },
  { id: 37, title: 'Nutrition Nerd',        description: 'Answer all Food category questions correctly in Jeopardy.',                                                   xpReward: 30,  category: 'trivia' },
  { id: 38, title: 'HIIT Scholar',          description: 'Answer all HIIT category questions correctly in Jeopardy without any wrong answers.',                         xpReward: 35,  category: 'trivia' },
  { id: 39, title: 'No Wrong Answers',      description: 'Complete Easy Trivia with a perfect score — no incorrect answers allowed.',                                   xpReward: 25,  category: 'trivia' },
  { id: 40, title: 'Knowledge Drop',        description: 'Play through any two trivia levels and hit a combined score of at least 300 points.',                         xpReward: 45,  category: 'trivia' },
  // PARTY
  { id: 41, title: 'Group Sweat',           description: 'Join a Group Exercise session in the Party tab and complete the full workout.',                               xpReward: 50,  category: 'party' },
  { id: 42, title: 'Jeopardy Host',         description: 'Start and finish a Jeopardy game in the Party tab with at least 3 teams.',                                   xpReward: 55,  category: 'party' },
  { id: 43, title: 'Party Starter',         description: 'Invite a friend to join you in the Group Exercise session today.',                                            xpReward: 40,  category: 'party' },
  { id: 44, title: 'Social Athlete',        description: 'Complete both a Group Exercise session and a Jeopardy game in one day.',                                      xpReward: 80,  category: 'party' },
  { id: 45, title: 'Team Captain',          description: 'Win a Jeopardy game as the highest-scoring team.',                                                            xpReward: 45,  category: 'party' },
  { id: 46, title: 'Party Finisher',        description: 'Stay in a Group Exercise session for the entire duration without leaving early.',                             xpReward: 35,  category: 'party' },
  { id: 47, title: 'Double Party',          description: 'Complete two separate Group Exercise sessions today.',                                                         xpReward: 70,  category: 'party' },
  { id: 48, title: 'Crowd Pleaser',         description: 'Join a Group Exercise session with 3 or more other participants.',                                            xpReward: 40,  category: 'party' },
  { id: 49, title: 'Comeback Kid',          description: 'Lose the first round of Jeopardy and come back to win the next game.',                                       xpReward: 50,  category: 'party' },
  { id: 50, title: 'Century Club',          description: 'Reach 100 total XP earned today by completing multiple activities across the app.',                           xpReward: 100, category: 'party' },
];

// Deterministically picks 5 challenges using today's date as a seed.
// Same 5 challenges for every user on the same day. Rotates automatically at midnight.
export function getTodaysChallenges() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  const pool = [...CHALLENGE_POOL];
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}
