# RAG Chatbot

A modern, interactive chatbot application powered by Retrieval-Augmented Generation (RAG) technology. This project combines a responsive React.js frontend styled with TailwindCSS with a Python backend to deliver an intelligent conversational experience.

**[Live Demo](https://rag-chatbot-by3p.vercel.app/)** | **[GitHub Repository](https://github.com/AvisarBhandari/RAG-Chatbot)**

## 📋 Overview

This is a practice project demonstrating a full-stack chatbot implementation using RAG architecture. The chatbot can understand user queries and provide contextual, accurate responses by retrieving and augmenting information from a knowledge base.

## ✨ Features

- **Interactive Chat Interface** - Clean, intuitive UI with message threading
- **Theme Support** - Toggle between dark and light modes for comfortable viewing
- **RAG Integration** - Leverages retrieval-augmented generation for intelligent responses
- **Real-time Responses** - Streaming chat responses for smooth user experience
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Conversation History** - View and manage previous conversations

## 🛠️ Tech Stack

### Frontend

- **React.js** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Next-generation build tool for fast development
- **Vercel** - Frontend deployment platform

### Backend

- **Python** - Core backend language
- **ChromaDB** - RAG framework for retrieval-augmented generation
- **OpenRouter API** - LLM and embedding model access
- **Render** - Backend deployment platform

### Infrastructure

- **Vercel** - Frontend hosting and deployment
- **Render** - Backend API hosting
- **Environment Variables** - Secure configuration management

## ⚡ Quick Start

Want to get started quickly? Here's the minimal setup:

```bash
# 1. Clone the repository
git clone https://github.com/AvisarBhandari/RAG-Chatbot.git
cd RAG-Chatbot

# 2. Frontend setup
cd frontend
npm install
echo 'VITE_BACKEND_API_URL=http://localhost:5173/' > .env.local
npm run dev

# 3. In a new terminal, Backend setup
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your OpenRouter API key and model names
python app.py
```

Visit `http://localhost:5173` and start chatting! 🚀

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Python 3.8+
- Git

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
echo 'VITE_BACKEND_API_URL=http://localhost:5173/' > .env.local

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Edit .env with your configuration
# Add your OpenRouter API key and model names
nano .env  # or use your preferred editor

# Run the server
python app.py
```

The backend will typically run on `http://localhost:5173/`

**Getting OpenRouter API Key:**

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up and create an account
3. Get your API key from the dashboard
4. Add it to your `.env` file

## 📝 Environment Variables

### Frontend (.env.local)

```
VITE_BACKEND_API_URL=http://localhost:5173/
```

Update `VITE_BACKEND_API_URL` to your deployed backend URL on Render when moving to production.

## 📂 Data Folder

The `data/` folder contains your knowledge base files that the RAG engine uses for retrieval.

**Supported file formats:**

- `.txt` - Plain text documents
- `.pdf` - PDF documents
- `.md` - Markdown files
- `.json` - JSON documents

**How it works:**

1. Add your documents to `data/`
2. The RAG engine processes and embeds them using the embedding model
3. User queries search this indexed data for relevant context
4. Retrieved context is combined with the query to generate responses

**Example setup:**

```
data/
├── new artical_01.txt
├── new artical_02.txt
├── new artical_03.txt
└── new artical_04.txt
```

### Backend (.env)

```
LLM_MODEL=<LLM Model Name>
Embedding_model=<Embedding Model Name>
OPENROUTER_API_KEY=<Your OpenRouter API Key>
```

**Note:** Get your OpenRouter API key from [OpenRouter.ai](https://openrouter.ai/)

**Popular LLM Models on OpenRouter:**

- `openai/gpt-4-turbo` - Most capable, best for complex tasks
- `openai/gpt-3.5-turbo` - Fast and cost-effective
- `anthropic/claude-3-opus` - Excellent reasoning
- `mistral/mistral-7b` - Open-source, fast
- `meta-llama/llama-2-70b-chat` - Open-source, powerful

**Popular Embedding Models:**

- `openai/text-embedding-3-small` - Fast embeddings
- `openai/text-embedding-3-large` - Higher quality
- `nomic-ai/nomic-embed-text-v1.5` - Open-source alternative

Visit [OpenRouter Models](https://openrouter.ai/models) for the complete list and pricing.

## 🎯 Usage

1. **Start the Application**
   - Ensure both frontend and backend servers are running
   - Open `http://localhost:5173` in your browser (default Vite port)

2. **Chat Interface**
   - Type your question in the input field
   - Press Enter or click Send to submit
   - View responses from the RAG chatbot

3. **Theme Switching**
   - Click the theme toggle icon in the top right
   - Preferences persist in local storage

4. **Conversation Management**
   - Start new conversations with "New Chat" button
   - Review previous messages in the current session

## 📦 Project Structure

```
RAG-Chatbot/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.local
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── rag_engine.py
│   ├── utils/
│   ├── requirements.txt
│   ├── .env.example
│   └── .env
├── data/
│      └── [your knowledge base files]
├── vercel.json
└── README.md
```

## 🌐 Deployment

### Frontend (Vercel)

1. **Connect Your Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` directory as root

2. **Set Environment Variables**
   - In Vercel Project Settings → Environment Variables
   - Add: `VITE_BACKEND_API_URL` = Your Render backend URL

3. **Deploy**
   - Vercel automatically deploys on `git push` to main branch
   - View deployment at your Vercel domain

### Backend (Render)

1. **Create Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` directory as root

2. **Configure Build & Start**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python app.py`

3. **Add Environment Variables**
   - In Service Settings → Environment
   - Add all variables from your `.env`:
     - `LLM_MODEL`
     - `Embedding_model`
     - `OPENROUTER_API_KEY`

4. **Deploy**
   - Render automatically deploys on `git push`
   - Copy your Render URL and update frontend `VITE_BACKEND_API_URL`

**Important:** After deploying backend to Render, update the frontend environment variable with the new backend URL and redeploy.

## 🐛 Troubleshooting

### Frontend Issues

**"Cannot find module" errors**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS errors when calling backend**

- Ensure backend is running on `http://localhost:5173/`
- Check `VITE_BACKEND_API_URL` in `.env.local` is correct
- Backend should have CORS headers configured

**Vite port already in use**

```bash
# Run on different port
npm run dev -- --port 3000
```

### Backend Issues

**Python version mismatch**

```bash
# Check Python version (needs 3.8+)
python --version

# Create venv with specific version if needed
python3.10 -m venv venv
```

**OpenRouter API errors**

- Verify `OPENROUTER_API_KEY` is set correctly
- Check API key has available credits
- Ensure model names exist on OpenRouter

**Module not found errors**

```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

**Connection refused on localhost:8000**

- Ensure backend is running: `python app.py`
- Check if port 8000 is already in use
- Try different port in backend config

### Deployment Issues

**Vercel builds failing**

- Check Node.js version in Vercel project settings
- Ensure `VITE_BACKEND_API_URL` environment variable is set
- Check build logs for specific errors

**Render backend errors**

- Verify Python version is set to 3.8+
- Check all environment variables are set
- Monitor Render logs for runtime errors
- Ensure requirements.txt has all dependencies

---

## 🧪 Development & Testing

```bash
# Frontend tests (if configured)
cd frontend
npm run test

# Backend tests (if configured)
cd backend
python -m pytest
```

## 🔌 API Endpoints

The backend exposes the following endpoints for the RAG chatbot:

### Chat Endpoint

```
POST /chat
Content-Type: application/json

Request:
{
  "message": "Your question here",
}

Response:
{
  "type": "context",
  "ids": ["source1.pdf", "source2.txt"]
}{
    "type":"token"
    "condent": "<token>"
}
```

### Health Check

```
GET /health

Response:
{
  "status": "ok",
  "version": "1.0.0"
}
```

### Document Upload (if implemented)

```
POST /api/upload
Content-Type: multipart/form-data

Request:
- File: document to upload (pdf, txt, md, json)

Response:
{
  "success": true,
  "message": "Document uploaded and indexed"
}
```

---

## 📚 How RAG Works

This chatbot uses Retrieval-Augmented Generation to:

1. **Retrieve** - Search knowledge base for relevant documents/context
2. **Augment** - Combine retrieved context with user query
3. **Generate** - Use LLM to produce informed responses

This approach provides:

- ✅ More accurate and contextual responses
- ✅ Reduced hallucinations
- ✅ Custom knowledge integration
- ✅ Transparent source attribution

## 🔒 Security Considerations

- Store sensitive keys in `.env` files (never commit)
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Validate and sanitize user inputs
- Keep dependencies updated

_Last Updated: 2026_
