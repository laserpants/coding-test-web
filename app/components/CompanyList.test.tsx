import { render } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import CompanyList from './CompanyList';

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: [
          { companyId: 1, companyName: 'Omni Consumer Products' },
          { companyId: 2, companyName: 'Cyberdyne Systems' },
          { companyId: 3, companyName: 'The Tyrell Corporation' },
        ]
      }),
  })
) as jest.Mock;

describe('CompanyList', () => {
  it('renders correctly', async () => {
    const { container } = await act(async() => render(<CompanyList />));

    expect(container).toMatchSnapshot();
  });

  it('handles fetch failure gracefully', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    const { container } = await act(async() => render(<CompanyList />));

    expect(container).toContain('Error');
  });

  it('renders the list of companies', async () => {
    const { container } = await act(async() => render(<CompanyList />));

    const rows = container.querySelectorAll('div li');
    expect(rows).toHaveLength(3);
  });
});
