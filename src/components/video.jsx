import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { MdOutlineVideoCameraBack, MdVideoCameraBack } from 'react-icons/md';

function Video() {
  const [video, setVideo] = useState('');
  const elementRef = useRef();

  useEffect(() => {
    const player = elementRef.current;
    if (video !== '') {
      player.src = video;
    }
  }, [video]);

  const handleVideo = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setVideo(newUrl);
      }
    }
  };

  return (
    <div className="mt-6 ">
      {video === '' ? (
        <></>
      ) : (
        <div className="h-auto w-auto mx-auto mt-5">
          <h3 className="text-lg font-medium ">Video</h3>
          <video ref={elementRef} width="600" height="520" controls></video>
        </div>
      )}

      <div className="mt-5">
        <input
          type="file"
          accept="video/*"
          id="video"
          capture
          className="hidden"
          onChange={(e) => handleVideo(e.target)}
        />
        {video === '' ? (
          <Button
            rightIcon={<MdOutlineVideoCameraBack />}
            colorScheme="blue"
            variant="outline"
          >
            <label htmlFor="video">Capture Video</label>
          </Button>
        ) : (
          <Button
            rightIcon={<MdVideoCameraBack />}
            colorScheme="blue"
            variant="outline"
          >
            <label htmlFor="video">Capture Another Video</label>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Video;
