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

let firestore = admin.firestore()
// let storage = firebase.storage()
//Get AllUsers
exports.users = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    let {
      page,
      limit,
      email,
      name,
      role
    } = req.query

    limit = parseInt(limit)
    let offset = page * limit
    let totalRecords = await admin.firestore().collection('Users').get()
    let totalRecordsSize = totalRecords.size

    let users = firestore.collection('Users')


    if (email) {
      users = users.where('email', '==', email)
    }

    if (name) {
      users = users.where('name', '==', name)
    }

    if (role) {
      console.log(role)
      users = users.doc('userType').collection
    }

    users.get()
      .limit(limit)
      .offset(offset)
      .then((snapshot) => {
        var AllUsers = []
        snapshot.forEach(doc => {
          var obj = doc.data();
          obj.uid = doc.id
          delete obj.password;
          delete obj.conformpassword
          AllUsers.push(obj);
        })
        return res.send({
          code: 200,
          data: AllUsers,
          totalRecords: totalRecordsSize,
        })
      }).catch(err => {
        console.log("err", err);
        return res.status(500).send(err)
      })
  })
})


//Login User Firebase Auth

exports.loginUser = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    let {
      email,
      password,
    } = req.body
    var user = await firebase.auth().signInWithEmailAndPassword(email, password)

      .catch(e => {
        return res.send({
          code: 422,
          data: e
        })
      })
    var userid = user.user.uid
    var response = await admin.firestore().collection('Users').doc(userid).get()
    return res.send({
      code: 200,
      data: response.data()
    })
  })
})

exports.createUser = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    let {
      name,
      email,
      password,
      userType,
      country,
      phone,
    } = req.body
    admin.auth().createUser({
      email: email,
      password: password
    }).then(userRecord => {
      var userResponse = userRecord.toJSON()
      req.body.uid = userResponse.uid;
      req.body.isActive = true
      req.body.isVerified = false
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
})

//Edit User / Update User 
exports.updateUser = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    let {
      uid
    } = req.body
    let response = await admin.firestore().collection('Users').doc(uid).update(req.body).catch(e => {
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


//get specific user
exports.getSpecificUser = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    let { userId } = req.body
    var response = await admin.firestore().collection('Users').doc(userId).get()
      .catch(err => {
        return res.status(500).send({
          code: 500,
          data: err
        })
      })
    let data
    if (response.data()) {
      data = response.data()
    } else {
      data = {}
    }
    return res.send({
      code: 200,
      data: response.data(),
    })
  })
})


//updateProfileImage
exports.updateProfileImage = functions.https.onRequest(async (req, res) => {
  let {
    uid,
    profileImage
  } = req.body

  console.log(req.body)

})