const path = require("path");

const express = require("express");
const Donya = require("../controllers/DonyaController");

const router = express.Router();
router.post("/form", Donya.getForm);
// Post data to firebase
router.post("/info", Donya.PostCars);
// Get all the Data from firebase
router.post("/Category", Donya.getInformation);
// Get the hose from firebase

// Post into Auth the sign Up
router.get("/SignUp", Donya.postSignUp);
router.post("/mail", Donya.postMail);
router.post("/AllService", Donya.getAllService);
// Delet data with User Id 
//Poster the selected Index
router.post("/Select", Donya.PostName);
router.post('/Delete/:productId', Donya.DeleteCars);
// Get the hose collection 

router.post("/Update", Donya.UpdateCars)
router.get("/index", Donya.getIndex);
router.get("/classefied", Donya.getClassefied);

module.exports = router;