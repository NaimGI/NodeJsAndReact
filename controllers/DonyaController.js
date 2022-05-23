const { async } = require("@firebase/util");
const Category = require("../models/Category");
const { getFirestore, collection, onSnapshot, setDoc, addDoc, snapshotEqual, doc, deleteDoc, getDoc } = require('firebase/firestore')
const { getStorage, uploadBytesResumable, getDownloadURL, ref, uploadBytes, uploadString, getBytes, getBlob } = require("firebase/storage");
const { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithRedirect } = require("firebase/auth");

const firebase = require("../db");
//ggsggs

const path = require('path');
const { query } = require("express");
// init service
const db = getFirestore();
//  collection ref
const tab = collection(db, "ClassifiedAdshC");
//Get the hose collection 
const all = collection(db, "ClassifiedAdsSC");
const sub = doc(db, "DataUsers", "adds");

// Post into the authentification the user SignUp data
exports.postSignUp = (req, res, next) => {
  
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...

        }).catch((error) => {

        });

}
exports.postMail = async(req, res, next) => {
   
    const fullname = req.body.fullname;
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);
    createUserWithEmailAndPassword(auth, email, password);
    res.render("shop/index");
}


// Insert the data to the firebase collection
exports.PostCars = async(req, res, next) => {
  

    const typeId = req.body.typeId;
    console.log(typeId);
    const country = req.body.country;
    console.log(country);

    const imag = req.file;
    console.log(imag);

    const title = req.body.title;

    const desc = req.body.desc;
    console.log(desc);

    const name = req.body.name;
    console.log(name);
    const phone = req.body.phone;
    console.log(phone);
    const phoneWhat = req.body.phoneWhat;
    console.log(phoneWhat);
    const location = req.body.location;
    console.log(location);

    //const category = new Category(country, desc, images, isImages, location, name, phone, phoneWhat, time, title, typeId, userid);

    //const imageUploudet = Date.now() + "." + images.originalname.split(".").pop();
    // Format the filename
    const timestamp = Date.now();
    const Name = imag.originalname.split(".")[0];
    const type = imag.originalname.split(".")[1];
    const fileName = `${Name}_${timestamp}.${type}`;
    console.log(fileName);
    var images = "";
    // Start  Upload function in firebase storage 


    const storage = getStorage();
    const storageRef = ref(storage, 'uploads/' + fileName);
    const metadata = {
        contentType: imag.mimetype,
    }

    await uploadBytes(storageRef, imag.buffer, metadata).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            images = downloadURL;
            // THis get the date of now fullyears and months ,days,Time
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var today = new Date();
            var date = monthNames[(today.getMonth() + 1)] + '-' + today.getFullYear() + '-' + today.getDate();
            var tim = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var time = date + 'at' + tim;
            console.log(time);
            // This get the randome String from 28 caractere
            var userid = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i <= 27; i++) {
                userid += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            const status = "1";
            const textEnglish = "";


            console.log(userid);

            var isImages = false;
            if (!images) {
                isImages = false;
            } else {
                isImages = true;
            }
            console.log(isImages);
            console.log(images);

            const category = new Category(country, desc, images, isImages, location, name, phone, phoneWhat, status, textEnglish, time, title, typeId, userid);
            /* const q = query(collection(db, "DataUsers"));
             const querySnapshot = getDoc(q);
             const queryData = querySnapshot.docs.map((detail) => ({
                 ...detail.data(),
                 id: detail.id
             }));*/

           /*const docRef = doc(db, "DataUsers", userid);*/
           /* const colRef = collection(docRef, "adds")*/
            addDoc(collection(db,"adds"), {
                country: category.country,
                desc: category.desc,
                images: category.images,
                isImages: category.isImages,
                location: category.location,
                name: category.name,
                phone: category.phone,
                phoneWhat: category.phoneWhat,
                status: category.status,
                textEnglish: category.textEnglish,
                time: category.time,
                title: category.title,
                typeId: category.typeId,
                userid: category.userid
            });



            res.redirect('Classefied');







        });


    });

}




// Functio Get the Cars with check
exports.getInformation = async(req, res, next) => {
  
        const type = req.body.type;
        console.log(type);
        // collection the data 
        await onSnapshot(all, (snapshot) => {

            const info = [];
            snapshot.docs.forEach((doc) => {
                info.push({...doc.data(), id: doc.id });

            });
            console.log(info);


            res.render('shop/Category', { info: info, type: type });

        });
    }
    // Get all information in one service
exports.getAllService = async(req, res, next) => {
   
    const nameS = req.body.n;
    console.log(nameS);
    const S = nameS.trim();
    const ser = collection(db, "adds");
    await onSnapshot(ser, (snapshot) => {
        const service = [];
        snapshot.docs.forEach((doc) => {
            service.push({...doc.data(), id: doc.id, nameS: S });

        });
        console.log(service);
        res.render('shop/Allservice', { service: service });

    });
}



// Function To delete User
exports.DeleteCars = async(req, res, next) => {

        const prodId = req.params.productId;
        console.log(prodId);
        ColRef = doc(tab, prodId);
        deleteDoc(ColRef).then(() => {

        });

    }
    // Update the cars
exports.UpdateCars = async(req, res, next) => {

}

exports.getIndex = (req, res, next) => {
    res.render('shop/index');

}
exports.getClassefied = async(req, res, next) => {

    await onSnapshot(tab, (snapshot) => {

        const test = [];
        snapshot.docs.forEach((doc) => {
            test.push({...doc.data(), id: doc.id });

        });



        res.render('shop/Classefied', { test: test });

    });


}
exports.PostName = async(req, res, next) => {
    const select = req.body.select;
    console.log(select);

    onSnapshot(all, (snapshot) => {
        const Real = [];
        snapshot.docs.forEach((doc) => {
            Real.push({...doc.data(), id: doc.id, select: select });
        });
        res.render('shop/Adds', { test: test, Real: Real });
    });


}

exports.getForm = async(req, res, next) => {

    const select = req.body.category;
    console.log(select);

 await onSnapshot(all, (snapshot) => {
        const Real = [];
        snapshot.docs.forEach((doc) => {
            Real.push({...doc.data(), id: doc.id });
        });
        res.render('shop/Adds', { Real: Real, select: select });
    });




}