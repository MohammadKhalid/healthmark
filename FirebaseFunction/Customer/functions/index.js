const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testproject-98a49.firebaseio.com"
});

exports.getAllCustomer = functions.https.onRequest((req, res) => {
    admin.firestore().collection('Customer').get()
        .then((snapshot) => {
            var AllCustomer = []
            snapshot.forEach(doc => {
                var obj = doc.data();
                obj.id = doc.id
                AllCustomer.push(obj);
            })
            return res.send({
                code: 200,
                data: AllCustomer
            })
        }).catch(err => {
            console.log("err", err);
            return res.send({
                code: 500,
                data: err
            })
        })

})

exports.createCustomer = functions.https.onRequest(async (req, res) => {
    var response = await admin.firestore().collection('Customer').doc().set(req.body).catch(e => {
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