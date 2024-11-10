export type FormValues = {
  location: string;
  year: string;
  kind: string;
};

export interface JSONData {
  year: number;
  prefectureCode: number;
  type: number;
  data: Data;
}

interface Data {
  result: PrefectureData;
}

interface PrefectureData {
  prefectureCode: string;
  prefectureName: string;
  type: string;
  years: YearData[];
}

interface YearData {
  year: number;
  value: number;
}
