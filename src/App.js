import styled from "styled-components";
import _ from 'lodash';
import { useState } from "react";

const LONG_DUMMY_INDICES = _.toArray(_.range(0, 100));
const LONG_DUMMY_IMGS = _.map(_.toArray(_.range(0, 100)), (item, index) => `images/image${item % 15 + 1}.jpeg`);

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
  margin-top: 15px;
  width: 100%;
  height: 400px;
  background-color: rgba(30, 30, 30, 1);
  overflow-x: scroll;
  white-space: nowrap;
`;

const EditorContainer = styled.div`
  display: inline-block;
  width: 5%;
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
  /* object-fit: contain; */
`

function App() {
  const [startFrameIndex, setStartFrameIndex] = useState(3);
  const [endFrameIndex, setEndFrameIndex] = useState(8);
  
  const EditorComponent = ({ frameIndex }) => {
    const isEmpty = frameIndex >= SHORT_DUMMY_INDICES.length;
    return (
      <EditorContainer>
        <IndexContainer selected={frameIndex >= startFrameIndex && frameIndex <= endFrameIndex}>
          {frameIndex}
        </IndexContainer>
        <ImageContainer empty={isEmpty} >
          <Image src={frameIndex % 5 === 0 ? SHORT_DUMMY_IMGS[frameIndex] : undefined} />
        </ImageContainer>
      </EditorContainer>)
  }  

  return (
    <>
      <Title>Editor Sample</Title>
      <PreviewCanvas />
      <Container>
        {_.map(_.lt(SHORT_DUMMY_INDICES.length, 30) ? STANDARD_DUMMY_INDICES : SHORT_DUMMY_INDICES, (frameIndex) => {
          return <EditorComponent frameIndex={frameIndex} />
        })}
      </Container>
    </>
  );
}

export default App;
