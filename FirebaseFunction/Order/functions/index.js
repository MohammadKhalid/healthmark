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

exports.addOrder = functions.https.onRequest(async (req, res) => {
    var response = await admin.firestore().collection('Order').doc().set(req.body).catch(e => {
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


exports.getAllOrders = functions.https.onRequest(async (req, res) => {

    let {
        page,
        limit,
        orderNumber,
        date
    } = req.query

    limit = parseInt(limit)
    let offset = page * limit
    let totalRecords = await admin.firestore().collection('Order').get()
    let totalRecordsSize = totalRecords.size
    let ordersData = admin.firestore().collection('Order')
    .limit(limit)
    .offset(offset)

    if (orderNumber) {
        console.log("order number", orderNumber)
        ordersData = ordersData.where('orderNumber', "==", orderNumber)
    }
    if (date) {
        console.log("in date", date)
        ordersData = ordersData.where('date', "==", date)
    }

    ordersData.get()
        .then((snapshot) => {

            var AllOrders = []
            snapshot.forEach(doc => {
                var obj = doc.data();
                obj.orderId = doc.id
                AllOrders.push(obj);
            })
            return res.send({
                code: 200,
                totalRecords: totalRecordsSize,
                data: AllOrders
            })
        }).catch(err => {
            console.log("err", err);
            return res.send({
                code: 500,
                data: err
            })
        })

})

// exports.updateInventory = functions.https.onRequest(async (req, res) => {
//     let {
//         productId
//     } = req.body
//     let response = await admin.firestore().collection('Inventory').doc(productId).update(req.body).catch(e => {
//         return res.send({
//             code: 500,
//             data: e
//         })
//     })
//     return res.send({
//         code: 200,
//         data: response
//     })

// })

// exports.deleteInventory = functions.https.onRequest(async (req, res) => {
//     let {
//         productId
//     } = req.body
//     let response = await admin.firestore().collection('Inventory').doc(productId).update(req.body).catch(e => {
//         return res.send({
//             code: 500,
//             data: e
//         })
//     })
//     return res.send({
//         code: 200,
//         data: response
//     })

// })
