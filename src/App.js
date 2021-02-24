import _ from 'lodash';
import React, { useEffect, useRef, useState } from "react";
import { Container, EmptyBox, FlexBox, Image, Index, IndexBackground, LeftMask, LeftMaskDrag, RightMask, RightMaskDrag } from "./Components";

const LONG_DUMMY_INDICES = _.toArray(_.range(0, 87));
const LONG_DUMMY_IMGS = _.map(_.toArray(_.range(0, 87)), (item, index) => `images/image${item % 15 + 1}.jpeg`);

const STANDARD_DUMMY_INDICES = _.toArray(_.range(0, 20));

const SHORT_DUMMY_INDICES = _.toArray(_.range(0, 11));
const SHORT_DUMMY_IMGS = _.map(_.toArray(_.range(0, 11)), (item, index) => `images/image${item % 15 + 1}.jpeg`);

function App() {
  const [startFrameIndex, setStartFrameIndex] = useState(4);
  const [endFrameIndex, setEndFrameIndex] = useState(20);
  const [isStartDragging, setIsStartDragging] = useState(false);
  const [isEndDragging, setIsEndDragging] = useState(false);
  
  let innerStart;
  let innerEnd;

  useEffect(() => {
    if (_.isUndefined(startFrameIndex) && !_.isUndefined(innerStart)) {
      setStartFrameIndex(innerStart);
    }
    if (_.isUndefined(endFrameIndex) && !_.isUndefined(innerEnd)) {
      setEndFrameIndex(innerEnd);
    }
  }, [endFrameIndex, innerEnd, innerStart, startFrameIndex])

  const handleLeftDragStart = (event) => {
    if (!isStartDragging) {
      setIsStartDragging(true);
    }
    event.target.style.opacity = 0;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', startFrameIndex);
  }

  
  const handleRightMouseEnter = (event) => {
    if (!isEndDragging) {
      setIsEndDragging(true);
    }
  }
  
  const handleRightDragStart= (event) => {
    event.target.style.opacity = 0;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', endFrameIndex);
  }
  
  const handleDragOver = (event, frameIndex) => {
    event.preventDefault();
    if (isStartDragging && frameIndex !== startFrameIndex && frameIndex < endFrameIndex - 15) {
      innerStart = frameIndex;
    } else if (isEndDragging && frameIndex !== endFrameIndex && frameIndex >= startFrameIndex + 15) {
      innerEnd = frameIndex + 1;
    }
  }
  
  const handleDragEnd = (event) => {
    if (isStartDragging) {
      event.target.style.opacity = 1;
      setIsStartDragging(false);
      if (!_.isUndefined(innerStart)) {
        setStartFrameIndex(innerStart);
        innerStart = 0;
      } else {
        innerStart = startFrameIndex;
      }
    } else if (isEndDragging) {
      event.target.style.opacity = 1;
      setIsEndDragging(false);
      if (!_.isUndefined(innerEnd)) {
        setEndFrameIndex(innerEnd);
        innerEnd = 0;
      } else {
        innerEnd = endFrameIndex;
      }
    }
  }

  const handleMouseOut = (event) => {
    if (isStartDragging) {
      event.target.style.opacity = 1;
      setIsStartDragging(false);
    } else if (isEndDragging) {
      event.target.style.opacity = 1;
      setIsEndDragging(false);
    }
  }

  return (
    <Container>
      <IndexBackground
        left={`${startFrameIndex * 2}%`}
        width={`${(endFrameIndex - startFrameIndex) * 2}%`}
      />
      <LeftMask startFrameIndex={startFrameIndex} />
      <RightMask
        endFrameIndex={endFrameIndex}
        width={`${((_.lt(LONG_DUMMY_INDICES.length, 50) ? STANDARD_DUMMY_INDICES.length : LONG_DUMMY_INDICES.length) - endFrameIndex) * 2}%`} />
      {_.map(
        _.lt(LONG_DUMMY_INDICES.length, 50) ? STANDARD_DUMMY_INDICES : LONG_DUMMY_INDICES,
        (frameIndex, idx) => (
          <FlexBox 
            key={`flex-${idx}`}
            frameIndex={frameIndex}
            column
            width='2%'
            zIndex={30}
          >
            <Index key={`index-${idx}`}>
              {frameIndex}
            </Index>
            <Image
              key={`image-${idx}`}
              wide={frameIndex % 5 === 0}
              draggable={false}
              src={frameIndex % 5 === 0 ? LONG_DUMMY_IMGS[frameIndex] : undefined}
            />
          </FlexBox>)
      )}
      <FlexBox
        width={`${(_.lt(LONG_DUMMY_INDICES.length, 50) ? STANDARD_DUMMY_INDICES.length : LONG_DUMMY_INDICES.length) * 2}%`}
        zIndex={50}
      >
        {_.map(
          _.lt(LONG_DUMMY_INDICES.length, 50) ? STANDARD_DUMMY_INDICES : LONG_DUMMY_INDICES,
         (frameIndex, idx) => (
          <EmptyBox
            onDragOver={(event) => handleDragOver(event, frameIndex)}
            frameIndex={frameIndex}
            key={`emptybox-${idx}`}
          />
        ))}
      </FlexBox>
      <LeftMaskDrag 
        startFrameIndex={startFrameIndex}
        draggable
        onDragStart={handleLeftDragStart}
        onDragEnd={handleDragEnd}
        onMouseOut={handleMouseOut}
      />
      <RightMaskDrag 
        endFrameIndex={endFrameIndex}
        draggable
        onMouseEnter={handleRightMouseEnter}
        onDragStart={handleRightDragStart}
        onDragEnd={handleDragEnd}
        onMouseOut={handleMouseOut}
      />
    </Container>
  );
}

export default React.memo(App);
