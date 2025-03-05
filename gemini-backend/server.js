require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/generate', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = req.body.prompt;
        const result = await model.generateContent(prompt);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Error generating content' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

console.log("API Key:", process.env.API_KEY);