
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const chatWithAI = async (req, res) => {
    try {
        const message = req.body.message || "";

        let history = [];

        try {
            history = req.body.history
                ? JSON.parse(req.body.history)
                : [];
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid conversation history.",
            });
        }
        const image = req.file;

        if ((!message || !message.trim()) && !image) {
            return res.status(400).json({
                success: false,
                message: "Please enter a message or upload an image.",
            });
        }

        if (message && message.length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Message must be under 2000 characters.",
            });
        }

        if (!Array.isArray(history) || history.length > 20) {
            return res.status(400).json({
                success: false,
                message: "Invalid conversation history.",
            });
        }

        const systemPrompt = `
You are an Intelligent Farming Assistant.

Help farmers with:
- Crop diseases and symptoms
- Disease prevention and treatment
- Fertilizers and nutrients
- Irrigation techniques
- Soil health
- Weather-related farming advice
- Crop protection

When a farmer uploads an image:
- Describe the visible crop and leaf symptoms.
- Suggest possible diseases, not guaranteed diagnoses.
- Explain possible causes.
- Recommend preventive measures.
- Suggest safe next steps.
- Ask for more information if the image is unclear.

Never claim certainty from an image alone.
Never recommend unsafe pesticide usage.
Recommend consulting a local agricultural expert
before serious pesticide or treatment decisions.

Give practical, simple answers.
`;

        const messages = [
            {
                role: "system",
                content: systemPrompt,
            },

            ...history
                .filter(
                    (item) =>
                        ["user", "assistant"].includes(item.role) &&
                        typeof item.content === "string"
                )
                .map((item) => ({
                    role: item.role,
                    content: item.content,
                })),
        ];

        const userContent = [];

        if (message && message.trim()) {
            userContent.push({
                type: "text",
                text: message.trim(),
            });
        } else {
            userContent.push({
                type: "text",
                text: "Analyze this crop image and describe the visible symptoms.",
            });
        }

        // Add uploaded image if available
        let model = "openai/gpt-oss-120b";

        if (image) {
            const base64Image = image.buffer.toString("base64");
            const imageData = `data:${image.mimetype};base64,${base64Image}`;

            userContent.push({
                type: "image_url",
                image_url: {
                    url: imageData,
                },
            });

            model = "qwen/qwen3.8-27b";
        }

        messages.push({
            role: "user",
            content: image ? userContent : message.trim(),
        });

        const completion = await groq.chat.completions.create({
            model,
            messages,
            temperature: 0.5,
            max_completion_tokens: 1024,
        });

        const reply = completion.choices[0]?.message?.content;

        if (!reply) {
            throw new Error("Groq returned an empty response.");
        }

        return res.status(200).json({
            success: true,
            reply,
        });

    } catch (error) {
        console.error("Groq API Error:", {
            status: error.status,
            message: error.message,
        });

        return res.status(error.status === 429 ? 429 : 500).json({
            success: false,
            message:
                error.status === 429
                    ? "AI request limit reached. Please try again later."
                    : "Unable to generate an AI response.",
        });
    }
};

module.exports = { chatWithAI };
