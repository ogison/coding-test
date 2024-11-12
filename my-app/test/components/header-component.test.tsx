import { render, screen } from '@testing-library/react';
import HeaderComponent from '../../src/components/header-component';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('HeaderComponent', () => {
  it('画像が正しく表示されていること', () => {
    render(<HeaderComponent />);

    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', './logo-landit.svg');
  });
});
