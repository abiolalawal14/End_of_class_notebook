const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = "";

// === Student-Focused Offline FAQ Bot ===
const faqs = {
  "hello": "Hi there 👋! I'm your study buddy. Ask me about Excel, Google Sheets, Power BI, SQL, or career tips!",
  "excel": "Excel tip: Use =SUM(A1:A10) to quickly add numbers. Also try PivotTables for summaries!",
  "google sheets": "Google Sheets tip: Use =IMPORTRANGE to pull data from another sheet. Super useful for collaboration!",
  "power bi": "Power BI tip 📊: Use the 'Model View' to define relationships clearly before building visuals.",
  "sql": "SQL tip 🗄️: Use 'GROUP BY' with aggregate functions (SUM, AVG) to analyze grouped data.",
  "python": "Python tip 🐍: Use list comprehensions for cleaner loops. Example: [x**2 for x in range(10)].",
  "html": "HTML basics: Use <h1> for headings, <p> for paragraphs, and <a> for links.",
  "css": "CSS tip 🎨: Use Flexbox (display: flex) for easy responsive layouts.",
  "career": "Career tip 🌍: Build projects, contribute to GitHub, and share on LinkedIn to stand out to employers.",
  "interview": "Interview prep 💡: Be ready to explain your projects clearly, and practice SQL/Excel/Power BI questions.",
  "remote job": "Remote job tip 💻: Highlight communication and collaboration skills. Tools like Slack, Zoom, and Trello are often required."
};

// === Hugging Face API (optional, needs free key) ===
const HF_API_KEY = ""; // Insert your free Hugging Face key here
const HF_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-small";

function createChatLi(message, className) {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  chatLi.innerHTML = `<p>${message}</p>`;
  return chatLi;
}

async function generateResponse(chatElement) {
  const messageElement = chatElement.querySelector("p");

  // Default to offline FAQ response
  let response = "Hmm 🤔 I don’t know that yet. Try asking about Excel, Google Sheets, Power BI, SQL, or career tips.";
  for (const key in faqs) {
    if (userMessage.toLowerCase().includes(key)) {
      response = faqs[key];
      break;
    }
  }

  // If Hugging Face API key exists, try fetching real AI response
  if (HF_API_KEY) {
    try {
      const res = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: userMessage })
      });
      const data = await res.json();
      if (data && data[0] && data[0].generated_text) {
        response = data[0].generated_text;
      }
    } catch (err) {
      console.error(err);
    }
  }

  messageElement.textContent = response;
  chatbox.scrollTo(0, chatbox.scrollHeight);
}

function handleChat() {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});

chatbotToggler.addEventListener("click", () => {
  document.querySelector(".chatbot").style.display =
    document.querySelector(".chatbot").style.display === "flex"
      ? "none"
      : "flex";
});
window.addEventListener("load", () => {
  chatInput.focus();
});
