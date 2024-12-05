# AI Chatbot LLM [Watch the app in action](https://drive.google.com/file/d/1T3wNQchCT1pRW6UjPe9kpM4lxl6Glxae/view?usp=sharing)

## Project Overview

An advanced AI chatbot built with Next.js, leveraging Hugging Face's Qwen/QwQ-32B-Preview model, featuring dynamic UI interactions, state management, and adaptive response generation.

## Key Features

- **Advanced AI Interaction**
  - Powered by Qwen/QwQ-32B-Preview large language model
  - Configurable response creativity levels
  - Support for long, short, and medium-length responses

- **Responsive UI Design**
  - Built with Tailwind CSS
  - Light and dark mode support
  - Smooth animations via Framer Motion

- **Flexible Configuration**
  - Model creativity settings
  - Response length customization
  - Intuitive settings panel

## Tech Stack

- **Frontend**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: Tanstack Query
- **Animations**: Framer Motion
- **Language**: TypeScript
- **AI Model**: Hugging Face Qwen/QwQ-32B-Preview


## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-chatbot-llm.git
cd ai-chatbot-llm
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the project root
```bash
HUGGINGFACE_API_TOKEN=your_huggingface_api_token
```

## Running the Project

Development Mode:
```bash
npm run dev
# or
yarn dev
```

Production Build:
```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Project Structure

```
/src
├── components/       # Reusable React components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── types/            # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [Your Email]

Project Link: [https://github.com/yourusername/ai-chatbot-llm](https://github.com/yourusername/ai-chatbot-llm)
