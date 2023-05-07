import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    
    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: params.id,
        }).populate('creator'); // get prompts by creator id
        
        
        return new Response(JSON.stringify(prompts), { status: 200 })
        console.log("New prompt created successfully");
    } catch (error) {
        return new Response("Failed to fetch your prompts", { status: 500 });
    }
}