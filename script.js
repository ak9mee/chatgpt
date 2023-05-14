// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = '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';

// Import the OpenAI API client
import openai from '@openai/api';

// Initialize the client with your API key
const client = new openai(apiKey);

// Get the chat input and button elements
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');

// Get the chat box element
const chatBox = document.querySelector('.chat-box');

// Function to send a message to the chatbot
async function sendMessage() {
  // Get the user's message
  const message = chatInput.value;

  // Clear the input field
  chatInput.value = '';

  // Add the user's message to the chat box
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message', 'user');
  userMessage.innerHTML = `<p>${message}</p>`;
  chatBox.appendChild(userMessage);

  // Send the user's message to the chatbot
  const response = await client.complete({
    engine: 'davinci',
    prompt: message,
    maxTokens: 50,
    n: 1,
    stop: '\n',
  });

  // Get the chatbot's response
  const botMessage = response.data.choices[0].text.trim();

  // Add the chatbot's response to the chat box
  const botMessageElement = document.createElement('div');
  botMessageElement.classList.add('chat-message', 'bot');
  botMessageElement.innerHTML = `<p>${botMessage}</p>`;
  chatBox.appendChild(botMessageElement);

  // Scroll to the bottom of the chat box
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Add an event listener to the chat button
chatButton.addEventListener('click', sendMessage);

// Add an event listener to the input field to allow the user to press enter to send a message
chatInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
