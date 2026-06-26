const dummyDrops = [
  {
    id: "1",
    type: "thought",
    author: "Aarav",
    source: "🏫 Heritage School",
    content: "I still smell new books before reading them.",
    reactions: {
      me: 42,
      neutral: 8,
      notMe: 4,
    },
  },

  {
    id: "2",
    type: "photo",
    author: "Ananya",
    source: "👥 Similar to You",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
    caption: "Today's sunset.",
    reactions: {
      love: 32,
      wow: 18,
      funny: 2,
    },
  },

  {
    id: "3",
    type: "poll",
    author: "Kabir",
    source: "🔥 Trending",
    question: "BMW vs Mercedes",
    left: "BMW",
    right: "Mercedes",
    votes: {
      left: 121,
      right: 96,
    },
  },

  {
    id: "4",
    type: "hotTake",
    author: "Riya",
    source: "📍 Nearby",
    content: "Homework should be banned.",
    reactions: {
      agree: 92,
      disagree: 18,
    },
  },

  {
    id: "5",
    type: "question",
    author: "Dev",
    source: "👥 Similar to You",
    content: "What's one thing everyone should experience once?",
    replies: 84,
  },
];

export default dummyDrops;