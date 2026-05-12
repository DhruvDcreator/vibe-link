const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.sendMessageNotification =
functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snap) => {

    const messageData =
      snap.data();

    const receiverId =
      messageData.receiverId;

    const senderName =
      messageData.senderName;

    const text =
      messageData.text;

    const userDoc =
      await admin
        .firestore()
        .collection("users")
        .doc(receiverId)
        .get();

    if (
      !userDoc.exists
    ) {

      return null;

    }

    const fcmToken =
      userDoc.data()
        .fcmToken;

    if (
      !fcmToken
    ) {

      return null;

    }

    const payload = {

      notification: {

        title:
          "New vibe message ✨",

        body:
          `${senderName}: ${text}`,

      },

      token:
        fcmToken,

    };

    return admin
      .messaging()
      .send(payload);

  });