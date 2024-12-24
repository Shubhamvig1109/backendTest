import dotenv from "dotenv"

dotenv.config()

const environment: any = {
    jwtSecret: process.env.JWT_SECRET,
    saltRound: process.env.SALT_ROUND || 10,
    chatgptkey: process.env.CHAT_GPT,
    secretkeygpt: process.env.SECRET_KEY_GPT,
    mongodbUrl: process.env.MONGODB_URL
}

export default environment