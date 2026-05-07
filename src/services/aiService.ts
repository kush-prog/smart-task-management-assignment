import Groq from "groq-sdk";


const getClient = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ API KEY is not defined");
  }
  return new Groq({ apiKey });
};

// Suggest task based on the description of the task
export const suggestPriority = async (description: string) => {
  const groq = getClient();
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are a task management assistant. You respond ONLY in valid JSON with no markdown fences.',
      },
      {
        role: 'user',
        content: `Based on this task description, suggest a priority level (low, medium, or high) and explain your reasoning in 1-2 sentences.
Task Description: ${description}
Respond in this exact JSON format:
{"suggestedPriority": "low or medium or high", "reasoning": "your explanation here"}`,
      },
    ],
    temperature: 0.3,
  });

  const text = response.choices[0]?.message?.content || '';

  try {
    return JSON.parse(text);
  } catch {
    return { suggestPriority: 'medium', reasoning: text };
  }
};


export const generateTaskSummary = async (description: string) => {
  const groq = getClient();

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are a task management assistant. You respond ONLY in valid JSON with no markdown fences.',
      },
      {
        role: 'user',
        content: `Based on this task description, generate a short and concise summary (1-2 sentences max) that captures the key objective of the task.
Task Description: ${description}
Respond in this exact JSON format:
{"summary": "your short summary here"}`,
      },
    ],
    temperature: 0.3,
  });

  const text = response.choices[0]?.message?.content || "";

  try {
    return JSON.parse(text);
  } catch {
    return { summary: text };
  }
} 
