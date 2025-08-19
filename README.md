# 🌤️ Weather Agent Chat App

A simple weather chatbot providing real-time responses using a weather agent API. Built with **React**, **TypeScript**, and **Tailwind CSS**.

---

## 📦 Final Deliverables

- ✅ `src/`
- ✅ `README.md`
- ✅ `package.json`
- ✅ Screenshots
- ✅ API assumptions
- ✅ Live Demo (optional)

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ShrushtiGowari09/weather-agent-chat.git
cd weather-agent-chat
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start the Development Server
bash
Copy
Edit
npm run dev
Visit: http://localhost:5173

🧠 Approach & Component Structure
🧩 Component Structure
bash
Copy
Edit
src/
├── App.tsx                # Main container and logic
├── ChatInterface.tsx      # Layout with header, chat window, and input
├── components/
│   ├── ChatWindow.tsx     # Renders the message history
│   ├── MessageInput.tsx   # Input field and send button
│   └── MessageBubble.tsx  # Styled chat bubbles
├── types.ts               # Shared Message type
⚙️ Core Logic
App.tsx: Handles state management (messages, loading) and API call logic.

ChatInterface.tsx: Combines ChatWindow and MessageInput into a single interface.

ChatWindow.tsx: Displays each message with role-based styling.

MessageInput.tsx: Sends the query entered by the user.

MessageBubble.tsx: Optional component for individually styled chat bubbles.

🌐 API Assumptions
Endpoint Used:
bash
Copy
Edit
https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream
Assumptions:
API returns a streaming response with assistant replies in chunks ("0": "...").

Expected queries: weather-related (e.g., “What’s the weather in Mumbai?”).

API runs with a 5-step max or times out.

Chunked response requires manual parsing with regex.

⚠️ Known Issues / Scope Limitations
⛔ Some responses may be partial/malformed — handled with regex.

🌤️ Only weather-related queries are supported.

🔐 No user login, sessions, or conversation history.

💬 UI lacks typing indicators or animation during assistant response.

🙋‍♀️ Author
Shrushti Gowari
📧 shrushtigowari09@gmail.com
🔗 GitHub Profile

📄 License
This project is open-source and available under the MIT License.

Feel free to fork, contribute, or use as a starter!

