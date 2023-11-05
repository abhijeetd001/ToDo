require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect")

const PORT = process.env.PORT || 5000;
const auth_routes = require("./routes/SignUpRoute") 
const todotask_routes = require("./routes/ToDoTaskRoute") 
const goldcoins_routes = require("./routes/GoldCoinsRoute")
const staffright_routes = require("./routes/StaffRightRoute")  


app.use(express.json());

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log("connected to PORT ===========>>>>>>>>>", `${PORT}`)
        });
    } catch (error) {
        console.log(error);
    }
}
start();

app.use(auth_routes);
app.use(todotask_routes);
app.use(goldcoins_routes);
app.use(staffright_routes);