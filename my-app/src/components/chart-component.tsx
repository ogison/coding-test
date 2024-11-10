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
      },
      ticks: {
        callback: function (value: string | number) {
          if (typeof value === 'number') {
            return `${value.toLocaleString()}`;
          }
          return value;
        },
      },
    },
  },
};

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
      .filter((entry) => entry.year === selectedData?.year)
      .filter((entry) => entry.type === selectedData?.category)
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
    <div className="chart-container items-center">
      <div className="flex text-center mb-4">
        <MapPin />
        <p>{data.data.result.prefectureName}</p>
        <CalendarCheck />
        <p>{data.year}</p>
        <SquareStack />
        <p>住宅地</p>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
