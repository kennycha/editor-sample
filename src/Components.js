import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: ${({ width }) => width};
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
  z-index: 40;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
`

export const LeftMaskDrag = styled.div`
  width: 2%;
  height: calc(100% - 40px);
  position: absolute;
  z-index: 60;
  top: 0;
  left: ${({ startFrameIndex }) => `${startFrameIndex * 2}%`};
  margin-top: 30px;
  cursor: pointer;

  background-color: yellow;
`

export const RightMask = styled.div`
  width: ${({ width }) => width};
  height: 100%;
  display: inline-block;
  position: absolute;
  z-index: 40;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: ${({ endFrameIndex }) => `${(endFrameIndex) * 2}%`};
`

export const RightMaskDrag = styled.div`
  width: 2%;
  height: calc(100% - 40px);
  position: absolute;
  z-index: 60;
  top: 0;
  left: ${({ endFrameIndex }) => `${(endFrameIndex - 1) * 2}%`};
  margin-top: 30px;
  cursor: pointer;

  background-color: yellow;
`

export const Index = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(189, 189, 189);
`

export const IndexBackground = styled.div`
  width: ${({ width }) => width};
  height: 20px;
  position: absolute;
  border-radius: 5px;
  left: ${({ left }) => left};
  background-color: #3785F7;
`

export const Image = styled.img`
  width: ${({ wide }) => wide ? '500%' : '0'};
  z-index: 10;
  margin-top: 10px;
  margin-bottom: 10px; 
  height: calc(100% - 40px);
`

export const FlexBox = styled.div`
  width: ${({ width }) => width};
  height: 100%;
  display: flex;
  flex-direction: ${({ column }) => column ? 'column' : undefined};
  position: absolute;
  z-index: ${({ zIndex }) => zIndex};
  left: ${({ frameIndex }) => `${frameIndex * 2}%`};
`

export const EmptyBox = styled.div`
  width: 2%;
  height: 100%;
  left: ${({ frameIndex }) => `${frameIndex * 2}%`};
  opacity: 0;
`