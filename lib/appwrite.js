// this file defines utility functions for interacting with Appwrite services
// it includes user authentication, account management, and database operations

import { Account, Avatars, Client, ID, Databases, Query, OAuthProvider } from 'react-native-appwrite';
import * as WebBrowser from 'expo-web-browser';

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: 'com.beatityo.flexi',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
  challengesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CHALLENGES_COLLECTION_ID,
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  // this creates an account instance
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    // Create User
    const newUser = await databases.createDocument(
      // add to the database
      config.databaseId,
      config.userCollectionId,
      // connect userbase ID to the account ID
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(username),
        xp: 0,
      }
    );
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    // Return null for guest users (not logged in) instead of throwing
    return null;
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Update User
export async function updateUser(userId, data) {
  try {
    const response = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      data
    );
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Get top 10 users sorted by XP descending
export async function getLeaderboard() {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.orderDesc('xp'), Query.limit(10)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

// Get today's challenges by date
export async function getTodaysChallenges() {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const response = await databases.listDocuments(
      config.databaseId,
      config.challengesCollectionId,
      [Query.equal('date', today)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return [];
  }
}

// Google OAuth sign-in using token flow (createOAuth2Token → createSession)
export async function signInWithGoogle() {
  // Clear any existing session first — Appwrite blocks new sessions if one is active
  try { await account.deleteSession('current'); } catch (_) {}

  const redirectUri = 'appwrite-callback-69d6b9b3000bed710e6f://';

  const loginUrl = account.createOAuth2Token(
    OAuthProvider.Google,
    redirectUri,
    redirectUri
  );

  if (!loginUrl) throw new Error('Failed to generate OAuth URL');

  const result = await WebBrowser.openAuthSessionAsync(loginUrl.toString(), redirectUri);
  if (result.type !== 'success' || !result.url) {
    throw new Error('Google sign-in was cancelled');
  }

  const url = new URL(result.url);
  const secret = url.searchParams.get('secret');
  const userId = url.searchParams.get('userId');
  if (!secret || !userId) throw new Error('Missing OAuth credentials');

  await account.createSession(userId, secret);
  return await getCurrentUser();
}

export { account, avatars, databases };

export const getUserProfile = async (accountId) => {
  // Query the user collection for the document with this accountId
  const response = await databases.listDocuments(
    config.databaseId,
    config.userCollectionId,
    [Query.equal('accountId', accountId)]
  );
  return response.documents[0]; // Assuming accountId is unique
};