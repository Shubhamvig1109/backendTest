
import mongoose from "mongoose"

const connect = () => {
    mongoose.connect('mongodb+srv://shubhamvig:8OJbV2yjpvVYtcaP@cluster0.0vqoahc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("mongdb connected")).catch((err: any) => console.log(err))

}

export default connect