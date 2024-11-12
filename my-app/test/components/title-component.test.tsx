import { render, screen } from '@testing-library/react';
import TitleComponent from '../../src/components/title-component';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('TitleComponent', () => {
  it('画像が正しく表示されていること', () => {
    render(<TitleComponent />);

    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', './logo-title.svg');
    expect(logoImage).toHaveStyle({
      width: '27px',
      height: '30px',
    });
  });

  it('文言が正しく表示されていること', () => {
    render(<TitleComponent />);

    expect(screen.getByText('取引価格')).toBeInTheDocument();
    expect(screen.getByText('※取引面積1㎡あたり')).toBeInTheDocument();
  });
});
