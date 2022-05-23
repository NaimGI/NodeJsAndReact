const path = require('path');

const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require("./config");
const app = express();
const multer = require('multer');




/*const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Image');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
})*/
app.set('view engine', 'ejs');
app.set('views', 'views');



const DonyaRoutes = require('./routes/Donya');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().single('filefile'));
app.use(express.static(path.join(__dirname, 'public')));


app.use("/Donya", DonyaRoutes);




app.listen(3000);