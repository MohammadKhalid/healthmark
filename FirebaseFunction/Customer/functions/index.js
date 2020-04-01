const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testproject-98a49.firebaseio.com"
});

exports.getAllCustomer = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        var page = req.query.page;
        var limit = parseInt(req.query.limit);
        var offset = page * limit
        var size = 0;
        var response = await admin.firestore().collection('Customer').get()
        size = response.size
        admin.firestore().collection('Customer').limit(limit).offset(offset).get()
            .then((snapshot) => {
                var AllCustomer = []
                snapshot.forEach((doc) => {
                    var obj = doc.data();
                    obj.id = doc.id;
                    AllCustomer.push(obj);
                })
                return res.send({
                    code: 200,
                    data: AllCustomer,
                    count: size
                })
            }).catch(err => {
                console.log("err", err);
                return res.send({
                    code: 500,
                    data: err
                })
            })
    })

})

exports.createCustomer = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        req.body.createAt = new Date();
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
})



exports.updateCustomer = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        let {
            id
        } = req.body
        let response = await admin.firestore().collection('Customer').doc(id).update(req.body).catch(e => {
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

})