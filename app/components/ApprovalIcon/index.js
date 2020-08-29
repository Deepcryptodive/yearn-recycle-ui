import React from 'react';
import styled from 'styled-components';
import Spinner from 'components/Spinner';
import doneImg from './done.png';
import waitingImg from './waiting.png';

const Wrapper = styled.div``;

const Img = styled.img`
  height: 24px;
`;

export default function Component(props) {
  const { approved } = props;
  if (approved === undefined) {
    return (
      <Wrapper>
        <Img src={waitingImg} />
      </Wrapper>
    );
  }
  if (approved) {
    return (
      <Wrapper>
        <Img src={doneImg} />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Spinner size="small" />
    </Wrapper>
  );
}
