import _ from 'lodash';
import React, { useRef, useState } from "react";
import { Container, FlexBox, Image, Index, LeftMask, LeftMaskDrag, RightMask, RightMaskDrag } from "./Components";

const LONG_DUMMY_INDICES = _.toArray(_.range(0, 100));
const LONG_DUMMY_IMGS = _.map(_.toArray(_.range(0, 100)), (item, index) => `images/image${item % 15 + 1}.jpeg`);

const STANDARD_DUMMY_INDICES = _.toArray(_.range(0, 20));

const SHORT_DUMMY_INDICES = _.toArray(_.range(0, 11));
const SHORT_DUMMY_IMGS = _.map(_.toArray(_.range(0, 11)), (item, index) => `images/image${item % 15 + 1}.jpeg`);




function App() {
  const [startFrameIndex, setStartFrameIndex] = useState(4);
  const [endFrameIndex, setEndFrameIndex] = useState(16);
  const [isStartDragging, setIsStartDragging] = useState(false);
  const [isEndDragging, setIsEndDragging] = useState(false);
  const [isBarDragging, setIsBarDragging] = useState(false);


  return (
    <Container>
      <LeftMask startFrameIndex={startFrameIndex} />
      <RightMask endFrameIndex={endFrameIndex} />
        {_.map(
          _.lt(LONG_DUMMY_INDICES.length, 30) ? STANDARD_DUMMY_INDICES : LONG_DUMMY_INDICES,
          (frameIndex) => (
            <FlexBox frameIndex={frameIndex} column>
              <Index>{frameIndex}</Index>
              <Image src={frameIndex % 5 === 0 ? LONG_DUMMY_IMGS[frameIndex] : undefined} />
            </FlexBox>)
        )}
      
      <LeftMaskDrag startFrameIndex={startFrameIndex} />
      <RightMaskDrag endFrameIndex={endFrameIndex} />
    </Container>
  );
}

export default React.memo(App);
