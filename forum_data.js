/* ==========================================================
   THE ORDER OF THE MACHINE TOWER - FORUM CONTENT
   This is the only file you edit to add boards or topics.

   ADDING A TOPIC
   1. Copy one of the topic entries below and paste it into the list.
   2. Give it a new, unique "slug": lowercase letters, numbers and hyphens.
   3. Set "board" to the id of one of the boards.
   4. Upload this file. The topic appears on the homepage right away, and
      its comment thread is created the first time somebody comments.

   IMPORTANT: never change a topic's slug after people have commented.
   The slug is how giscus finds the thread, so a new slug is a new, empty thread.
   You can change the title, blurb and date freely.

   The topics and boards below are EXAMPLES. Rename, delete or replace them.
   ========================================================== */

window.FORUM = {

  config: {
    // Taken from your current forum page
    repo: "AdeptTel1-ComSite/ootmt-forum",
    repoId: "R_kgDOVOyDEQ",
    category: "Announcements",
    categoryId: "DIC_kwDOVOyDEc4DI7nv",

    // Look of the comment box. Other options: "cobalt", "dark_dimmed",
    // "dark_high_contrast", "noborder_dark", "transparent_dark"
    giscusTheme: "transparent_dark",

    // The back link to the main site
    mainSite: "https://adeptus-telvannus.neocities.org/hpgs/machinetower_main"
  },

  /* BOARDS
     Every board uses the Announcements category above until you give it
     its own. To do that, create a category on GitHub (Discussions > Categories),
     then add  category: "Name"  and  categoryId: "DIC_..."  to the board.
     Get both values from https://giscus.app (fill in the form, copy them). */
  boards: [
    {
      id: "hall",
      name: "THE HALL",
      blurb: "Introductions, rules and general talk."
    },
    {
      id: "workshop",
      name: "THE WORKSHOP",
      blurb: "Projects, experiments and builds, working or not."
    },
    {
      id: "observatory",
      name: "THE OBSERVATORY",
      blurb: "Theory, AI and the wider questions."
    },
   {
      id: "adeptfour",
      name: "ADEPTUS 4CHANICUS",
      blurb: "Jokes, memes, and stuff that doesn't belong on the other boards."
    }
  ],

  /* TOPICS
     slug    unique, permanent id (see above)
     title   shown on the homepage and at the top of the topic page
     board   id of a board above
     blurb   one or two sentences shown under the title
     date    when you opened the topic, any text you like
     pinned  true keeps it at the top of its board */
  topics: [
    {
      slug: "welcome-and-rules",
      title: "Welcome and Rules",
      board: "hall",
      blurb: "Start here. How the forum works and what is not allowed.",
      date: "11/10/2026",
      pinned: true
    },
    {
      slug: "introductions",
      title: "Introductions",
      board: "hall",
      blurb: "Say who you are, what you build and what you want to explore.",
      date: "11/10/2026"
    },
    {
      slug: "project-proposals",
      title: "Project Proposals",
      board: "workshop",
      blurb: "Pitch an idea, find collaborators, argue about the premise.",
      date: "11/10/2026"
    },
    {
      slug: "hardware-experiments",
      title: "Hardware Experiments",
      board: "workshop",
      blurb: "Unusual builds, salvaged parts and experiments that might fail.",
      date: "11/10/2026"
    },
    {
      slug: "servitors-and-familiars",
      title: "Servitors and Familiars",
      board: "observatory",
      blurb: "Training, shaping and understanding AI.",
      date: "11/10/2026"
    },
    {
      slug: "meeting-threads",
      title: "Meeting Threads",
      board: "observatory",
      blurb: "Notes and follow-up from the /tow/ general meetings.",
      date: "11/10/2026"
    },
   {
      slug: "memes-jokes",
      title: "Memes and Jokes",
      board: "adeptfour",
      blurb: "Jokes, memes, and stuff that doesn't belong on the other boards.",
      date: "11/10/2026"
    },
    {
      slug: "old-board",
      title: "Old Board",
      board: "adeptfour",
      blurb: "Old board layout. Posts from when the board was WIP (Pre 11/10/2026) are also available for viewing.",
      date: "11/10/2026"
    }
  ]
};
