import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { MdCameraAlt, MdOutlineCameraAlt } from 'react-icons/md';

function Photo() {
  const [source, setSource] = useState('');

  useEffect(() => {}, [source]);

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        // console.log(newUrl);
        setSource(newUrl);
      }
    }
  };
  return (
    <div>
      {source === '' ? (
        <></>
      ) : (
        <div className="h-auto w-auto mx-auto mt-5">
          <h3 className="text-lg font-medium ">Photo</h3>
          <img src={source} alt={'snap'} width="600" height="520"></img>
        </div>
      )}

      <div className="mt-5 ">
        <input
          accept="image/* "
          className="hidden"
          id="icon-button-file"
          type="file"
          capture="environment"
          onChange={(e) => handleCapture(e.target)}
        />

        {source === '' ? (
          <Button
            rightIcon={<MdOutlineCameraAlt />}
            colorScheme="blue"
            variant="outline"
          >
            <label htmlFor="icon-button-file">Take a picture</label>
          </Button>
        ) : (
          <Button
            rightIcon={<MdCameraAlt />}
            colorScheme="blue"
            variant="outline"
          >
            <label htmlFor="icon-button-file">Take another picture</label>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Photo;
