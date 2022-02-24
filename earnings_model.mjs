// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const earningSchema = mongoose.Schema({
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    hours: { type: Number, required: true },
    date: { type: String, required: true }

});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Earning = mongoose.model("Earning", earningSchema);

/**
 * Create a exercise
 * @param {String} source 
 * @param {Number} amount
 * @param {Number} hours   
 * @param {String} date 
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
 const createEarning = async (source, amount, hours, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const earning = new Earning({ source: source, amount: amount, hours: hours, date: date });
    // Call save to persist this object as a document in MongoDB
    return earning.save();
}


/**
 * Retrive exercises based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
 const findEarnings = async (filter, projection, limit) => {
    const query = Earning.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Find the exercise with the given ID value
 * @param {String} _id
 * @returns
 */
const findEarningById = async (_id) => {
    const query = Earning.findById(_id);
    return query.exec();
}

/**
 * Replace the title, year, language properties of the Exercise with the id value provided
 * @param {String} _id 
 * @param {String} source 
 * @param {Number} amount
 * @param {Number} hours  
 * @param {String} date 
 * @returns A promise. Resolves to the number of documents modified
 */
 const editEarning = async (_id, source, amount, hours, date) => {
    const result = await Earning.replaceOne({ _id: _id },
        { source: source, amount: amount, hours: hours, date: date });
    return result.nModified;
}


/**
 * Delete the Exercise with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Earning.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}



export { createEarning, findEarnings, editEarning, deleteById, findEarningById };