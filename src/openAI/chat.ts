import OpenAI from "openai";
import environment from "../config/environment";

const openai = new OpenAI({ apiKey: environment.secretkeygpt })


const chatGpt = async () => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
        });

        console.log(completion);

        console.log(completion.choices[0]);

    } catch (err: any) {
        console.log(err);

    }

}


export default chatGpt