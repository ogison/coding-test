import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import jsonData from '../data/estate_transactions.json';
import { FormValues, JSONData } from '../types';
import { ChartData } from '../types/chart';
import { CalendarCheck, MapPin, SquareStack } from 'lucide-react';
import styled from 'styled-components';
import { kindsList } from '../const';

const TitleDiv = styled.div`
  width: 402px;
  height: 30px;
`;

const LocationDiv = styled.div`
  width: 98px;
  height: 30px;
`;

const YearDiv = styled.div`
  width: 106px;
  height: 30px;
`;

const KindDiv = styled.div`
  width: 102px;
  height: 30px;
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return ` ${context.raw.toLocaleString()} 円/㎡`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '円/㎡',
        color: '#ffffff',
      },
      ticks: {
        color: '#ffffff',
        callback: function (value: string | number) {
          if (typeof value === 'number') {
            return `${value.toLocaleString()}`;
          }
          return value;
        },
      },
      grid: {
        color: '#ffffff',
        borderColor: '#ffffff',
        display: true,
        drawBorder: true,
        drawOnChartArea: false,
        borderWidth: 2,
      },
    },
    x: {
      ticks: {
        color: '#ffffff',
      },
      grid: {
        color: '#ffffff',
        borderColor: '#ffffff',
        display: true,
        drawBorder: true,
        drawOnChartArea: true,
        borderWidth: 2,
      },
    },
  },
};

function getNameByValue(value: string | undefined) {
  if (!value) {
    return '';
  }

  const kind = kindsList.find((item) => item.value === value);
  return kind ? kind.name : '';
}

type Prop = {
  selectedData: FormValues | undefined;
};

const ChartComponent: React.FC<Prop> = ({ selectedData }) => {
  const [data, setData] = useState<JSONData | null>(null);
  const [averageData, setAverageData] = useState<number>();
  const [chartData, setChartData] = useState<ChartData>({
    labels: [jsonData[0].data.result.prefectureCode, '関東平均'],
    datasets: [
      {
        label: 'Price (円/㎡)',
        data: [jsonData[0].data.result.years[0].value, 0],
        backgroundColor: ['rgba(0, 204, 204, 0.8)', 'rgba(128, 128, 128, 0.8)'],
        borderColor: ['rgba(0, 204, 204, 1)', 'rgba(128, 128, 128, 1)'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const targetData = jsonData
      .filter((entry) => entry.year === Number(selectedData?.year))
      .filter((entry) => entry.type === Number(selectedData?.kind))
      .filter(
        (entry) => entry.data.result.prefectureName === selectedData?.location
      );
    setData(targetData[0]);
    const filteredData = jsonData
      .filter((entry) => entry.year === 2015)
      .filter((entry) => entry.type === 1)
      .flatMap((entry) => entry.data.result.years)
      .filter((yearEntry) => yearEntry.year === 2015);
    const totalValue = filteredData.reduce(
      (sum, yearEntry) => sum + yearEntry.value,
      0
    );
    const averageValue =
      filteredData.length > 0 ? totalValue / filteredData.length : 0;
    setAverageData(averageValue);
  }, [selectedData]);

  useEffect(() => {
    if (data) {
      const updatedChartData: ChartData = {
        labels: [data.data.result.prefectureName, '関東平均'],
        datasets: [
          {
            label: 'Price (円/㎡)',
            data: [data.data.result.years[0].value, averageData ?? 0],
            backgroundColor: [
              'rgba(0, 204, 204, 0.8)',
              'rgba(128, 128, 128, 0.8)',
            ],
            borderColor: ['rgba(0, 204, 204, 1)', 'rgba(128, 128, 128, 1)'],
            borderWidth: 1,
          },
        ],
      };
      setChartData(updatedChartData);
    }
  }, [averageData, data]);

  if (!data) {
    return <div />;
  }

  return (
    <div className="chart-container flex flex-col items-center">
      <TitleDiv className="flex text-center space-x-2 items-center justify-between">
        <LocationDiv>
          <div className="flex items-center">
            <MapPin />
            <p className="text-2xl">{selectedData?.location}</p>
          </div>
        </LocationDiv>
        <YearDiv>
          <div className="flex items-center">
            <CalendarCheck />
            <p className="text-2xl ml-1">{selectedData?.year}年</p>
          </div>
        </YearDiv>
        <KindDiv>
          <div className="flex items-center">
            <SquareStack />
            <p className="text-2xl ml-1">
              {getNameByValue(selectedData?.kind)}
            </p>
          </div>
        </KindDiv>
      </TitleDiv>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
