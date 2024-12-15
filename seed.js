import {
  createUser,
  toggleFollowUser,
  addCommentToUser
} from "./data/userService.js";
import { createPost } from "./data/post.js";
import { createRoute } from "./data/route.js";
import { createComment } from "./data/comment.js";
import { dropDB, disconnectDB } from "./config/db.js";
import mongoose from "mongoose";

const seedDatabase = async () => {
  try {
    // Clear existing data
    await dropDB();

    const sampleUsers = [
      {
        userName: "maheshs85",
        password: "Maheshs85",
        email: "maheshs85@example.com",
        phoneNumber: "123-456-7890",
        followers: [],
        following: [],
        posts: [],
        personalPageComments: [],
        role: "Moderator"
      },
      {
        userName: "toxxxx",
        password: "Toxxxxx1",
        email: "TOXXXX@example.com",
        phoneNumber: "123-456-7891",
        followers: [],
        following: [],
        posts: [],
        personalPageComments: [],
        role: "Moderator"
      },
      {
        userName: "chenhaolinolym",
        password: "Chenhaolinolym1",
        email: "ChenHaolinOlym@example.com",
        phoneNumber: "123-456-7892",
        followers: [],
        following: [],
        posts: [],
        personalPageComments: [],
        role: "Moderator"
      },
      {
        userName: "junrantao",
        password: "Junrantao1",
        email: "JunranTao@example.com",
        phoneNumber: "123-456-7893",
        followers: [],
        following: [],
        posts: [],
        personalPageComments: [],
        role: "Moderator"
      },
      {
        userName: "armansingh",
        password: "Armansingh1",
        email: "ArmanSingh@example.com",
        phoneNumber: "123-456-7894",
        followers: [],
        following: [],
        posts: [],
        personalPageComments: [],
        role: "Moderator"
      }
    ];

    const createdUsers = [];

    for (const userData of sampleUsers) {
      const user = await createUser(userData);
      createdUsers.push(user);
    }

    for (let i = 0; i < createdUsers.length; i++) {
      for (let j = i; j < createdUsers.length; j++) {
        if (i !== j) {
          toggleFollowUser(createdUsers[i]._id, createdUsers[j]._id);
        }
      }
    }

    // Comments posted on the personal page
    const userComments = [
      {
        uid: createdUsers[0]._id,
        content: "Great post! Keep it up!",
        postID: null
      },
      {
        uid: createdUsers[1]._id,
        content: "Nice photo!",
        postID: null
      },
      {
        uid: createdUsers[2]._id,
        content: "I love this!",
        postID: null
      }
    ];

    for (const commentData of userComments) {
      await addCommentToUser(createdUsers[0]._id, commentData);
    }

    console.log("Sample users added successfully");

    // TODO: Temporary, needs refactor after real route data functions are in.
    const postData = [
      {
        isPlan: true,
        intendedTime: [
          new Date("2024-01-01T08:00:00Z"),
          new Date("2024-01-01T12:00:00Z")
        ],
        title: "Plan a trip to the mountains",
        intro: "An exciting journey to explore the mountains.",
        content: { description: "Hiking and sightseeing in the mountains." }
      },
      {
        isPlan: false,
        intendedTime: [],
        title: "Review of my beach vacation",
        intro: "Sharing my experience of a serene beach holiday.",
        content: {
          description: "Photos and descriptions of the beach and local cuisine."
        }
      },
      {
        isPlan: true,
        intendedTime: [
          new Date("2024-02-15T10:00:00Z"),
          new Date("2024-02-15T18:00:00Z")
        ],
        title: "Plan for city exploration",
        intro: "Exploring the best spots in the city.",
        content: { description: "Museum visits, parks, and local markets." }
      },
      {
        isPlan: false,
        intendedTime: [],
        title: "Reflections on a nature retreat",
        intro: "A rejuvenating experience in nature.",
        content: { description: "Meditation and relaxation amidst nature." }
      },
      {
        isPlan: true,
        intendedTime: [
          new Date("2024-03-10T07:00:00Z"),
          new Date("2024-03-10T14:00:00Z")
        ],
        title: "Plan for a river rafting adventure",
        intro: "A thrilling river rafting expedition.",
        content: {
          description:
            "Preparing for a safe and adventurous rafting experience."
        }
      }
    ];

    const routeData = [
      {
        routeName: "San Francisco Route",
        routeDesc: "A scenic route through San Francisco.",
        tripDuration: 120, // in minutes
        origin: {
          name: "Start Point",
          coordinates: [-122.4194, 37.7749],
          description: "Starting point in San Francisco."
        },
        destination: {
          name: "End Point",
          coordinates: [-122.4194, 37.85],
          description: "Ending point in San Francisco."
        },
        routeType: "Scenic"
      },
      {
        routeName: "Los Angeles Route",
        routeDesc: "A popular route through Los Angeles.",
        tripDuration: 90,
        origin: {
          name: "Start Point",
          coordinates: [-118.2437, 34.0522],
          description: "Starting point in Los Angeles."
        },
        destination: {
          name: "End Point",
          coordinates: [-118.2437, 34.07],
          description: "Ending point in Los Angeles."
        },
        routeType: "Urban"
      },
      {
        routeName: "New York Route",
        routeDesc: "A bustling route through New York City.",
        tripDuration: 75,
        origin: {
          name: "Start Point",
          coordinates: [-74.006, 40.7128],
          description: "Starting point in New York City."
        },
        destination: {
          name: "End Point",
          coordinates: [-74.006, 40.73],
          description: "Ending point in New York City."
        },
        routeType: "Urban"
      },
      {
        routeName: "Washington D.C. Route",
        routeDesc: "A historic route through Washington D.C.",
        tripDuration: 105,
        origin: {
          name: "Start Point",
          coordinates: [-77.0369, 38.9072],
          description: "Starting point in Washington D.C."
        },
        destination: {
          name: "End Point",
          coordinates: [-77.0369, 38.92],
          description: "Ending point in Washington D.C."
        },
        routeType: "Historic"
      },
      {
        routeName: "Portland Route",
        routeDesc: "A beautiful route through Portland.",
        tripDuration: 180,
        origin: {
          name: "Start Point",
          coordinates: [-122.6784, 45.5231],
          description: "Starting point in Portland."
        },
        destination: {
          name: "End Point",
          coordinates: [-122.6784, 45.54],
          description: "Ending point in Portland."
        },
        routeType: "Scenic"
      }
    ];

    let createdPosts = [];

    // Create Posts and Routes in a one-to-one relationship
    for (let i = 0; i < postData.length; i++) {
      const userId = createdUsers[i]._id;
      const post = await createPost(userId, postData[i]);
      createdPosts.push(post);

      // Add postID and uid to the route data
      const routeToCreate = {
        uid: userId,
        pid: post._id,
        ...routeData[i]
      };

      // Last post does not have a route
      if (i !== postData.length - 1) {
        const route = await createRoute(routeToCreate);
      }
    }

    // Comments on the posts
    const postComments = [
      {
        uid: createdUsers[1]._id,
        content: "This is amazing!",
        postId: createdPosts[0]._id
      },
      {
        uid: createdUsers[2]._id,
        content: "Great work!",
        postId: createdPosts[1]._id
      },
      {
        uid: createdUsers[3]._id,
        content: "I love this place!",
        postId: createdPosts[2]._id
      },
      {
        uid: createdUsers[4]._id,
        content: "Fantastic view!",
        postId: createdPosts[3]._id
      },
      {
        uid: createdUsers[0]._id,
        content: "Beautiful scenery!",
        postId: createdPosts[4]._id
      }
    ];

    for (const commentData of postComments) {
      await createComment(commentData);
    }

    console.log("Sample posts and routes added successfully");

    console.log("Seeding completed.");

    await disconnectDB();
  } catch (error) {
    console.error("Error seeding database:", error);
    await disconnectDB();
  }
};

export default seedDatabase;
