class Category {
    constructor(country, desc, images, isImages, location, name, phone, phoneWhat, status, textEnglish, time, title, typeId, userid) {
            this.country = country;
            this.desc = desc;
            this.images = images;
            this.isImages = isImages;
            this.location = location;
            this.name = name;
            this.phone = phone;
            this.phoneWhat = phoneWhat;
            this.status = status;
            this.textEnglish = textEnglish;
            this.time = time;
            this.title = title;
            this.typeId = typeId;
            this.userid = userid;
        }
        // Firestore data converter
    save() {
        const { getFirestore, collection, getDocs, setDoc, addDoc, snapshotEqual } = require('firebase/firestore');
        const firebase = require("../db");


        // init service
        const db = getFirestore();
        //  collection ref
        const tab = collection(db, "cars");
    }




}
module.exports = Category;