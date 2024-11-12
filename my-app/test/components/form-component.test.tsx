import { render, screen, fireEvent } from '@testing-library/react';
import FormComponent from '../../src/components/form-component';
import '@testing-library/jest-dom';
import { kindsList } from '../../src/const';
import { vi } from 'vitest';

describe('FormComponent', () => {
  const mockSetSelectedData = vi.fn();

  beforeEach(() => {
    mockSetSelectedData.mockClear();
  });

  test('ラベルが正しく表示されること', () => {
    render(<FormComponent setSelectedData={mockSetSelectedData} />);

    expect(screen.getByLabelText('場所')).toBeInTheDocument();
    expect(screen.getByLabelText('年度')).toBeInTheDocument();
    kindsList.forEach((kind) => {
      expect(screen.getByLabelText(kind.name)).toBeInTheDocument();
    });
  });

  test('フォームのデフォルト値が正しく設定されていること', () => {
    render(<FormComponent setSelectedData={mockSetSelectedData} />);

    expect(screen.getByLabelText('場所')).toHaveValue('東京都');
    expect(screen.getByLabelText('年度')).toHaveValue('2018');
    expect(screen.getByLabelText('住宅地')).toBeChecked();
  });
});
