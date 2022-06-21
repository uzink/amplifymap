import React, { useEffect, useRef } from 'react';

function Webrtc() {
  const mediaStreamConstraints = {
    video: true,
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((mediaStream) => {
        console.log(mediaStream);
        // gotLocalMediaStream(mediaStream);
      })
      .catch(handleLocalMediaStreamError);
  });

  const elementRef = useRef();

  const localVideo = elementRef.current;

  function gotLocalMediaStream(mediaStream) {
    // let localStream = mediaStream;
    localVideo.srcObject = mediaStream;
  }

  function handleLocalMediaStreamError(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  navigator.mediaDevices
    .getUserMedia(mediaStreamConstraints)
    .then((mediaStream) => {
      gotLocalMediaStream(mediaStream);
    })
    .catch(handleLocalMediaStreamError);

  return (
    <div className="mt-6 ">
      <div className="h-auto w-auto mx-auto mt-5">
        <h3 className="text-lg font-medium ">Video</h3>
        <video ref={elementRef} width="600" height="520" controls></video>
      </div>
    </div>
  );
}

export default Webrtc;
