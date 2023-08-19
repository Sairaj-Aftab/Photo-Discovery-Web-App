import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB);
    console.log(`Mongoose is running`.bgCyan);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
