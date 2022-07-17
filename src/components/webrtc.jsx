import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

function Webrtc() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia(
        {
          video: {
            facingMode: 'environment',
          },
        },
        (mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        },
        (err) => {}
      );
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      { video: true },
      (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream);

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      },
      (err) => {
        const videoTrack = createEmptyVideoTrack({ width: 640, height: 480 });
        const mediaStream = new MediaStream([videoTrack]);
        const call = peerInstance.current.call(remotePeerId, mediaStream);

        call.on('stream', (remoteStream) => {
          console.log(remoteStream);
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      }
    );
  };

  const createEmptyVideoTrack = ({ width, height }) => {
    const canvas = Object.assign(document.createElement('canvas'), {
      width,
      height,
    });
    canvas.getContext('2d').fillRect(0, 0, width, height);

    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];

    return Object.assign(track, { enabled: false });
  };

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        className="border-2"
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={remoteVideoRef} />
      </div>
      <div className="mt-10">
        <video ref={currentUserVideoRef} />
      </div>
    </div>
  );
}

export default Webrtc;
