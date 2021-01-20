import styled from "styled-components";
import _ from 'lodash';
import { useRef, useState } from "react";

const LONG_DUMMY_INDICES = _.toArray(_.range(0, 50));
const LONG_DUMMY_IMGS = _.map(_.toArray(_.range(0, 50)), (item, index) => `images/image${item % 15 + 1}.jpeg`);

const STANDARD_DUMMY_INDICES = _.toArray(_.range(0, 20));

const SHORT_DUMMY_INDICES = _.toArray(_.range(0, 11));
const SHORT_DUMMY_IMGS = _.map(_.toArray(_.range(0, 11)), (item, index) => `images/image${item % 15 + 1}.jpeg`);

const Title = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const PreviewCanvas = styled.canvas`
  border: 1px solid black;
  height: 150px;
  width: 150px;
`

const Container = styled.div`
  position: relative;
  margin-top: 15px;
  width: 100%;
  height: 400px;
  background-color: rgba(30, 30, 30, 1);
  overflow-x: scroll;
  white-space: nowrap;
`;

const ClickBox = styled.div`
  display: inline-block;
  position: absolute;
  left: ${({ frameIndex }) => `${frameIndex * 2}%`};
  width: 2%;
  height: 100%;
  background-color: ${({ selected }) => selected ? undefined : 'rgba(41, 41, 41, 0.5)'};
  cursor: ${({ canDrag }) => canDrag ? 'grab' : 'pointer'};
  z-index: 30;
  &:hover {
    background-color: ${({ canDrag }) => canDrag ? 'rgba(255, 255, 255, 0.7)' : undefined};
  };
`

const EditorContainer = styled.div`
  display: inline-block;
  width: 2%;
  height: 100%;
  color: white;
  z-index: 20;
`;

const IndexContainer = styled.div`
  background-color: ${({ selected }) => selected ? '#3785F7' : 'rgba(41, 41, 41, 1)'};
  height: 2rem;
  display: flex;
  align-items: center;
`

const ImageContainer = styled.div`
  position: relative;
  height: calc(100% - 6rem);
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: ${({ empty }) => empty ? 'rgba(30, 30, 30, 1)' : 'white'};
`

const Image = styled.img`
  width: ${({ src }) => !_.isUndefined(src) ? '500%' : undefined};
  height: 100%;
  position: absolute;
  z-index: ${({ src }) => !_.isUndefined(src) ? 10 : undefined};
`

const TimeLineBarContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 40;
  width: 1%;
  min-width: 1.5rem;
  height: calc(100% - 2rem);
  top: 2rem;
  left: ${({ currentFrameIndex }) => `${currentFrameIndex * 2}%`};
  cursor: pointer;
`

const TimeLineBar = styled.img`
  height: 100%;
`

function App() {
  const previewCanvasRef = useRef();
  const [startFrameIndex, setStartFrameIndex] = useState(0);
  const [endFrameIndex, setEndFrameIndex] = useState(16);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(4);
  const [isStartDragging, setIsStartDragging] = useState(false);
  const [isEndDragging, setIsEndDragging] = useState(false);
  const [isBarDragging, setIsBarDragging] = useState(false);

  const ClickComponent = ({ frameIndex }) => {
    const selected = frameIndex >= startFrameIndex && frameIndex < endFrameIndex;
    const canDrag = frameIndex === startFrameIndex || frameIndex === endFrameIndex - 1;
  
    const handleBoxMouseEnter = (event) => {
      if (frameIndex === startFrameIndex) {
        setIsStartDragging(true);
      } else if (frameIndex === endFrameIndex - 1) {
        setIsEndDragging(true);
      }
    };

    const handleBoxDragStart = (event) => {
      if (frameIndex === startFrameIndex) {
        event.target.style.opacity = 0;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', startFrameIndex);
      } else if (frameIndex === endFrameIndex - 1) {
        event.target.style.opacity = 0;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', endFrameIndex);
      }
    };

    const handleBoxDragOver = (event) => {
      event.preventDefault();
      if (isStartDragging) {
        if (frameIndex !== startFrameIndex && frameIndex < endFrameIndex - 15) {
          setStartFrameIndex(frameIndex);
        }
      } else if (isEndDragging) {
        if (frameIndex !== endFrameIndex && frameIndex >= startFrameIndex + 15) {
          setEndFrameIndex(frameIndex + 1);
        }
      }
    };

    const handleBoxDragEnd = (event) => {
      if (isStartDragging) {
        event.target.style.opacity = 1;
        setIsStartDragging(false);
      } else if (isEndDragging) {
        event.target.style.opacity = 1;
        setIsEndDragging(false);
      }
    };

    const handleBoxMouseOut = (event) => {
      if (isStartDragging) {
        setIsStartDragging(false);
      } else if (isEndDragging) {
        setIsEndDragging(false);
      }
    };

    return <ClickBox
      onMouseEnter={handleBoxMouseEnter}
      onMouseOut={handleBoxMouseOut}
      onDragStart={handleBoxDragStart}
      onDragOver={handleBoxDragOver}
      onDragEnd={handleBoxDragEnd}
      frameIndex={frameIndex}
      selected={selected}
      canDrag={canDrag}
      draggable={canDrag}
      />
  }
  
  const EditorComponent = ({ frameIndex }) => {
    const isEmpty = frameIndex >= LONG_DUMMY_INDICES.length;
    
    return (
      <EditorContainer>
        <IndexContainer selected={frameIndex >= startFrameIndex && frameIndex < endFrameIndex}>
          {frameIndex}
        </IndexContainer>
        <ImageContainer empty={isEmpty} >
          <Image src={frameIndex % 5 === 0 ? LONG_DUMMY_IMGS[frameIndex] : undefined} />
        </ImageContainer>
      </EditorContainer>)
  }

  return (
    <>
      <Title>Editor Sample</Title>
      <PreviewCanvas ref={previewCanvasRef} />
      <Container>
        <TimeLineBarContainer 
          currentFrameIndex={currentFrameIndex} 
          draggable
        >
          <TimeLineBar src='images/timeline_bar.svg' draggable={false} />
        </TimeLineBarContainer>
        {_.map(_.lt(LONG_DUMMY_INDICES.length, 30) ? STANDARD_DUMMY_INDICES : LONG_DUMMY_INDICES, (frameIndex) => <ClickComponent frameIndex={frameIndex} />)}
        {_.map(_.lt(LONG_DUMMY_INDICES.length, 30) ? STANDARD_DUMMY_INDICES : LONG_DUMMY_INDICES, (frameIndex) => {
          return <EditorComponent frameIndex={frameIndex} />
        })}
      </Container>
    </>
  );
}

export default App;
