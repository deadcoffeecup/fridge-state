const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//http request method
exports.sendHttpPushNotification = functions.https.onRequest((req, res) => {
  const userId = req.body.userId; //get params like this

  //listener method
  exports.sendListenerPushNotification = functions.database
    .ref('/sendMessage/{userId}/')
    .onWrite((data, context) => {
      const userId = context.params.userId;
    });
});
