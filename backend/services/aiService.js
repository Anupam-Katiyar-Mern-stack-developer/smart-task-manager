import ai from "../config/ai";

export const generateAIResponse =async(prompt)=>{
    try{
        const response =await ai.models.generateContent({
            model:process.env.GEMINI_MODEL,
            contents:prompt,
        });
        return response.text;
    }catch(error){
        console.log("Gemini api error",error.message);
        throw new Error("Failed to generate AI response");
    }
}