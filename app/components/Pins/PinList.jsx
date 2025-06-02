import React from 'react';
import PinItem from './PinItem'; // ⬅️ Add this line

function PinList({ listOfPins }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {listOfPins.length > 0 ? (
        listOfPins.map((pin) => (
          <PinItem key={pin.id} pin={pin} user={pin.user} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default PinList;