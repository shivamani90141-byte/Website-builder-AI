import mongoose from "mongoose";

/**
 * Connects Mongoose to the MongoDB instance configured by MONGODB_URI.
 *
 * @returns {Promise<void>} Resolves after the database connection is established.
 */
export async function connectToDatabase(){
    mongoose.connection.on('connected',()=>{
      console.log("Successfully connected to MongoDB.")
    })
    await mongoose.connect(process.env.MONGODB_URI)
}
