const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    apiKe,
    authDomai,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
} = process.env;
assert(PORT, "port is require");
assert(HOST, "Host is require");
const firebaseConfig = {
    apiKey: apiKe,
    authDomain: authDomai,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};