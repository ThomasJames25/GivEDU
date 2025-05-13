import React from 'react';

function PinList({ listOfPins }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {listOfPins.length > 0 ? (
        listOfPins.map((pin) => (
          <div key={pin.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={pin.image} alt="Pin" className="w-full h-64 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-2">{pin.title}</h2>
            <p className="text-gray-500 text-sm">{pin.desc}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default PinList;
