import axios from "axios";

const API_KEY = "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";

export const sendMessageToChatGPT = async (userMessage, previousMessages = []) => {
    try {
        // Add context message before the user message
        const contextMessage = {
            role: "system",
            content: "You are a fitness coach and you need to help the user with their fitness goals. Only provide advice related to fitness and health. If they ask anything else, redirect them to a fitness-related topic.",
        };

        // Combine context and previous messages with the new user message
        const messages = [contextMessage, ...previousMessages, { role: "user", content: userMessage }];

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", // Use "gpt-4" if available
                messages: messages,
                temperature: 0.7,
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("ChatGPT API error:", error);
        return "Error: Unable to get response from AI.";
    }
};