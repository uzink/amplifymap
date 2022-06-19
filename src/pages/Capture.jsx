import React from 'react';
import Video from '../components/video';
import Photo from '../components/photo';

function Capture() {
  return (
    <div className="max-w-7xl mx-auto  p-5">
      <h1 className="text-3xl font-bold ">Capture Images</h1>

      <Photo />
      <Video />
    </div>
  );
}

export default Capture;
