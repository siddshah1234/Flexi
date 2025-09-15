// this file defines a reusable Quote component
// it displays a random motivational quote from a predefined list

import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const quotes = [
  "“The only bad workout is the one that didn't happen”",
  "“Success is not final, failure is not fatal: It is the courage to continue that counts.”",
  "“Don’t watch the clock; do what it does. Keep going.”",
  "“Keep your face always toward the sunshine—and shadows will fall behind you.”",
  "“The future belongs to those who believe in the beauty of their dreams.”",
  "“Believe you can and you're halfway there.”",
  "“Act as if what you do makes a difference. It does.”",
  "“Success usually comes to those who are too busy to be looking for it.”",
  "“Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.”",
  "“Hardships often prepare ordinary people for an extraordinary destiny.”",
  "“Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.”",
  "“Start where you are. Use what you have. Do what you can.”",
  "“Your limitation—it's only your imagination.”",
  "“Push yourself, because no one else is going to do it for you.”",
  "“Great things never come from comfort zones.”",
  "“Dream it. Wish it. Do it.”",
  "“Success doesn’t just find you. You have to go out and get it.”",
  "“The harder you work for something, the greater you’ll feel when you achieve it.”",
  "“Dream bigger. Do bigger.”",
  "“Don’t stop when you’re tired. Stop when you’re done.”",
  "“Wake up with determination. Go to bed with satisfaction.”",
  "“Do something today that your future self will thank you for.”",
  "“Little things make big days.”",
  "“It’s going to be hard, but hard does not mean impossible.”",
  "“Don’t wait for opportunity. Create it.”",
  "“Sometimes we’re tested not to show our weaknesses, but to discover our strengths.”",
  "“The key to success is to focus on goals, not obstacles.”",
  "“Dream it. Believe it. Build it.”",
];

const Quote = ({ otherStyles }) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <View style={[{ marginVertical: 10 }, otherStyles]}>
      <View
        style={{
          borderWidth: 2,
          borderColor: '#444',
          backgroundColor: '#161622',
          borderRadius: 12,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 16, color: '#CDCDE0', textAlign: 'center' }}>
          {quote}
        </Text>
      </View>
    </View>
  );
};

export default Quote;