// this file defines utility functions for interacting with Appwrite services
// it includes user authentication, account management, and database operations

import { Account, Avatars, Client, ID, Databases, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.beatityo.flexi',
  projectId: '678d76d70037a833797f',
  databaseId: '678d793d001b39d2f7e0',
  userCollectionId: '678d79670035057b1ee8',
  storageId: '678d7b460013ee697a78',
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
    throw new Error(error);
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