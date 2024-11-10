import React, { useState } from 'react';
import ChartComponent from './chart-component';
import { FormValues } from '../types';
import { ChartNoAxesColumn } from 'lucide-react';
import FormComponent from './form-component';
import styled from 'styled-components';

const BackgroundDiv = styled.div`
  background-image: url('/image 20.svg');
  background-color: black;
  color: white;
  width: 1920px;
  height: 956px;
`;

const ContentDiv = styled.div`
  width: 1840px;
  margin: 0 auto;
`;

const TitleDiv = styled.div`
  height: 56px;
`;

const ChartWrapper = styled.div`
  width: 27px;
  height: 30px;
  align-self: center;
`;

const Title = styled.h1`
  width: 128px;
  height: 40px;
  font-size: 2rem;
  white-space: nowrap;
`;

const Subtitle = styled.span`
  width: 131px;
  height: 21px;
  white-space: nowrap;
  align-self: center;
`;

const GrapphDiv = styled.div`
  height: 780px;
`;

const MainComponent: React.FC = () => {
  const [selectedData, setSelectedData] = useState<FormValues>();
  return (
    <BackgroundDiv className="py-1">
      <ContentDiv>
        <TitleDiv className="flex justify-start mt-8">
          <ChartWrapper className="items-center ">
            <ChartNoAxesColumn className="bg-white text-black " />
          </ChartWrapper>
          <Title className="ml-1">取引価格</Title>
          <Subtitle className="ml-1 items-center">※取引面積1㎡あたり</Subtitle>
        </TitleDiv>
        <hr className="border-t border-white w-full" />
        <GrapphDiv className="flex py-4 my-2 mt-8">
          <div className="w-4/5">
            <ChartComponent selectedData={selectedData} />
          </div>
          <FormComponent setSelectedData={setSelectedData} />
        </GrapphDiv>
      </ContentDiv>
    </BackgroundDiv>
  );
};

export default MainComponent;
