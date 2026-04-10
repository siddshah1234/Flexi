// One-time seed script — run with: node scripts/seed.mjs
// Inserts 7 challenges and 11 fake users into Appwrite.
// Requires APPWRITE_API_KEY in .env (server API key from Appwrite console).

import { Client, Databases, ID } from 'node-appwrite';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// --- Load .env manually (no dotenv dependency needed) ---
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');
const envVars = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const ENDPOINT   = envVars['EXPO_PUBLIC_APPWRITE_ENDPOINT'];
const PROJECT_ID = envVars['EXPO_PUBLIC_APPWRITE_PROJECT_ID'];
const DB_ID      = envVars['EXPO_PUBLIC_APPWRITE_DATABASE_ID'];
const USERS_COL  = envVars['EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID'];
const CHAL_COL   = envVars['EXPO_PUBLIC_APPWRITE_CHALLENGES_COLLECTION_ID'];
const API_KEY    = envVars['APPWRITE_API_KEY'];

if (!API_KEY) {
  console.error('❌  APPWRITE_API_KEY is missing from .env');
  console.error('   Go to Appwrite Console → Project → API Keys → Create Key');
  console.error('   Scopes needed: databases.write');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const db = new Databases(client);

// ─── 7 new challenges for 2026-04-10 ────────────────────────────────────────
const challenges = [
  {
    title: 'Yoga Flow',
    description: 'Complete a full Beginner or Advanced Yoga session in the app without skipping a pose.',
    xpReward: 40,
    date: '2026-04-10',
  },
  {
    title: 'HIIT Finisher',
    description: 'Complete the Tabata HIIT circuit — 8 rounds of 20s on, 10s off. Push through every round!',
    xpReward: 75,
    date: '2026-04-10',
  },
  {
    title: 'Knowledge Drop',
    description: 'Play through all three trivia difficulty levels (Easy, Medium, and Hard) in one session.',
    xpReward: 60,
    date: '2026-04-10',
  },
  {
    title: 'Warm-Up Hero',
    description: 'Complete a full Running Stretches session before your main workout today.',
    xpReward: 15,
    date: '2026-04-10',
  },
  {
    title: 'Iron Prep',
    description: 'Complete the Weightlifting Stretches session to get your muscles ready to lift.',
    xpReward: 15,
    date: '2026-04-10',
  },
  {
    title: 'Party Animal',
    description: 'Join a Group Exercise session in the Party tab and stay for the whole workout.',
    xpReward: 50,
    date: '2026-04-10',
  },
  {
    title: 'Century Club',
    description: 'Reach or pass a total of 100 XP today by completing multiple activities.',
    xpReward: 100,
    date: '2026-04-10',
  },
];

// ─── 11 fake leaderboard users ───────────────────────────────────────────────
const fakeUsers = [
  { username: 'HIITmaster99',  firstName: 'Marcus',  lastName: 'Webb',    xp: 1840 },
  { username: 'YogaQueenSara', firstName: 'Sara',    lastName: 'Lin',     xp: 1590 },
  { username: 'FitnessFred',   firstName: 'Fred',    lastName: 'Okafor',  xp: 1320 },
  { username: 'IronMikeFlex',  firstName: 'Mike',    lastName: 'Torres',  xp: 1100 },
  { username: 'CardioKing',    firstName: 'James',   lastName: 'Park',    xp: 870  },
  { username: 'ZenStretch',    firstName: 'Priya',   lastName: 'Nair',    xp: 740  },
  { username: 'BurpeeBeast',   firstName: 'Caleb',   lastName: 'Smith',   xp: 530  },
  { username: 'FlexiStar',     firstName: 'Aisha',   lastName: 'Diallo',  xp: 390  },
  { username: 'RunnerRio',     firstName: 'Rio',     lastName: 'Santos',  xp: 240  },
  { username: 'TriviaTom',     firstName: 'Tom',     lastName: 'Hughes',  xp: 150  },
  { username: 'NewbiePulse',   firstName: 'Jamie',   lastName: 'Brooks',  xp: 70   },
];

// ─── Insert ───────────────────────────────────────────────────────────────────
async function seed() {
  console.log('\n🌱  Starting seed...\n');

  // Challenges
  console.log('📅  Inserting challenges...');
  for (const c of challenges) {
    const doc = await db.createDocument(DB_ID, CHAL_COL, ID.unique(), c);
    console.log(`   ✅  "${c.title}" — ${c.xpReward} XP  (id: ${doc.$id})`);
  }

  // Fake users
  console.log('\n👥  Inserting fake users...');
  for (let i = 0; i < fakeUsers.length; i++) {
    const u = fakeUsers[i];
    const accountId = `fake_${String(i + 1).padStart(3, '0')}`;
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.firstName + '+' + u.lastName)}&background=random`;
    const email = `${u.username.toLowerCase()}@flexi.fake`;

    const doc = await db.createDocument(DB_ID, USERS_COL, ID.unique(), {
      accountId,
      email,
      username: u.username,
      avatar,
      xp: u.xp,
    });
    console.log(`   ✅  ${u.username} — ${u.xp} XP  (id: ${doc.$id})`);
  }

  console.log('\n🎉  Seed complete!\n');
}

seed().catch(err => {
  console.error('\n❌  Seed failed:', err.message ?? err);
  process.exit(1);
});
