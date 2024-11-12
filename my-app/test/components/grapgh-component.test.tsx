import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { FormValues } from '../../src/types';
import GraphComponent from '../../src/components/graph-component';

vi.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="chart">Chart</div>,
}));

describe('GraphComponent', () => {
  const selectedData: FormValues = {
    place: '東京都',
    year: '2015',
    kind: '1',
  };

  test('コンポーネントが正しくレンダリングされる', async () => {
    render(<GraphComponent selectedData={selectedData} />);

    expect(screen.getByText('東京都')).toBeTruthy();
    expect(screen.getByText('2015年')).toBeTruthy();
    expect(screen.getByText('住宅地')).toBeTruthy();

    expect(screen.getByTestId('chart')).toBeTruthy();
  });

  test('選択データが変更されたときに再レンダリングされる', async () => {
    const { rerender } = render(<GraphComponent selectedData={selectedData} />);

    const newSelectedData: FormValues = {
      place: '神奈川県',
      year: '2016',
      kind: '2',
    };

    rerender(<GraphComponent selectedData={newSelectedData} />);

    await waitFor(() => {
      expect(screen.getByText('神奈川県')).toBeTruthy();
      expect(screen.getByText('2016年')).toBeTruthy();
      expect(screen.getByText('商業地')).toBeTruthy();

      expect(screen.getByTestId('chart')).toBeTruthy();
    });
  });
});
