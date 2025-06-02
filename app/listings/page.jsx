"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import app from "../Shared/firebaseConfig";

export default function ListingsPage() {
  const { data: session, status } = useSession();
  const db = getFirestore(app);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchUserPostsWithBids = async () => {
      const userEmail = session.user.email.toLowerCase();
      try {
        const postsRef = collection(db, "pinterest-post");
        const q = query(postsRef, where("email", "==", userEmail));
        const postSnap = await getDocs(q);

        if (postSnap.empty) {
          return;
        }

        const postsWithBids = await Promise.all(
          postSnap.docs.map(async (doc) => {
            const postData = { ...doc.data(), id: doc.id };
            const bidsSnap = await getDocs(
              collection(db, `pinterest-post/${doc.id}/bids`)
            );
            const bids = bidsSnap.docs.map((b) => b.data());
            postData.bids = bids;
            return postData;
          })
        );

        setUserPosts(postsWithBids);
      } catch (error) {
        console.error("🔥 Error fetching posts:", error);
      }
    };

    fetchUserPostsWithBids();
  }, [session, status]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Listings & Bids</h1>
      {userPosts.length === 0 ? (
        <p className="text-gray-500">You have not created any posts yet.</p>
      ) : (
        userPosts.map((post) => (
          <div key={post.id} className="mb-8 bg-white p-5 rounded-2xl shadow">
            <div className="flex items-center gap-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-40 h-32 object-cover rounded-xl"
              />
              <div>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.desc}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Posted by: {post.userName}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-5">Bids:</h3>
            {post.bids.length > 0 ? (
              post.bids.map((bid, i) => (
                <div key={i} className="bg-gray-100 p-2 rounded mt-2">
                  {bid.reason}
                </div>
              ))
            ) : (
              <p key={`nobid-${post.id}`} className="text-sm text-gray-400">
                No bids yet.
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}