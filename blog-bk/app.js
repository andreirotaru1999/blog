const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const articleRouter = require('./article/article.controller');
const commentRouter = require('./comment/comment.controller');
const authRouter = require('./authentication/authentication.controller');
const db = require("./db");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(express.json()) 
app.use('/articles', articleRouter);
app.use('/articles', commentRouter);
app.use('/user', authRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

