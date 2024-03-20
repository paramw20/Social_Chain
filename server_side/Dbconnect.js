const mongoose = require("mongoose");
module.exports = async () => {
  await mongoose
    .connect(
      "mongodb+srv://112115125:sJAlNjs92AaysQS1@cluster0.nrko4tr.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log(e);
    });
};
