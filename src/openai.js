import axios from "axios";

const generateContent = async (prompt) => {
  const apiKey = import.meta.env.PUBLIC_OPENAI_API_KEY;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const text = response.data.choices[0].message.content;

  const primerPunto = text.indexOf(".");
  const textComplete = text.substring(
    0,
    primerPunto !== -1 ? primerPunto + 1 : text.length
  );

  return textComplete;
};

export default generateContent;
