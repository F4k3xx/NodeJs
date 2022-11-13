const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ovsxv38.mongodb.net/MyfirstDatabase?retryWrites=true&w=majority`,
    (error) => {
      if (error) {
        return console.log(
          "Ocorreu um erro ao  se conectar ao banco de dados",
          error
        );
      } else {
        console.log("Conexão realizada com sucesso");
      }
    }
  );
};

module.exports = connectToDatabase;
