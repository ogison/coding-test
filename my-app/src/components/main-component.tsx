import React, { useState } from 'react';
import ChartComponent from './chart-component';
import { FormValues } from '../types';
import FormComponent from './form-component';
import styled from 'styled-components';
import TitleComponent from './title-component';

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

const GrapphDiv = styled.div`
  height: 780px;
`;

const MainComponent: React.FC = () => {
  const [selectedData, setSelectedData] = useState<FormValues>();
  return (
    <BackgroundDiv className="py-1">
      <ContentDiv>
        <TitleComponent />
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
