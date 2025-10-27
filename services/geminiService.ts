import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface Recipe {
    recipe_name: string;
    description: string;
    ingredients: { item: string; amount: string; }[];
    instructions: string[];
    youtube_url: string;
}

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        recipe_name: {
            type: Type.STRING,
            description: "A creative and appealing name for the dish in Korean."
        },
        description: {
            type: Type.STRING,
            description: "A short, enticing description of the dish in Korean (within 2-3 sentences)."
        },
        ingredients: {
            type: Type.ARRAY,
            description: "A list of all ingredients needed for the recipe.",
            items: {
                type: Type.OBJECT,
                properties: {
                    item: {
                        type: Type.STRING,
                        description: "The name of the ingredient in Korean."
                    },
                    amount: {
                        type: Type.STRING,
                        description: "The quantity or measurement of the ingredient in Korean (e.g., '1개', '200g', '3큰술')."
                    }
                },
                required: ["item", "amount"]
            }
        },
        instructions: {
            type: Type.ARRAY,
            description: "Step-by-step cooking instructions in Korean.",
            items: {
                type: Type.STRING
            }
        },
        youtube_url: {
            type: Type.STRING,
            description: "A relevant YouTube URL for a video tutorial of a similar recipe. The URL must be a valid and publicly accessible YouTube link."
        }
    },
    required: ["recipe_name", "description", "ingredients", "instructions", "youtube_url"]
};

export async function createRecipe(ingredientsText: string): Promise<Recipe> {
    const model = 'gemini-2.5-flash';
    const systemInstruction = "You are a creative and helpful chef. Your task is to create a delicious and easy-to-follow recipe in Korean based on the ingredients provided by the user. You must also find a relevant YouTube video link for the recipe. The recipe must be well-structured and sound appetizing.";
    const userPrompt = `I have the following ingredients: ${ingredientsText}. Please create a unique recipe using them. Feel free to add 1-3 common pantry staples if needed. Also, find a suitable YouTube video link that shows how to cook a similar dish. Provide the output in a structured JSON format.`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText) as Recipe;
        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("레시피를 생성하는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
}