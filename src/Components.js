import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow-x: scroll;
  white-space: nowrap;
  background-color: rgba(30, 30, 30, 1);
`

export const LeftMask = styled.div`
  width: ${({ startFrameIndex }) => `${startFrameIndex * 2}%`};
  height: 100%;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
`

export const LeftMaskDrag = styled.div`
  width: 2%;
  height: calc(100% - 4rem);
  position: absolute;
  top: 0;
  left: ${({ startFrameIndex }) => `${startFrameIndex * 2}%`};
  margin-top: 3rem;
  background-color: yellow;
`

export const RightMask = styled.div`
  width: ${({ endFrameIndex }) => `${100 - (endFrameIndex * 2)}%`};
  height: 100%;
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
`

export const RightMaskDrag = styled.div`
  width: 2%;
  height: calc(100% - 4rem);
  position: absolute;
  top: 0;
  left: ${({ endFrameIndex }) => `${endFrameIndex * 2}%`};
  margin-top: 3rem;
  background-color: yellow;
`

export const Index = styled.div`
  width: 100%;
  height: 2rem;
`

export const Image = styled.img`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem; 
  height: calc(100% - 4rem);
`

export const FlexBox = styled.div`
width: 2%;
  height: 100%;
  display: flex;
  flex-direction: ${({ column }) => column ? 'column' : undefined};
  position: absolute;
  left: ${({ frameIndex }) => `${frameIndex * 2}%`};
`