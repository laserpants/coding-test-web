import { render } from '@testing-library/react';
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

describe('CompanyList (Server Component)', () => {
  it('renders correctly', async () => {
    const { container } = render(await CompanyList());
    expect(container).toMatchSnapshot();
  });

  it('handles fetch failure gracefully', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    await expect(CompanyList()).rejects.toThrow('Failed to fetch');
  });

  it('renders the list of companies', async () => {
    const { container } = render(await CompanyList());

    const rows = container.querySelectorAll('div li');
    expect(rows).toHaveLength(3);
  });
});
