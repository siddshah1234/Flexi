// this screen shows the top 10 users ranked by XP
// it fetches live data from the Appwrite users collection sorted by xp descending
// medals are shown for top 3 users, numbered ranks for the rest

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getLeaderboard, getCurrentUser } from '../../lib/appwrite';

const MEDALS = ['🥇', '🥈', '🥉'];

const LeaderboardItem = ({ item, rank, isCurrentUser }) => (
  <View style={[styles.row, isCurrentUser && styles.rowHighlighted]}>
    <Text style={styles.rank}>
      {rank <= 3 ? MEDALS[rank - 1] : `#${rank}`}
    </Text>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <Text style={styles.username} numberOfLines={1}>
      {item.username}{isCurrentUser ? ' (you)' : ''}
    </Text>
    <Text style={styles.xp}>{item.xp} XP</Text>
  </View>
);

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // refresh leaderboard every time the tab is focused
  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        setLoading(true);
        setError(null);
        try {
          const [leaderboard, me] = await Promise.all([
            getLeaderboard(),
            getCurrentUser(),
          ]);
          setUsers(leaderboard);
          setCurrentUserId(me?.$id ?? null);
        } catch {
          setError('Failed to load leaderboard. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      <Text style={styles.subHeader}>Top 10 by XP</Text>

      {loading && (
        <ActivityIndicator size="large" color="#E55837" style={{ marginTop: 40 }} />
      )}

      {!loading && error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {!loading && !error && users.length === 0 && (
        <Text style={styles.emptyText}>No users yet. Be the first!</Text>
      )}

      {!loading && !error && users.length > 0 && (
        <FlatList
          data={users}
          keyExtractor={(item) => item.$id}
          renderItem={({ item, index }) => (
            <LeaderboardItem
              item={item}
              rank={index + 1}
              isCurrentUser={item.$id === currentUserId}
            />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
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
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  rowHighlighted: {
    borderWidth: 1.5,
    borderColor: '#E55837',
  },
  rank: {
    width: 36,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 12,
    backgroundColor: '#333',
  },
  username: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  xp: {
    fontSize: 14,
    color: '#E55837',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
  emptyText: {
    color: '#CDCDE0',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
});

export default Leaderboard;
