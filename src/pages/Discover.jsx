/*
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  auth,
  db,
} from "../firebase/firebase";

import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";

export default function Discover({

  userData,

  setCurrentTab,

  setSelectedChatUser,

}) {

  const [
    users,
    setUsers,
  ] = useState([]);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    connectedIds,
    setConnectedIds,
  ] = useState([]);

  useEffect(() => {

    const fetchUsers =
      async () => {

        try {

          const connectionSnapshot =
            await getDocs(
              collection(
                db,
                "connections"
              )
            );

          const existingConnections =
            [];

          connectionSnapshot.forEach(
            (docItem) => {

              const data =
                docItem.data();

              if (
                data.users.includes(
                  auth.currentUser.uid
                )
              ) {

                const otherUser =
                  data.users.find(
                    (id) =>
                      id !==
                      auth.currentUser.uid
                  );

                if (
                  otherUser
                ) {

                  existingConnections.push(
                    otherUser
                  );

                }

              }

            }
          );

          setConnectedIds(
            existingConnections
          );

          const snapshot =
            await getDocs(
              collection(
                db,
                "users"
              )
            );

          const allUsers =
            [];

          snapshot.forEach(
            (docItem) => {

              if (
                docItem.id !==
                  auth.currentUser.uid &&

                !existingConnections.includes(
                  docItem.id
                )
              ) {

                allUsers.push({
                  id:
                    docItem.id,

                  ...docItem.data(),
                });

              }

            }
          );

          const shuffledUsers =
            allUsers.sort(
              () =>
                Math.random() -
                0.5
            );

          setUsers(
            shuffledUsers
          );

        } catch (error) {

          console.log(
            error
          );

        } finally {

          setLoading(
            false
          );

        }

      };

    fetchUsers();

  }, []);

  const calculateCompatibility =
  (userVibes = []) => {

    const myVibes = Object.values(
      userData.vibes || {}
    ).flat();

    if (
      myVibes.length === 0
    ) {
      return 0;
    }

    const shared =
      userVibes.filter(
        (vibe) =>
          myVibes.includes(vibe)
      ).length;

    return Math.round(
      (shared / myVibes.length) * 100
    );

};

  const matchedUsers =
    useMemo(() => {

      return users
        .filter(
          (user) => {

            if (
              !user.vibes
            ) {

              return false;

            }

            const ageDifference =
              Math.abs(
                Number(
                  user.age
                ) -
                Number(
                  userData.age
                )
              );

            return (
              calculateCompatibility(
                user.vibes
              ) >= 20 &&
              ageDifference <=
                12
            );

          }
        )

        .sort(
          (a, b) =>
            calculateCompatibility(
              b.vibes
            ) -
            calculateCompatibility(
              a.vibes
            )
        );

    }, [users]);

  const currentUser =
    matchedUsers[
      currentIndex %
        matchedUsers.length
    ];

  const connectUser =
    async () => {

      try {

        const connectionSnapshot =
          await getDocs(
            collection(
              db,
              "connections"
            )
          );

        let alreadyConnected =
          false;

        connectionSnapshot.forEach(
          (docItem) => {

            const data =
              docItem.data();

            if (

              data.users.includes(
                auth.currentUser.uid
              ) &&

              data.users.includes(
                currentUser.id
              )

            ) {

              alreadyConnected =
                true;

            }

          }
        );

        if (
          alreadyConnected
        ) {

          setSelectedChatUser(
            currentUser
          );

          setCurrentTab(
            "chatRoom"
          );

          return;

        }

        await addDoc(
          collection(
            db,
            "connections"
          ),
          {
            users: [

              auth.currentUser.uid,

              currentUser.id,

            ],

            createdAt:
              serverTimestamp(),
          }
        );

        setConnectedIds(
          (prev) => [
            ...prev,
            currentUser.id,
          ]
        );

        setUsers(
          (prev) =>
            prev.filter(
              (user) =>
                user.id !==
                currentUser.id
            )
        );

        setSelectedChatUser(
          currentUser
        );

        setCurrentTab(
          "chatRoom"
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };

  const nextUser =
    () => {

      if (
        matchedUsers.length <=
        1
      ) {

        return;

      }

      setCurrentIndex(
        (prev) =>
          (
            prev + 1
          ) %
          matchedUsers.length
      );

    };

  if (loading) {

    return (

      <div className="flex items-center justify-center text-white pt-40">

        <h1 className="text-3xl font-black animate-pulse bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

          Finding your vibe tribe...

        </h1>

      </div>

    );

  }

  if (
    matchedUsers.length ===
    0
  ) {

    return (

      <div className="flex items-center justify-center text-white pt-40 p-6">

        <div className="text-center space-y-6 max-w-sm">

          <div className="relative">

            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full"></div>

            <h1 className="relative text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

              YOUR VIBE TRIBE IS COMING

            </h1>

          </div>

          <p className="text-zinc-400 leading-relaxed text-[15px]">

            More people are joining every day. Try exploring again later or add more vibes to expand your tribe.

          </p>

        </div>

      </div>

    );

  }

  const compatibility =
    calculateCompatibility(
      currentUser.vibes
    );

  const myVibes = Object.values(
  userData.vibes || {}
).flat();

const sharedVibes =
  (currentUser.vibes || []).filter(
    (vibe) =>
      myVibes.includes(vibe)
  );

  const otherVibes =
  (currentUser.vibes || []).filter(
    (vibe) =>
      !myVibes.includes(vibe)
  );

  return (

    <div className="text-white flex flex-col items-center p-6 relative overflow-hidden">

      <div className="absolute w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-120px]"></div>

      <div className="absolute w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-100px]"></div>

      <motion.div
        key={currentUser.id}
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
        }}
        className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-3xl border border-white/15 rounded-[38px] p-6 shadow-[0_0_60px_rgba(0,255,255,0.12)] overflow-hidden"
      >

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>

        <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-bold text-cyan-300">

          {
            currentIndex + 1
          } / {
            matchedUsers.length
          }

        </div>

        <div className="relative flex flex-col items-center text-center">

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur-2xl opacity-40 scale-125"></div>

            <img
              src={
                currentUser.profilePic ||
                "https://i.pravatar.cc/300"
              }
              alt="profile"
              className="relative w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-[0_0_35px_rgba(0,255,255,0.25)]"
            />

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1.5 rounded-full text-sm font-black shadow-[0_0_25px_rgba(168,85,247,0.45)]">

              {compatibility}% Vibed

            </div>

          </div>

          <div className="mt-9">

            <h1 className="text-3xl font-black tracking-tight">

              {
                currentUser.username
              }

            </h1>

            <p className="text-cyan-300 font-semibold mt-1">

              {
                currentUser.age
              } years old

            </p>

          </div>

          <p className="text-zinc-300 mt-5 leading-relaxed text-[15px]">

            {
              currentUser.bio
            }

          </p>

        </div>

        <div className="relative mt-8 space-y-7">

          <div>

            <h2 className="text-center text-lg font-black mb-4 bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text">

              Vibing Together

            </h2>

            <div className="flex flex-wrap justify-center gap-3">

              {sharedVibes.map(
                (vibe) => (

                  <div
                    key={vibe}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold shadow-[0_0_25px_rgba(168,85,247,0.35)] border border-white/10 backdrop-blur-xl hover:scale-105 transition-all duration-300"
                  >

                    {vibe}

                  </div>

                )
              )}

            </div>

          </div>

          {otherVibes.length >
            0 && (

            <div>

              <h2 className="text-center text-lg font-black mb-4 text-zinc-300">

                Also Into

              </h2>

              <div className="flex flex-wrap justify-center gap-3">

                {otherVibes.map(
                  (vibe) => (

                    <div
                      key={vibe}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-zinc-200 text-sm font-semibold hover:bg-white/10 transition-all duration-300"
                    >

                      {vibe}

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </div>

        <div className="relative flex gap-3 pt-8">

          <button
            onClick={
              nextUser
            }
            className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl font-semibold hover:bg-white/10 transition-all duration-300"
          >

            Explore More

          </button>

          <button
            onClick={
              connectUser
            }
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-black hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
          >

            Vibe

          </button>

        </div>

      </motion.div>

    </div>

  );

}
*/
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const FALLBACK_PROFILE_PIC = "https://i.pravatar.cc/300";

export function getFlattenedVibes(vibes) {
  if (!vibes) return [];

  const sourceValues = Array.isArray(vibes)
    ? vibes
    : typeof vibes === "object"
      ? Object.values(vibes)
      : [];

  const flattenedVibes = [];

  sourceValues.forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((nestedValue) => {
        if (typeof nestedValue === "string" && nestedValue.trim()) {
          flattenedVibes.push(nestedValue.trim());
        }
      });
      return;
    }

    if (typeof value === "string" && value.trim()) {
      flattenedVibes.push(value.trim());
    }
  });

  return [...new Set(flattenedVibes)];
}

function shuffleUsers(users) {
  const shuffledUsers = Array.isArray(users) ? [...users] : [];

  for (let index = shuffledUsers.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledUsers[index], shuffledUsers[randomIndex]] = [
      shuffledUsers[randomIndex],
      shuffledUsers[index],
    ];
  }

  return shuffledUsers;
}

export default function Discover({
  userData,
  setCurrentTab,
  setSelectedChatUser,
}) {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const [pageError, setPageError] = useState("");
  const [connectError, setConnectError] = useState("");
  const [connectedIds, setConnectedIds] = useState([]);

  const myVibes = useMemo(
    () => getFlattenedVibes(userData?.vibes),
    [userData?.vibes]
  );

  const calculateCompatibility = useCallback(
    (vibes) => {
      const profileVibes = getFlattenedVibes(vibes);

      if (myVibes.length === 0 || profileVibes.length === 0) {
        return 0;
      }

      const sharedVibes = profileVibes.filter((vibe) =>
        myVibes.includes(vibe)
      );

      return Math.round((sharedVibes.length / myVibes.length) * 100);
    },
    [myVibes]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async (signedInUser) => {
      if (!signedInUser?.uid) {
        if (isMounted) setLoading(true);
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setPageError("");
        }

        const connectionSnapshot = await getDocs(
          collection(db, "connections")
        );

        const existingConnections = [];

        connectionSnapshot.forEach((docItem) => {
          const data = docItem?.data?.();
          const connectionUsers = Array.isArray(data?.users)
            ? data.users
            : [];

          if (!connectionUsers.includes(signedInUser.uid)) return;

          const otherUser = connectionUsers.find(
            (id) => typeof id === "string" && id !== signedInUser.uid
          );

          if (otherUser && !existingConnections.includes(otherUser)) {
            existingConnections.push(otherUser);
          }
        });

        const usersSnapshot = await getDocs(collection(db, "users"));
        const availableUsers = [];

        usersSnapshot.forEach((docItem) => {
          const userId = docItem?.id;
          const profileData = docItem?.data?.() || {};

          if (
            !userId ||
            userId === signedInUser.uid ||
            existingConnections.includes(userId)
          ) {
            return;
          }

          availableUsers.push({
            ...profileData,
            id: userId,
          });
        });

        if (isMounted) {
          setConnectedIds(existingConnections);
          setUsers(shuffleUsers(availableUsers));
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Unable to load Discover:", error);

        if (isMounted) {
          setPageError("Something went wrong while loading Discover");
          setUsers([]);
          setConnectedIds([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(
      auth,
      (signedInUser) => {
        if (!signedInUser?.uid) {
          if (isMounted) setLoading(true);
          return;
        }

        fetchUsers(signedInUser);
      },
      (error) => {
        console.error("Unable to verify the signed-in user:", error);

        if (isMounted) {
          setPageError("Something went wrong while loading Discover");
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const matchedUsers = useMemo(() => {
    if (!Array.isArray(users) || !userData) return [];

    const myAge = Number(userData?.age);
    const hasMyAge = Number.isFinite(myAge);

    return users
      .filter((profile) => {
        if (!profile) return false;

        const profileVibes = getFlattenedVibes(profile?.vibes);

        if (profileVibes.length === 0) return false;

        const profileAge = Number(profile?.age);
        const hasProfileAge = Number.isFinite(profileAge);
        const ageMatches =
          !hasMyAge || !hasProfileAge || Math.abs(profileAge - myAge) <= 12;

        return calculateCompatibility(profileVibes) >= 20 && ageMatches;
      })
      .sort(
        (firstProfile, secondProfile) =>
          calculateCompatibility(secondProfile?.vibes) -
          calculateCompatibility(firstProfile?.vibes)
      );
  }, [calculateCompatibility, userData, users]);

  useEffect(() => {
    if (matchedUsers.length === 0) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex % matchedUsers.length);
  }, [matchedUsers.length]);

  const currentUser =
    matchedUsers.length > 0
      ? matchedUsers[currentIndex % matchedUsers.length]
      : null;

  const connectUser = async () => {
    const signedInUser = auth?.currentUser;

    if (!signedInUser?.uid || !currentUser?.id || connectLoading) {
      setConnectError("Unable to connect right now. Please try again.");
      return;
    }

    try {
      setConnectLoading(true);
      setConnectError("");

      const connectionSnapshot = await getDocs(
        collection(db, "connections")
      );

      let alreadyConnected = connectedIds.includes(currentUser.id);

      connectionSnapshot.forEach((docItem) => {
        const data = docItem?.data?.();
        const connectionUsers = Array.isArray(data?.users)
          ? data.users
          : [];

        if (
          connectionUsers.includes(signedInUser.uid) &&
          connectionUsers.includes(currentUser.id)
        ) {
          alreadyConnected = true;
        }
      });

      if (!alreadyConnected) {
        await addDoc(collection(db, "connections"), {
          users: [signedInUser.uid, currentUser.id],
          createdAt: serverTimestamp(),
        });

        setConnectedIds((previousIds) => {
          const safeIds = Array.isArray(previousIds) ? previousIds : [];

          return safeIds.includes(currentUser.id)
            ? safeIds
            : [...safeIds, currentUser.id];
        });

        setUsers((previousUsers) => {
          const safeUsers = Array.isArray(previousUsers) ? previousUsers : [];

          return safeUsers.filter((profile) => profile?.id !== currentUser.id);
        });
      }

      if (typeof setSelectedChatUser === "function") {
        setSelectedChatUser(currentUser);
      }

      if (typeof setCurrentTab === "function") {
        setCurrentTab("chatRoom");
      }
    } catch (error) {
      console.error("Unable to connect with this user:", error);
      setConnectError("Unable to connect right now. Please try again.");
    } finally {
      setConnectLoading(false);
    }
  };

  const nextUser = () => {
    if (matchedUsers.length <= 1) return;

    setConnectError("");
    setCurrentIndex(
      (previousIndex) => (previousIndex + 1) % matchedUsers.length
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center text-white pt-40">
        <h1 className="text-3xl font-black animate-pulse bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Finding your vibe tribe...
        </h1>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="flex items-center justify-center text-white pt-40 p-6">
        <h1 className="text-center text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Something went wrong while loading Discover
        </h1>
      </div>
    );
  }

  if (!currentUser || matchedUsers.length === 0) {
    return (
      <div className="flex items-center justify-center text-white pt-40 p-6">
        <div className="text-center space-y-6 max-w-sm">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full" />
            <h1 className="relative text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              YOUR VIBE TRIBE IS COMING
            </h1>
          </div>

          <p className="text-zinc-400 leading-relaxed text-[15px]">
            More people are joining every day. Try exploring again later or add
            more vibes to expand your tribe.
          </p>
        </div>
      </div>
    );
  }

  const compatibility = calculateCompatibility(currentUser?.vibes);
  const profileVibes = getFlattenedVibes(currentUser?.vibes);
  const sharedVibes = profileVibes.filter((vibe) => myVibes.includes(vibe));
  const otherVibes = profileVibes.filter((vibe) => !myVibes.includes(vibe));

  return (
    <div className="text-white flex flex-col items-center p-6 relative overflow-hidden">
      <div className="absolute w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-120px]" />
      <div className="absolute w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-100px]" />

      <motion.div
        key={currentUser.id}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-3xl border border-white/15 rounded-[38px] p-6 shadow-[0_0_60px_rgba(0,255,255,0.12)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />

        <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-bold text-cyan-300">
          {currentIndex + 1} / {matchedUsers.length}
        </div>

        <div className="relative flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur-2xl opacity-40 scale-125" />

            <img
              src={currentUser?.profilePic || FALLBACK_PROFILE_PIC}
              alt={`${currentUser?.username || "User"} profile`}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = FALLBACK_PROFILE_PIC;
              }}
              className="relative w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-[0_0_35px_rgba(0,255,255,0.25)]"
            />

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1.5 rounded-full text-sm font-black shadow-[0_0_25px_rgba(168,85,247,0.45)]">
              {compatibility}% Vibed
            </div>
          </div>

          <div className="mt-9">
            <h1 className="text-3xl font-black tracking-tight">
              {currentUser?.username || "Vibe Seeker"}
            </h1>

            <p className="text-cyan-300 font-semibold mt-1">
              {currentUser?.age ? `${currentUser.age} years old` : "Age not listed"}
            </p>
          </div>

          <p className="text-zinc-300 mt-5 leading-relaxed text-[15px]">
            {currentUser?.bio || "This vibe seeker has not added a bio yet."}
          </p>
        </div>

        <div className="relative mt-8 space-y-7">
          <div>
            <h2 className="text-center text-lg font-black mb-4 bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text">
              Vibing Together
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
              {sharedVibes.map((vibe, index) => (
                <div
                  key={`${vibe}-${index}`}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold shadow-[0_0_25px_rgba(168,85,247,0.35)] border border-white/10 backdrop-blur-xl hover:scale-105 transition-all duration-300"
                >
                  {vibe}
                </div>
              ))}
            </div>
          </div>

          {otherVibes.length > 0 && (
            <div>
              <h2 className="text-center text-lg font-black mb-4 text-zinc-300">
                Also Into
              </h2>

              <div className="flex flex-wrap justify-center gap-3">
                {otherVibes.map((vibe, index) => (
                  <div
                    key={`${vibe}-${index}`}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-zinc-200 text-sm font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    {vibe}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {connectError && (
          <p className="relative mt-6 text-center text-sm font-semibold text-red-300">
            {connectError}
          </p>
        )}

        <div className="relative flex gap-3 pt-8">
          <button
            type="button"
            onClick={nextUser}
            disabled={matchedUsers.length <= 1 || connectLoading}
            className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl font-semibold hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Explore More
          </button>

          <button
            type="button"
            onClick={connectUser}
            disabled={connectLoading}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-black hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {connectLoading ? "Connecting..." : "Vibe"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}