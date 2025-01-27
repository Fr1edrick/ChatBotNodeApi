import mongoose from "mongoose";

const connectionFactory = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(
            "mongodb://fvaquiro:i5VMT2x6Gfd6V0c7@127.0.0.1:27017/",
            {}
        );
    } catch (error) {
        console.log("Conexión fallida ==>", error);
    }
};

export default connectionFactory;