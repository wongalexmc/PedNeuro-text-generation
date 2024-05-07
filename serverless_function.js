// Assuming you're using Node.js and the @google/generative-ai library
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your actual API key and prompt reference (**store securely, not in code**)
const API_KEY = process.env.API_KEY;  // Assuming environment variable for secure storage
const PROMPT_REFERENCE = process.env.PROMPT_REFERENCE;  // Assuming environment variable

async function generateText(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const parts = [
    {
      text: `You are an experienced pediatric neuroradiologist. User input: ${userInput} `,
      // ... rest of your prompt content from the provided code (without variable assignments)
    },
  ];

  const result = await genAI.models.generateContent({
    prompt: PROMPT_REFERENCE,
    contents: [{ role: "user", parts }],
    generationConfig,
  });

  return result.response.text();
}

// This is the handler function that will be called by your serverless provider
exports.handler = async (event) => {
  const userInput = event.body.userInput;
  const generatedText = await generateText(userInput);
  return {
    statusCode: 200,
    body: JSON.stringify({ generatedText }),
  };
};
