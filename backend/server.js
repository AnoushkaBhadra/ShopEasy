const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const axios = require("axios");

const USERS_DB = "http://localhost:3000/users";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "shop_easy_secret";

console.log("LOGIN REQUEST RECEIVED");

//ENDPOINTS

app.post("/auth/register", async(req, res) => {
    const {email, password, name} = req.body;

    const existing = await axios.get(`${USERS_DB}?email=${email}`);

    if(existing.data.length > 0) {
        return res.status(409).json({message: "User already exists"});
    }


    const hashedPassword = await bcrypt.hash(password,10);


    const user = {
        id: Date.now(), 
        email, 
        name, 
        password:hashedPassword
    };

    await axios.post(USERS_DB, user);

    res.status(201).json({ message: "User created" });
});

//JWT GENERATION

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const result = await axios.get(`${USERS_DB}?email=${email}`);
    const user = result.data[0];

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    //if user is valid then token is generated
    const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: "3h" } //token expires in 3 hours (temp)
    );

    res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name }
    });
});


//MIDDLEWARE

function authMiddleware(req, res, next){
    const header = req.headers.authorization;

    if(!header) return res.status(401).json({message:" No token found"});

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; 
        next();

    }
    catch(error){
        res.status(401).json({message: "Invalid Token"});
    }
}

//PROTECTED ROUTE

app.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Protected data", user: req.user });
});

app.listen(5000, () => {
    console.log("Auth server running on http://localhost:5000");
});
