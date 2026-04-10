// this file sends a message to the openai chatgpt api and returns the response
// it's used by the ai chatbot in the app to talk with the user
// it sets a custom instruction (system message) to make chatgpt act like a fitness coach
// all user messages and past messages are sent along to give context
// the response is pulled from the api result and returned to the app to be shown

import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

export const sendMessageToChatGPT = async (userMessage, previousMessages = []) => {
    try {
        // tells chatgpt to act like a fitness coach
        const contextMessage = {
            role: "system",
            content: "You are a fitness coach and you need to help the user with their fitness goals. Only provide advice related to fitness and health. If they ask anything else, redirect them to a fitness-related topic.",
        };

        // build the full list of messages to send (context + convo history + new message)
        const messages = [contextMessage, ...previousMessages, { role: "user", content: userMessage }];

        // send the request to openai with gpt-3.5-turbo model
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.7, // adds some randomness to replies
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // get the reply text from the api result
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("ChatGPT API error:", error);
        return "Error: Unable to get response from AI.";
    }
};
