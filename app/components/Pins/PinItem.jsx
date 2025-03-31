import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UserTag from '../UserTag'; // Ensure this is the correct path to the UserTag component

function PinItem({ pin, user }) {
  const router = useRouter();

  return (
    <div className="">
      <div
        className="relative 
        before:absolute
        before:h-full before:w-full
        before:rounded-3xl
        before:z-10
        hover:before:bg-gray-600 
        before:opacity-50
        cursor-pointer"
        onClick={() => router.push('/pin/' + pin.id)}
      >
        <Image
          src={pin.image}
          alt={pin.title}
          width={500}
          height={500}
          className="rounded-3xl 
          cursor-pointer relative z-0"
        />
      </div>
      <h2 className="font-bold 
      text-[18px] mb-1 mt-2 line-clamp-2">
        {pin.title}
      </h2>
      <UserTag user={user} />
    </div>
  );
}

export default PinItem;