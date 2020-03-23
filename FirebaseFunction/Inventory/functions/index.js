const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const cors = require('cors')({ origin: true });
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testproject-98a49.firebaseio.com"
});
var firebaseConfig = {
    apiKey: "AIzaSyA0WoNtjh1AYIRH_xihfClyWpaaI3_C7tY",
    authDomain: "testproject-98a49.firebaseapp.com",
    databaseURL: "https://testproject-98a49.firebaseio.com",
    projectId: "testproject-98a49",
    storageBucket: "testproject-98a49.appspot.com",
    messagingSenderId: "503055409682",
    appId: "1:503055409682:web:a29ad6add66d58d8ef6ecb",
    measurementId: "G-09JE9386Y7"
}
firebase.initializeApp(firebaseConfig);

exports.createInventory = functions.https.onRequest(async (req, res) => {
    var response = await admin.firestore().collection('Inventory').doc().set(req.body).catch(e => {
        return res.send({
            code: 500,
            data: e
        })
    })
    return res.send({
        code: 200,
        data: response
    })
})


exports.getAllInventory = functions.https.onRequest((req, res) => {
   
    admin.firestore().collection('Inventory').get()
        .then((snapshot) => {
            var AllInventory = []
            snapshot.forEach(doc => {
                var obj = doc.data();
                obj.productId = doc.id
                AllInventory.push(obj);
            })
            return res.send({
                code: 200,
                data: AllInventory
            })
        }).catch(err => {
            console.log("err", err);
            return res.send({
                code: 500,
                data: err
            })
        })

})

exports.updateInventory = functions.https.onRequest(async (req, res) => {
    let {
        productId
    } = req.body
    let response = await admin.firestore().collection('Inventory').doc(productId).update(req.body).catch(e => {
        return res.send({
            code: 500,
            data: e
        })
    })
    return res.send({
        code: 200,
        data: response
    })

})

exports.deleteInventory = functions.https.onRequest(async (req, res) => {
    let {
        productId
    } = req.body
    let response = await admin.firestore().collection('Inventory').doc(productId).update(req.body).catch(e => {
        return res.send({
            code: 500,
            data: e
        })
    })
    return res.send({
        code: 200,
        data: response
    })

})
