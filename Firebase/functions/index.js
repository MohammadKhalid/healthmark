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

//Get AllUsers
exports.users = functions.https.onRequest((req, res) => {
  admin.firestore().collection('Users').get()
    .then((snapshot) => {
      var AllUsers = []
      snapshot.forEach(doc => {
        var obj = doc.data();
        obj.id = doc.id
        AllUsers.push(obj);
      })
      return res.send(AllUsers)
    }).catch(err => {
      console.log("err", err);
      return res.status(500).send(err)
    })
})


//Login User Firebase Auth

exports.loginUser = functions.https.onRequest((req, res) => {
  let {
    email,
    password,
  } = req.body
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((signedinUser) => {
      var userid = signedinUser.user.uid;
      admin.firestore().collection('Users').doc(userid).get()
        .then((snapshot) => {
          return res.send(snapshot.data());
        })
    }).catch(e => {
      return res.send({ error: e })
    })
})


exports.createUser = functions.https.onRequest((req, res) => {
  let {
    name,
    email,
    password,
    userType,
    phone,
  } = req.body
  admin.auth().createUser({
    email: email,
    password: password
  }).then(userRecord => {
    var userResponse = userRecord.toJSON()
    req.body.uid = userResponse.uid;
    var response = admin.firestore().collection('Users').doc(userResponse.uid).set(req.body)
    return res.send({
      code: 200,
      data: userResponse
    });

  }).catch(e => {
    return res.send({
      data: e,
      code: 422
    });
  })

})

//Edit User / Update User 
exports.updateUser = functions.https.onRequest(async (req, res) => {
  let {
    uid
  } = req.body
  let response = await admin.firestore().collection('Users').doc(uid).update({
    name: "QQQQQQ"
  }).catch(e => {
    return res.send(e)
  })
  return res.send(response)

})









// //Add User 
// exports.addUser = functions.https.onRequest(async (req, res) => {
//   let {
//     name,
//     email,
//     password,
//     userType,
//     phone,
//   } = req.body
//   var response = await admin.firestore().collection('Users').add(req.body)
//   res.json({ response })
// })


