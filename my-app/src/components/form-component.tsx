import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from '../types';
import { CalendarCheck, MapPin, SquareStack } from 'lucide-react';
import styled from 'styled-components';

const FormDiv = styled.div`
  background-color: white;
  color: black;
  width: 359px;
  height: 780px;
`;

type Prop = {
  setSelectedData: (data: FormValues) => void;
};

const FormComponent: React.FC<Prop> = ({ setSelectedData }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      location: '東京都',
      year: 2018,
      category: 1,
    },
  });

  const years = [2015, 2016, 2017, 2018];
  const kantoPrefectures = [
    '東京都',
    '神奈川県',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
  ];
  const categories = [
    { value: 1, name: '住宅地' },
    { value: 2, name: '商業地' },
  ];

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSelectedData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormDiv className="bg-gray-100 text-black p-6 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">表示内容を選択</h2>

        <table className="w-full mb-6">
          <tbody>
            <tr className="mb-4">
              <td className="flex items-center mb-2">
                <MapPin />
                <span>場所</span>
              </td>
              <td>
                <select
                  {...register('location')}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                >
                  {kantoPrefectures.map((prefecture) => (
                    <option key={prefecture} value={prefecture}>
                      {prefecture}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr className="mb-4">
              <td className="flex items-center mb-2">
                <CalendarCheck />
                <span>年度</span>
              </td>
              <td>
                <select
                  {...register('year')}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                >
                  {years.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}年
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr className="mb-6">
              <td className="flex items-center mb-2">
                <SquareStack />
                <span>種類</span>
              </td>
              <td>
                <div className="flex flex-col">
                  {categories.map((category) => (
                    <label
                      key={category.value}
                      className="flex items-center mb-2"
                    >
                      <input
                        {...register('category')}
                        type="radio"
                        value={category.value}
                        className="form-radio text-blue-500"
                      />
                      <span className="ml-2">{category.name}</span>
                    </label>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          表示する
        </button>
      </FormDiv>
    </form>
  );
};

export default FormComponent;
