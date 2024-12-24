import express from 'express'
import connect from './config/mongoose'
import router from './routes/v1'
import cors from 'cors'
import environment from './config/environment'


const app = express()

connect()

app.use(express.json())

// app.use(cors({
//     origin: '*'
// }));


// FOR LIVE SERVER
app.use(cors());


app.use('/v1', router)

app.listen(8000, () => {
    console.log("server is running at port 8000");

})

export default app