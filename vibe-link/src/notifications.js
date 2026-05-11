import {
  getToken,
} from "firebase/messaging";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  auth,
  db,
  messaging,
} from "./firebase/firebase";

export const requestNotificationPermission =
  async () => {

    try {

      const permission =
        await Notification.requestPermission();

      if (
        permission !==
        "granted"
      ) {

        console.log("REQUESTING TOKEN");
        console.log(
          "Notification permission denied"
        );

        return;

      }

      console.log("REQUESTING TOKEN");
      const token =
        await getToken(
          messaging,
          {
            vapidKey:
              "BP3jFnL0JPPOab773RnvPMs7ONltS9vmctEmBt5Y9NZQ4tP5u3dvBSy89vi6cRnhz524lnChu5YNOEKSy2bmaDY",
          }
        );

      console.log(
        "FCM TOKEN:",
        token
      );

      const user =
        auth.currentUser;

      if (
        user
      ) {

        await updateDoc(
          doc(
            db,
            "users",
            user.uid
          ),
          {
            fcmToken:
              token,
          }
        );

      }

    } catch (error) {

      console.log(
        error
      );

    }

  };