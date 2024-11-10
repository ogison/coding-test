import React from 'react';
import styled from 'styled-components';

const TitleDiv = styled.div`
  height: 56px;
`;

const LogoImg = styled.img`
  width: 27px;
  height: 30px;
  align-self: center;
`;

const TitleFrameDiv = styled.div`
  width: 163px;
  height: 40px;
`;

const Title = styled.h1`
  width: 128px;
  height: 40px;
  font-size: 2rem;
  white-space: nowrap;
  align-self: center;
  line-height: 40px;
`;

const Subtitle = styled.div`
  width: 131px;
  height: 21px;
  white-space: nowrap;
  align-self: center;
  font-size: 14px;
`;
const TitleComponent: React.FC = () => {
  return (
    <TitleDiv className="flex justify-start mt-8">
      <TitleFrameDiv className="flex items-center">
        <LogoImg src={'./logo-title.svg'} alt="logo" />
        <Title className="ml-1">取引価格</Title>
      </TitleFrameDiv>

      <Subtitle className="ml-1 items-center">※取引面積1㎡あたり</Subtitle>
    </TitleDiv>
  );
};

export default TitleComponent;
