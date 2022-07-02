import React, { useRef, useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';

export const AddByPhoto = () => {
  const [photo, setPhoto] = useState();
  const photoRef = useRef();
  useEffect(() => {
    setPhoto(photoRef.current.files);
    console.log(photo[0]);
  }, [photoRef, photo]);

  return (
    <div>
      <Input ref={photoRef} accept='image/*' type='file' />
    </div>
  );
};
