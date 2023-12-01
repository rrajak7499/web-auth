import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";

// const auth = express.Router();
const prisma = new PrismaClient();

// - middleware used for express
const auth = express();
auth.use(cookieParser());
auth.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
auth.use(express.json());
// auth.use(cookie());

// - Home route data get request
auth.get("/", (req, res) => {
  console.log(req.body);
  res.json("This is auth ts page");
});

// - Login user
auth.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });

  try {
    const userLogin = await prisma.user.findUnique({
      where: { email }
    });

    if (!userLogin) {
      return res.status(401).json({ error: "Invalid email or password" });
    } else {
      const passwordMatch = await bcrypt.compare(password, userLogin.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign(
        { id: userLogin.id } as JwtPayload,
        process.env.SECRET_KEY!,
        { expiresIn: "1h" } // set token expiration time
      );

      await prisma.tokens.create({
        data: {
          user: {
            connect: { id: userLogin.id },
          },
          accessToken: token,
        },
      });

      res.cookie("jwtoken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 10000),
        secure: true,
        sameSite: 'strict'
      })

      res.json({ token: token, message: "User signed in successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// - creating data into register table
auth.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  console.log({ name, email, password, cpassword });

  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all required fields!" });
  }

  try {
    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      return res.status(422).json({ error: "User already exists!" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password not matching!" });
    } else {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const hashedcPassword = await bcrypt.hash(cpassword, saltRounds);

      const userRegister = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          cpassword: hashedcPassword,
        },
      });
      return res.status(201).json({ message: "User registered successfully." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

const authenticate = async (req: req, res: res, next: next) => {
  const token = req.cookies.jwtoken;
  console.log("token", token);
  try {

    if (!token) {
      throw new Error("No token provided");
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY!);

    const rootUser = await prisma.user.findUnique({
      where: {
        id: verifyToken.id
      },
      include: {
        tokens: {
          where: {
            id: verifyToken.id
          }
        }
      }
    });

    console.log(rootUser);

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    next();
  } catch (error) {
    res.status(401).send(error.message);
    console.log(error);
  }
};

// - About route data get request
auth.get("/about", authenticate, (req, res) => {
  console.log(req.body);
  res.json("This is about ts page");
});

auth.get('/getdata', authenticate, (req, res) => {
  res.send(req.rootUser);
});

auth.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});
module.exports = auth;
