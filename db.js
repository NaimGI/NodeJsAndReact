const { initializeApp } = require('firebase/app');

const config = require("./config");


const db = initializeApp({...config.firebaseConfig, projectId: process.env.projectId, storageBucket: process.env.storageBucket, apiKey: process.env.apiKey, authDomain: process.env.authDomain });
module.exports = db;