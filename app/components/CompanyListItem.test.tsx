import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect } from 'vitest';
import CompanyListItem from './CompanyListItem';

describe('CompanyListItem', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the company name and description', () => {
    const company = {
      iconUrl: 'https://example.com/icon.png',
      companyId: 1,
      companyName: 'Test Company',
      description: 'This is a test company.',
    };

    render(<CompanyListItem {...company} />);

    expect(screen.getByText(company.companyName)).toBeDefined();
    expect(screen.getByText(company.description)).toBeDefined();
    expect(screen.getByRole('listitem')).toBeDefined();
  });

  it('renders a fallback image when iconUrl is null', () => {
    const company = {
      iconUrl: null, // No image provided
      companyId: 1,
      companyName: 'Test Company',
      description: 'This is a test company.',
    };

    render(<CompanyListItem {...company} />);

    // Check for fallback image
    const img = screen.getByRole('img', { name: company.companyName });
    expect(img.getAttribute('src')).toContain('placehold.co');
    expect(img.getAttribute('alt')).toBe(company.companyName);
  });

  it('renders a fallback image when iconUrl is missing', () => {
    const company = {
      companyId: 1,
      companyName: 'Test Company',
      description: 'This is a test company.',
    };

    render(<CompanyListItem {...company} />);

    const img = screen.getByRole('img', { name: company.companyName });
    expect(img.getAttribute('src')).toContain('placehold.co');
    expect(img.getAttribute('alt')).toBe(company.companyName);
  });

  it('renders the SVG icon correctly', () => {
    const company = {
      iconUrl: 'https://example.com/icon.png',
      companyId: 1,
      companyName: 'Test Company',
      description: 'This is a test company.',
    };

    render(<CompanyListItem {...company} />);

    // Check for the SVG icon
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeDefined();
  });
});
