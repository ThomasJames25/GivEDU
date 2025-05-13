"use client"
import Image from 'next/image'
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from './Shared/firebaseConfig';
import { useEffect, useState } from 'react';
import PinList from './components/Pins/PinList';

export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for better UX
  const [error, setError] = useState(null); // Error handling for fetching

  useEffect(() => {
    getAllPins();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const getAllPins = async () => {
    try {
      setLoading(true); // Start loading before fetching
      const q = collection(db, 'pinterest-post'); // Get all posts from Firestore
      const querySnapshot = await getDocs(q); // Get the snapshot of the data
      const pins = [];
      
      querySnapshot.forEach((doc) => {
        pins.push({ ...doc.data(), id: doc.id }); // Push post data into array
      });

      setListOfPins(pins); // Update state with the fetched pins
    } catch (err) {
      console.error("Error fetching posts: ", err);
      setError("Failed to load posts. Please try again later."); // Set error message
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="p-3">
      {loading ? (
        <div>Loading posts...</div> // Show loading indicator
      ) : error ? (
        <div>{error}</div> // Show error message if fetching fails
      ) : (
        <PinList listOfPins={listOfPins} />
      )}
    </div>
  );
}
