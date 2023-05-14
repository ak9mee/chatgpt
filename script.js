import { create, Completion } from 'https://cdn.skypack.dev/@openai/api';

const chatbox = document.querySelector('.chat-box');
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');

// Initialize the OpenAI API
const openai = create('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');

chatButton.addEventListener('click', (e) => {
  e.preventDefault();
  const message = chatInput.value;
  if (message.trim() === '') return;
  chatInput.value = '';

  // Use the OpenAI API to generate a response to the user's message
  Completion.create({
    engine: 'davinci',
    prompt: message,
    maxTokens: 1000,
    n: 1,
    stop: '\n',
    temperature: 0.5,
  })
    .then((res) => {
      const response = res.choices[0].text;
      addMessage(message, 'user');
      addMessage(response, 'bot');
      chatbox.scrollTop = chatbox.scrollHeight;
    })
    .catch((err) => console.error(err));
});

function addMessage(message, sender) {
  const messageElem = document.createElement('div');
  messageElem.classList.add('message');
  messageElem.classList.add(sender);
  messageElem.textContent = message;
  chatbox.appendChild(messageElem);
}
