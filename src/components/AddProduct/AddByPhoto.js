import { Button } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import Scanner from './Scanner';

const AddByPhoto = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);
  const scannerRef = useRef(null);
  console.log(scannerRef);
  return (
    <div>
      <Button colorScheme={'teal'} onClick={() => setScanning(!scanning)}>
        {scanning ? 'Stop' : 'Start'}
      </Button>
      <ul className='results'>
        {/* {results.map(
          (result) =>
            result.codeResult && (
              <Result key={result.codeResult.code} result={result} />
            )
        )} */}
      </ul>
      <div
        ref={scannerRef}
        style={{
          position: 'relative',
          // border: '3px solid red'
        }}
      >
        {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
        <canvas
          className='drawingBuffer'
          style={{
            position: 'absolute',
            top: '0px',
            // left: '0px',
            // height: '100%',
            // width: '100%',
            // border: '3px solid green',
          }}
          width='640'
          height='480'
        />
        {scanning ? (
          <Scanner
            scannerRef={scannerRef}
            onDetected={(result) => setResults([...results, result])}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AddByPhoto;
