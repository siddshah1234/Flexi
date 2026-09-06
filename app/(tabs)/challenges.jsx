import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useXp } from './XpContext';
import { getTodaysChallenges } from '../../constants/challenges';

const CHALLENGES_FILE = FileSystem.documentDirectory + 'daily_challenges.json';
const CATEGORY_LABELS = { hiit: '💪 HIIT', yoga: '🧘 Yoga', stretches: '🤸 Stretches', trivia: '🧠 Trivia', party: '🎉 Party' };

const todayDateStr = () => new Date().toISOString().split('T')[0];

async function loadCompletedIds() {
  try {
    const info = await FileSystem.getInfoAsync(CHALLENGES_FILE);
    if (!info.exists) return new Set();
    const raw = await FileSystem.readAsStringAsync(CHALLENGES_FILE);
    const data = JSON.parse(raw);
    if (data.date !== todayDateStr()) return new Set(); // new day — reset
    return new Set(data.completedIds);
  } catch {
    return new Set();
  }
}

async function saveCompletedIds(ids) {
  try {
    await FileSystem.writeAsStringAsync(
      CHALLENGES_FILE,
      JSON.stringify({ date: todayDateStr(), completedIds: [...ids] })
    );
  } catch (e) {
    console.error('Failed to save challenge progress', e);
  }
}

// ─── Components ──────────────────────────────────────────────────────────────
const ChallengeCard = ({ item, onComplete, completed }) => (
  <View style={[styles.card, completed && styles.cardCompleted]}>
    <View style={styles.cardHeader}>
      <View style={{ flex: 1, marginRight: 8 }}>
        <Text style={styles.categoryLabel}>{CATEGORY_LABELS[item.category]}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Text style={styles.xpBadge}>+{item.xpReward} XP</Text>
    </View>
    <Text style={styles.cardDescription}>{item.description}</Text>
    {completed ? (
      <Text style={styles.completedLabel}>✅ Completed</Text>
    ) : (
      <TouchableOpacity style={styles.completeButton} onPress={() => onComplete(item)}>
        <Text style={styles.completeButtonText}>Mark Complete</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const Challenges = () => {
  const challenges = useMemo(() => getTodaysChallenges(), []);
  const [completedIds, setCompletedIds] = useState(new Set());
  const { addXp } = useXp();

  useEffect(() => {
    loadCompletedIds().then(setCompletedIds);
  }, []);

  const handleComplete = async (challenge) => {
    if (completedIds.has(challenge.id)) return;
    const updated = new Set([...completedIds, challenge.id]);
    setCompletedIds(updated);
    await saveCompletedIds(updated);
    await addXp(challenge.xpReward);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Daily Challenges</Text>
      <Text style={styles.subHeader}>{today}</Text>
      <Text style={styles.note}>Complete each challenge to earn XP. Progress saves automatically.</Text>
      <FlatList
        data={challenges}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ChallengeCard
            item={item}
            onComplete={handleComplete}
            completed={completedIds.has(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: '#CDCDE0',
    textAlign: 'center',
    marginBottom: 6,
  },
  note: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  cardCompleted: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 11,
    color: '#E55837',
    fontWeight: 'bold',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  xpBadge: {
    backgroundColor: '#E55837',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardDescription: {
    fontSize: 14,
    color: '#CDCDE0',
    marginBottom: 14,
    lineHeight: 20,
  },
  completeButton: {
    backgroundColor: '#E55837',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  completedLabel: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Challenges;
