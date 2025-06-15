import { aiService } from "../services/ai.service.js";

export const aiControl = async (req, res) => {
  const prompt = req.body.code;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  const response = await aiService(prompt);
  res.send(response);
};
