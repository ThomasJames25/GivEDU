"use client" // Add this line at the top of the file

import React, { useState } from 'react'
import UploadImage from './UploadImage'
import { useSession } from "next-auth/react"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import UserTag from './UserTag'
import app from '../Shared/firebaseConfig'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function Form() {
  
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const storage = getStorage(app)
  const db = getFirestore(app);
  const postId = Date.now().toString();

  const onSave = () => {
    if (!file || !title || !desc) {
      alert("Please fill in all fields and select an image.");
      return;
    }
    if (!session || !session.user) {
      alert("User not authenticated. Please log in again.");
      return;
    }
  
    setLoading(true);
    uploadFile();
  };

  const uploadFile = async () => {
    console.log("Preparing upload:");
console.log("Title:", title);
console.log("Desc:", desc);
console.log("File:", file);
console.log("Session:", session);
    try {
      
      const storageRef = ref(storage, 'pinterest/' + file.name);
      if (!(file instanceof File)) {
        throw new Error("Invalid file format. Please upload an image.");
      }
      const snapshot = await uploadBytes(storageRef, file);
      console.log("File uploaded");
  
      const url = await getDownloadURL(storageRef);
      console.log("Download URL:", url);
      
  
      const postData = {
        title,
        desc,
        image: url,
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
        id: postId,
      };
  
      await setDoc(doc(db, 'pinterest-post', postId), postData);
      console.log("Post saved to Firestore");
  
      setLoading(false);
      router.push("/" + session.user.email);
  
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Something went wrong while saving. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className='bg-white p-16 rounded-2xl'>
      <div className='flex justify-end mb-6'>
        <button
          onClick={onSave}
          className='bg-icon-green p-2 text-text-blue font-semibold px-3 rounded-md'
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
  
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Upload Image */}
        <UploadImage file={file} setFile={setFile} />
  
        <div>
          <h2 className='text-2xl font-bold text-text-blue'>
            {title || 'Test Title'}
          </h2>
          <p className='text-sm text-gray-600'>
            The first 40 Characters are what usually show up in feeds
          </p>
          <UserTag user={session?.user} />
  
          <input
            type='text'
            placeholder='Enter Title'
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-2 mt-4 border-b border-blue-900 outline-none text-xl font-semibold text-blue-900'
          />
  
          <textarea
            placeholder='Test Description'
            value={desc || ''}
            onChange={(e) => setDesc(e.target.value)}
            className='w-full mt-4 border-b border-blue-900 outline-none p-2 resize-none text-base text-gray-700'
            rows={3}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Form
