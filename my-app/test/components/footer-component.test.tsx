import { render, screen } from '@testing-library/react';
import FooterComponent from '../../src/components/footer-component';
import '@testing-library/jest-dom';

describe('FooterComponent', () => {
  test('文言が正しく表示されていること', () => {
    render(<FooterComponent />);

    expect(screen.getByText('利用規約')).toBeTruthy();
    expect(screen.getByText('プライバシーポリシー')).toBeTruthy();
  });

  test('renders copyright text with the current year', () => {
    render(<FooterComponent />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Landit Inc.`)).toBeTruthy();
  });

  test('画像が正しく表示されていること', () => {
    render(<FooterComponent />);

    const logoImages = screen.getAllByAltText('logo');
    expect(logoImages.length).toBe(2);

    logoImages.forEach((logo) => {
      expect(logo).toHaveAttribute('src', './logo-footer.svg');
    });
  });
});
