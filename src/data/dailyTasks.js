// src/data/dailyTasks.js

export const DAILY_TASK_REWARD = 20;
export const DAILY_TASK_DURATION_MS = 24 * 60 * 60 * 1000;


export const DAILY_TASKS = [
  { id: "connect_1", title: "Connect with 1 new person", type: "connections", target: 1 },
  { id: "connect_2", title: "Connect with 2 new people", type: "connections", target: 2 },
  { id: "send_messages_3", title: "Send 3 messages", type: "messagesSent", target: 3 },
  { id: "send_messages_5", title: "Send 5 messages", type: "messagesSent", target: 5 },
  { id: "reply_1", title: "Reply to 1 message", type: "messagesReplied", target: 1 },
  { id: "reply_3", title: "Reply to 3 messages", type: "messagesReplied", target: 3 },
  { id: "drop_photo", title: "Post 1 photo Vibe Drop", type: "photoDrops", target: 1 },
  { id: "drop_video", title: "Post 1 video Vibe Drop", type: "videoDrops", target: 1 },
  { id: "drop_question", title: "Post 1 question Vibe Drop", type: "questionDrops", target: 1 },
  { id: "drop_poll", title: "Post 1 poll Vibe Drop", type: "pollDrops", target: 1 },
  { id: "drop_any", title: "Post 1 Vibe Drop", type: "vibeDropsCreated", target: 1 },
  { id: "view_drops_2", title: "View 2 Vibe Drops", type: "vibeDropsViewed", target: 2 },
  { id: "view_drops_4", title: "View 4 Vibe Drops", type: "vibeDropsViewed", target: 4 },
  { id: "react_drop_1", title: "React to 1 Vibe Drop", type: "vibeDropReactions", target: 1 },
  { id: "react_drop_3", title: "React to 3 Vibe Drops", type: "vibeDropReactions", target: 3 },
  { id: "anonymous_start", title: "Start an Anonymous Vibe", type: "anonymousStarted", target: 1 },
  { id: "anonymous_complete", title: "Complete an Anonymous Vibe", type: "anonymousCompleted", target: 1 },
  { id: "anonymous_message_3", title: "Send 3 anonymous messages", type: "anonymousMessages", target: 3 },
  { id: "roulette_spin_1", title: "Spin Vibe Roulette once", type: "rouletteSpins", target: 1 },
  { id: "roulette_spin_2", title: "Spin Vibe Roulette twice", type: "rouletteSpins", target: 2 },
  { id: "roulette_music", title: "Spin Music Roulette", type: "musicRouletteSpins", target: 1 },
  { id: "roulette_movies", title: "Spin Movies Roulette", type: "moviesRouletteSpins", target: 1 },
  { id: "roulette_tech", title: "Spin Tech Roulette", type: "techRouletteSpins", target: 1 },
  { id: "roulette_gaming", title: "Spin Gaming Roulette", type: "gamingRouletteSpins", target: 1 },
  { id: "roulette_cricket", title: "Spin Cricket Roulette", type: "cricketRouletteSpins", target: 1 },
  { id: "icebreaker_1", title: "Play 1 icebreaker", type: "icebreakersPlayed", target: 1 },
  { id: "icebreaker_2", title: "Play 2 icebreakers", type: "icebreakersPlayed", target: 2 },
  { id: "profile_view_3", title: "Explore 3 profiles", type: "profilesViewed", target: 3 },
  { id: "profile_view_5", title: "Explore 5 profiles", type: "profilesViewed", target: 5 },
  { id: "profile_refresh", title: "Refresh your profile", type: "profileUpdates", target: 1 },
  { id: "vibe_update", title: "Update your vibe profile", type: "vibeProfileUpdates", target: 1 },
  { id: "bio_update", title: "Update your bio", type: "bioUpdates", target: 1 },
  { id: "photo_update", title: "Update your profile photo", type: "profilePhotoUpdates", target: 1 },
  { id: "tribe_join_1", title: "Join 1 tribe", type: "tribesJoined", target: 1 },
  { id: "tribe_discussion_1", title: "Join a tribe discussion", type: "tribeDiscussions", target: 1 },
  { id: "tribe_post_1", title: "Post in a tribe", type: "tribePosts", target: 1 },
  { id: "tribe_reply_1", title: "Reply in a tribe", type: "tribeReplies", target: 1 },
  { id: "tribe_react_2", title: "React to 2 tribe posts", type: "tribeReactions", target: 2 },
  { id: "invite_1", title: "Invite 1 friend", type: "referrals", target: 1 },
  { id: "streak_keep", title: "Keep your streak alive", type: "streakDays", target: 1 },
  { id: "leaderboard_view", title: "Check the leaderboard", type: "leaderboardViews", target: 1 },
  { id: "daily_vibe_answer", title: "Answer Today's Vibe", type: "dailyVibeAnswers", target: 1 },
  { id: "poll_answer_1", title: "Answer 1 poll", type: "pollAnswers", target: 1 },
  { id: "poll_answer_2", title: "Answer 2 polls", type: "pollAnswers", target: 2 },
  { id: "question_answer_1", title: "Answer 1 question drop", type: "questionAnswers", target: 1 },
  { id: "music_drop", title: "Drop something about Music", type: "musicDrops", target: 1 },
  { id: "movie_drop", title: "Drop something about Movies", type: "moviesDrops", target: 1 },
  { id: "anime_drop", title: "Drop something about Anime", type: "animeDrops", target: 1 },
  { id: "gaming_drop", title: "Drop something about Gaming", type: "gamingDrops", target: 1 },
  { id: "tech_drop", title: "Drop something about Tech", type: "techDrops", target: 1 },
  { id: "travel_drop", title: "Drop something about Travel", type: "travelDrops", target: 1 },
  { id: "cricket_drop", title: "Drop something about Cricket", type: "cricketDrops", target: 1 },
  { id: "fitness_drop", title: "Drop something about Fitness", type: "fitnessDrops", target: 1 },
  { id: "coding_drop", title: "Drop something about Coding", type: "codingDrops", target: 1 },
  { id: "f1_drop", title: "Drop something about F1", type: "f1Drops", target: 1 },
  { id: "music_profile", title: "Explore someone into Music", type: "musicProfilesViewed", target: 1 },
  { id: "movies_profile", title: "Explore someone into Movies", type: "moviesProfilesViewed", target: 1 },
  { id: "tech_profile", title: "Explore someone into Tech", type: "techProfilesViewed", target: 1 },
  { id: "gaming_profile", title: "Explore someone into Gaming", type: "gamingProfilesViewed", target: 1 },
  { id: "travel_profile", title: "Explore someone into Travel", type: "travelProfilesViewed", target: 1 },
  { id: "cricket_profile", title: "Explore someone into Cricket", type: "cricketProfilesViewed", target: 1 },
  { id: "chat_new", title: "Start a new chat", type: "newChats", target: 1 },
  { id: "chat_two_people", title: "Chat with 2 people", type: "uniqueChats", target: 2 },
  { id: "positive_message", title: "Send a positive message", type: "positiveMessages", target: 1 },
  { id: "welcome_message", title: "Welcome a new connection", type: "welcomeMessages", target: 1 },
  { id: "continue_chat", title: "Continue a conversation", type: "continuedChats", target: 1 },
  { id: "drop_category_view", title: "Explore a Vibe Drop category", type: "dropCategoriesViewed", target: 1 },
  { id: "roulette_categories_2", title: "Try 2 roulette categories", type: "rouletteCategories", target: 2 },
  { id: "anonymous_reveal", title: "Reveal profile after Anonymous Vibe", type: "anonymousReveals", target: 1 },
  { id: "streak_shield_view", title: "Check your streak shield", type: "streakShieldViews", target: 1 },
  { id: "points_use", title: "Use points for a boost", type: "pointBoostsUsed", target: 1 },
  { id: "community_activity", title: "Do 1 community action", type: "communityActions", target: 1 },
  { id: "community_activity_3", title: "Do 3 community actions", type: "communityActions", target: 3 },
  { id: "drop_reply", title: "Reply to a Vibe Drop", type: "dropReplies", target: 1 },
  { id: "drop_reply_3", title: "Reply to 3 Vibe Drops", type: "dropReplies", target: 3 },
  { id: "online_visit", title: "Open VibeLink while friends are online", type: "onlineVisits", target: 1 },
  { id: "morning_visit", title: "Visit VibeLink in the morning", type: "morningVisits", target: 1 },
  { id: "evening_visit", title: "Visit VibeLink in the evening", type: "eveningVisits", target: 1 },
  { id: "night_visit", title: "Visit VibeLink at night", type: "nightVisits", target: 1 },
  { id: "discover_shared", title: "Explore 3 people with shared vibes", type: "sharedVibeProfiles", target: 3 },
  { id: "discover_shared_5", title: "Explore 5 people with shared vibes", type: "sharedVibeProfiles", target: 5 },
  { id: "save_interest", title: "Save a new interest", type: "interestsSaved", target: 1 },
  { id: "read_profile", title: "Read someone's full profile", type: "fullProfilesRead", target: 1 },
  { id: "drop_watch_video", title: "Watch 1 video Vibe Drop", type: "videoDropsViewed", target: 1 },
  { id: "drop_photo_view", title: "View 1 photo Vibe Drop", type: "photoDropsViewed", target: 1 },
  { id: "answer_this_or_that", title: "Play This or That", type: "thisOrThatGames", target: 1 },
  { id: "answer_rapid_fire", title: "Play Rapid Fire", type: "rapidFireGames", target: 1 },
  { id: "answer_truths_lie", title: "Play 2 Truths and 1 Lie", type: "truthsLieGames", target: 1 },
  { id: "answer_favourite", title: "Play Guess My Favourite", type: "favouriteGames", target: 1 },
  { id: "anonymous_extend", title: "Extend an Anonymous Vibe", type: "anonymousExtends", target: 1 },
  { id: "roulette_vibe", title: "Vibe with a roulette match", type: "rouletteConnections", target: 1 },
  { id: "drop_upload_media", title: "Upload media to a Vibe Drop", type: "dropMediaUploads", target: 1 },
  { id: "points_earn", title: "Earn points today", type: "pointEarningDays", target: 1 },
  { id: "home_visit", title: "Check your VIBE Home", type: "homeVisits", target: 1 },
  { id: "profile_settings", title: "Open profile settings", type: "profileSettingsViews", target: 1 },
  { id: "tribe_people", title: "Explore people in a tribe", type: "tribeProfilesViewed", target: 1 },
  { id: "tribe_people_3", title: "Explore 3 people in a tribe", type: "tribeProfilesViewed", target: 3 },
  { id: "friend_leaderboard", title: "Check friend rankings", type: "friendLeaderboardViews", target: 1 },
  { id: "streak_leaderboard", title: "Check streak rankings", type: "streakLeaderboardViews", target: 1 },
];
export const DAILY_TASK_COUNT = DAILY_TASKS.length;

export const DAILY_TASK_TYPES = Object.freeze(
  [...new Set(DAILY_TASKS.map(task => task.type))]
);

export function getTaskById(taskId) {
  return DAILY_TASKS.find(
    task => task.id === taskId
  );
}

export function isValidTaskId(taskId) {
  return DAILY_TASKS.some(
    task => task.id === taskId
  );
}