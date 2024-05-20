const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.set('strictQuery' , true)
   await mongoose.connect('mongodb+srv://admin:admin@cluster0.7ez8jka.mongodb.net/news', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect fail");
  }
}

module.exports = { connect };
