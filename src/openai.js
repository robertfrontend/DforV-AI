import axios from "axios";

const generateContent = async (prompt) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const response = await axios.post(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    {
      prompt: prompt,
      max_tokens: 100, // Ajusta según tus necesidades
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const texto = response.data.choices[0].text;

  const primerPunto = texto.indexOf(".");
  const oracion = texto.substring(
    0,
    primerPunto !== -1 ? primerPunto + 1 : texto.length
  );

  return oracion;
};

export default generateContent;
