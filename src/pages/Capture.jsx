import React from 'react';
// import Video from '../components/video';
// import Photo from '../components/photo';
import Webrtc from '../components/webrtc';

function Capture() {
  return (
    <div className="max-w-7xl mx-auto  p-5">
      <h1 className="text-3xl font-bold ">Capture Images</h1>

      {/* <Photo />
      <Video /> */}
      <Webrtc />
    </div>
  );
}

export default Capture;
