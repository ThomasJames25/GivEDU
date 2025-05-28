'use client';
import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UserTag from '../UserTag';

function BidModal({ onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-6 rounded-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevents background click
      >
        <h2 className="text-lg font-semibold mb-3">Why do you need this item?</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={() => onSubmit(reason)} className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
        </div>
      </div>
    </div>
  );
}

function PinItem({ pin, user }) {
  const router = useRouter();
  const [showBidModal, setShowBidModal] = useState(false);

  const handleBidSubmit = (reason) => {
    console.log("Bid reason:", reason);
    setShowBidModal(false);
  };

  const handleCardClick = (e) => {
    if (e.target.closest('.no-propagate')) return;
    router.push('/pin/' + pin.id);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-4 relative group overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Full card hover overlay */}
      <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-50 transition-opacity duration-200 rounded-2xl z-10 pointer-events-none" />

      <div className="relative z-20">
        <div className="rounded-2xl overflow-hidden">
          <Image
            src={pin.image}
            alt={pin.title}
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
        <h2 className="font-bold text-[18px] mb-1 mt-2 line-clamp-2">{pin.title}</h2>
        <UserTag user={user} />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowBidModal(true);
        }}
        className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full shadow transition duration-200 z-30 no-propagate"
      >
        Bid
      </button>

      {showBidModal && (
        <BidModal
          onClose={() => setShowBidModal(false)}
          onSubmit={handleBidSubmit}
        />
      )}
    </div>
  );
}

export default PinItem;