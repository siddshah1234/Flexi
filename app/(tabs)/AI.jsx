import React, { useState, useEffect } from "react";
import { View, TextInput, Text, SafeAreaView, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { sendMessageToChatGPT } from "./chatgptServices.jsx";

const AI = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const initialMessage = "Hello! I am your assistant. How can I help you today?";
        const botMessage = { role: "assistant", content: initialMessage };
        setMessages([botMessage]);
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        const updatedMessages = [...messages, { role: "user", content: userMessage }];
        setMessages(updatedMessages);
        setInput("");

        const botResponse = await sendMessageToChatGPT(userMessage, updatedMessages);
        const botMessage = { role: "assistant", content: botResponse };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Flexi AI</Text>
            <Text style={styles.subtitle}>Get assistance with exercise or health</Text>
            <Text></Text>
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
        backgroundColor: '#E55837', // Set button background color
        padding: 10,
        borderRadius: 8,
        marginLeft: 10,
    },
    sendButtonText: {
        color: '#FFFFFF', // Set button text color to white
        fontWeight: 'bold',
    },
    keyboardAvoidingView: {
        paddingBottom: 10,
    },
});

export default AI;