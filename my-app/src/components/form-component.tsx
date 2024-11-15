import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from '../types';
import styled from 'styled-components';
import { kantoPrefectures, kindsList, yearsList } from '../const';

const FormDiv = styled.div`
  background-color: #f0f3f5;
  color: black;
  width: 359px;
  height: 780px;
`;

const FormContentDiv = styled.div`
  padding: 24px;
`;

const TitleDiv = styled.div`
  height: 48px;
`;

const PlaceTr = styled.tr`
  width: 309px;
  height: 88px;
`;

const PlaceDiv = styled.div`
  width: 45px;
  height: 21px;
  white-space: nowrap;
`;

const PlaceImg = styled.img`
  width: 11px;
  height: 14px;
`;

const YearTr = styled.tr`
  width: 309px;
  height: 88px;
`;

const YearDiv = styled.div`
  width: 47px;
  height: 21px;
  white-space: nowrap;
`;

const YearImg = styled.img`
  width: 13px;
  height: 14px;
`;

const KindsTr = styled.tr`
  width: 309px;
  height: 88px;
`;

const KindsDiv = styled.div`
  width: 48px;
  height: 21px;
  white-space: nowrap;
`;

const KindsImg = styled.img`
  width: 14px;
  height: 14px;
`;

const KindsInput = styled.input`
  width: 24px;
  height: 24px;
`;

const KindsRadioDiv = styled.div`
  width: 239px;
  height: 60px;
`;

const Select = styled.select`
  width: 240px;
  height: 40px;
`;

const ButtonWrapper = styled.div`
  width: 311px;
  height: 424px;
`;

const Button = styled.button`
  background-color: #0071c1;
  width: 311px;
  height: 52px;
`;

type Prop = {
  setSelectedData: (data: FormValues) => void;
};

const FormComponent: React.FC<Prop> = ({ setSelectedData }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      place: '東京都',
      year: '2018',
      kind: '1',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSelectedData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormDiv className="bg-gray-100 text-black flex flex-col justify-between">
        <FormContentDiv>
          <div>
            <TitleDiv className="text-lg border-b border-gray-300">
              表示内容を選択
            </TitleDiv>
            <table className="w-full">
              <tbody>
                <PlaceTr className="border-b border-gray-300">
                  <td>
                    <PlaceDiv className="flex items-center">
                      <PlaceImg src={'./place.svg'} alt="place" />
                      <span id="placeLabel" className="ml-1">
                        場所
                      </span>
                    </PlaceDiv>
                  </td>
                  <td>
                    <div className="flex justify-end items-center">
                      <Select
                        {...register('place')}
                        className="p-2 rounded"
                        aria-labelledby="placeLabel"
                      >
                        {kantoPrefectures.map((prefecture) => (
                          <option key={prefecture} value={prefecture}>
                            {prefecture}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </td>
                </PlaceTr>

                <YearTr className="border-b border-gray-300">
                  <td>
                    <YearDiv className="flex items-center">
                      <YearImg src={'./year.svg'} alt="year" />
                      <span id="yearLabel" className="ml-1">
                        年度
                      </span>
                    </YearDiv>
                  </td>
                  <td>
                    <div className="flex justify-end items-center">
                      <Select
                        {...register('year')}
                        className="w-full p-2"
                        aria-labelledby="yearLabel"
                      >
                        {yearsList.map((year) => (
                          <option key={year} value={year}>
                            {year}年
                          </option>
                        ))}
                      </Select>
                    </div>
                  </td>
                </YearTr>

                <KindsTr>
                  <td>
                    <KindsDiv className="flex items-center mb-5">
                      <KindsImg src={'./kinds.svg'} alt="kinds" />
                      <span id="kindLabel" className="ml-1">
                        種類
                      </span>
                    </KindsDiv>
                  </td>
                  <td>
                    <KindsRadioDiv className="flex flex-col justify-end ml-auto">
                      {kindsList.map((kind) => (
                        <label
                          key={kind.value}
                          className="flex items-center mt-1"
                        >
                          <KindsInput
                            {...register('kind')}
                            type="radio"
                            value={kind.value}
                            className="form-radio text-blue-500"
                          />
                          <span className="ml-2">{kind.name}</span>
                        </label>
                      ))}
                    </KindsRadioDiv>
                  </td>
                </KindsTr>
              </tbody>
            </table>
          </div>

          <ButtonWrapper className="flex flex-col justify-end">
            <Button
              type="submit"
              className=" text-white w-full"
              data-testid="displayButton"
            >
              表示する
            </Button>
          </ButtonWrapper>
        </FormContentDiv>
      </FormDiv>
    </form>
  );
};

export default FormComponent;
