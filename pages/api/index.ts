//  Packages imports 
import express from 'express'
import cookieParser from 'cookie-parser';
// import cookieParser from "cookie-parser"
import cors from 'cors';


// - initilaizations and requries
const app = express()
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    // accessControlAllowOrigin: true,
    credentials: true,
  }));
app.use(express.json())
// app.use(cookieParser());
// app.use(bodyParser.json())
const port = 8080

// - middle ware used for express
app.use(express.json())

// - Importing other files which consits of API's
app.use(require('./routes/auth'))



// - Port checking running or not
app.listen(port, ()=>{
    console.log(`port running ${port}`)
})
