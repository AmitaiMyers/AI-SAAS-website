import { Configuration, OpenAIApi} from "openai";
import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {increaseApiLimit,checkApiLimit} from "../../../lib/api-limit";

const configuration = new Configuration(
    {
        apiKey: process.env.OPENAI_API_KEY,
    }
);

const openai = new OpenAIApi(configuration);

// const instructionMessage: ChatCompletionRequestMessage = {
//     role: "system",
//     content: "You are a image generator."
// }

export async function POST(
    req: Request
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {prompt, amount = 1, resolution = "512x512"} = body;

        if (!userId) {
            return new NextResponse('Not authenticated', {status: 401});
        }
        if (!configuration.apiKey) {
            return new NextResponse('Not configured', {status: 500});
        }
        if (!prompt) {
            return new NextResponse('Prompt is required', {status: 400});
        }
        if (!amount) {
            return new NextResponse('amount is required', {status: 400});
        }
        if (!resolution) {
            return new NextResponse('resolution is required', {status: 400});
        }
        const freeTrial = await checkApiLimit();
        if(!freeTrial){
            return new NextResponse("Free trial has expired.", {status:403});
        }

        const response = await openai.createImage({
            prompt: prompt,
            n: parseInt(amount,10),
            size:resolution,
        });
        await increaseApiLimit();

        return NextResponse.json(response.data.data);

    } catch (error) {
        console.error("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}