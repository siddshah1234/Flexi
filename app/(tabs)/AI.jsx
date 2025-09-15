// this file builds a basic ai chatbot screen called flexi ai
// users type questions into an input box and get responses from chatgpt
// the messages are shown in a chat format with different styles for user and ai
// it starts with a default greeting message from the assistant
// when the user types and presses send, the message gets added and sent to chatgpt
// the bot reply is then added to the chat thread too

import React, { useState, useEffect } from "react";
import { View, TextInput, Text, SafeAreaView, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { sendMessageToChatGPT } from "./chatgptServices.jsx";

const AI = () => {
  // holds all chat messages
  const [messages, setMessages] = useState([]);
  // tracks what user is typing
  const [input, setInput] = useState("");

  // add a welcome message from the bot when the screen loads
  useEffect(() => {
    const initialMessage = "Hello! I am your assistant. How can I help you today?";
    const botMessage = { role: "assistant", content: initialMessage };
    setMessages([botMessage]);
  }, []);

  // called when user presses send
  const handleSend = async () => {
    if (!input.trim()) return;

    // add user message to the messages list
    const userMessage = input;
    const updatedMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);
    setInput("");

    // send message to chatgpt and get a response
    const botResponse = await sendMessageToChatGPT(userMessage, updatedMessages);
    const botMessage = { role: "assistant", content: botResponse };

    // add the bot's reply to the chat
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* chatbot title and subtitle */}
      <Text style={styles.title}>Flexi AI</Text>
      <Text style={styles.subtitle}>Get assistance with exercise or health</Text>

      {/* show all chat messages in a scrollable list */}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.role === "user" ? styles.userMessage : styles.botMessage}>
            {item.content}
          </Text>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* message input and send button with keyboard spacing */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#FFFFFF"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 20,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#E55837",
    padding: 8,
    marginRight: 10,
    marginVertical: 4,
    borderRadius: 8,
    color: '#AAAAA',
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EAEAEA",
    padding: 8,
    marginLeft: 10,
    marginVertical: 4,
    borderRadius: 8,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: '#FFFFFF',
  },
  sendButton: {
    backgroundColor: '#E55837',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  keyboardAvoidingView: {
    paddingBottom: 10,
  },
});

export default AI;
