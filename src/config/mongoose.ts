
import mongoose from "mongoose"
import environment from "../config/environment"

const connect = () => {
    mongoose.connect(environment?.mongodbUrl).then(() => console.log("mongdb connected")).catch((err: any) => console.log(err))

}

export default connect