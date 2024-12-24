import dotenv from "dotenv"

dotenv.config()


const environment: any = {
    jwtSecret: process.env.JWT_SECRET || 'anythingiwantochange',
    saltRound: process.env.SALT_ROUND || 10,
    chatgptkey: process.env.CHAT_GPT,
    secretkeygpt:process.env.SECRET_KEY_GPT || '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'
}

export default environment