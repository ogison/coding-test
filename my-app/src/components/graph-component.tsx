import React, { useEffect, useRef, useState } from 'react';
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
import { GraphData } from '../types/chart';
import styled from 'styled-components';
import { kindsList } from '../const';

const TitleDiv = styled.div`
  width: 402px;
  height: 30px;
`;

const PlaceImg = styled.img`
  width: 14px;
  height: 18px;
`;

const PlaceDiv = styled.div`
  width: 98px;
  height: 30px;
`;

const YearImg = styled.img`
  width: 16px;
  height: 18px;
`;

const YearDiv = styled.div`
  width: 106px;
  height: 30px;
`;

const KindsImg = styled.img`
  width: 18px;
  height: 18px;
`;

const KindDiv = styled.div`
  width: 102px;
  height: 30px;
`;

const GraphDiv = styled.div`
  width: 660px;
  height: 446px;
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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: false,
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
        drawTicks: false,
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

const GraphComponent: React.FC<Prop> = ({ selectedData }) => {
  const chartRef = useRef<ChartJS<'bar'> | null>(null);
  const [data, setData] = useState<JSONData | null>(null);
  const [averageData, setAverageData] = useState<number>();
  const [graghData, setGraghData] = useState<GraphData>({
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

  const createGradient = (ctx: any, chartArea: any) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      chartArea.right,
      0
    );

    gradient.addColorStop(0.2403, '#009984');
    gradient.addColorStop(0.7573, '#97BF4A');

    return gradient;
  };

  const createGradientAverage = (
    ctx: CanvasRenderingContext2D,
    chartArea: any
  ) => {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      chartArea.right,
      chartArea.bottom
    );
    gradient.addColorStop(0, '#706D65');
    gradient.addColorStop(0.9992, '#57544C');

    return gradient;
  };

  useEffect(() => {
    const targetData = jsonData
      .filter((entry) => entry.year === Number(selectedData?.year))
      .filter((entry) => entry.type === Number(selectedData?.kind))
      .filter(
        (entry) => entry.data.result.prefectureName === selectedData?.place
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
    const chart = chartRef.current;
    if (data && chart) {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const gradient = createGradient(ctx, chartArea);
      const gradientAverage = createGradientAverage(ctx, chartArea);
      const updatedgraghData: GraphData = {
        labels: [data.data.result.prefectureName, '関東平均'],
        datasets: [
          {
            label: 'Price (円/㎡)',
            data: [data.data.result.years[0].value, averageData ?? 0],
            backgroundColor: [gradient, gradientAverage],
            borderColor: [gradient, gradientAverage],
            borderWidth: 1,
          },
        ],
      };
      setGraghData(updatedgraghData);
    }
  }, [averageData, data]);

  if (!data) {
    return <div />;
  }

  return (
    <div className="chart-container flex flex-col items-center">
      <TitleDiv className="flex text-center space-x-2 items-center justify-between mt-32 mb-4">
        <PlaceDiv>
          <div className="flex items-center">
            <PlaceImg src={'./place-white.svg'} alt="place" />
            <p className="text-2xl ml-1">{selectedData?.place}</p>
          </div>
        </PlaceDiv>
        <YearDiv>
          <div className="flex items-center">
            <YearImg src={'./year-white.svg'} alt="year" />
            <p className="text-2xl ml-1">{selectedData?.year}年</p>
          </div>
        </YearDiv>
        <KindDiv>
          <div className="flex items-center">
            <KindsImg src={'./kinds-white.svg'} alt="kinds" />
            <p className="text-2xl ml-1">
              {getNameByValue(selectedData?.kind)}
            </p>
          </div>
        </KindDiv>
      </TitleDiv>
      <div className="flex flex-col">
        <div className="flex flex-col items-start mr-4"> (円/m&#178;)</div>
        <GraphDiv className="flex items-center">
          <Bar ref={chartRef} data={graghData} options={options} />
        </GraphDiv>
      </div>
    </div>
  );
};

export default GraphComponent;
