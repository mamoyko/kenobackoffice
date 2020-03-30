import mongoose from "mongoose"
import express from 'express'
import app from "./server/config/express"
import path  from 'path';

//connecting to mongodb

let mongoConnect = `${process.env.MONGODB_URI}`;
mongoConnect = mongoConnect.trim();

console.log(mongoConnect)

mongoose.connect(mongoConnect, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on('open', () => {
    console.log("mongodb connection open");
});

mongoose.connection.on('error', (err) => {
    console.log(`Error: ${err}`)
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
    console.info(`server started on port 5000`);
});