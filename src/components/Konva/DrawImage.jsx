import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const DrawImage = ({img}) => {
  const [drawimg] = useImage(img);
  return (
    <Stage className='w-[100px]'>
      <Layer>
        <Image image={drawimg} x={150} />
      </Layer>
    </Stage>
  );
}

export default DrawImage