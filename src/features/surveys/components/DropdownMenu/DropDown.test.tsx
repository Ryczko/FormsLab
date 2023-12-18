import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Dropdown from 'features/surveys/components/DropDownMenu/DropDownMenu'; 

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Dropdown', () => {
  it('renders with default values', async () => {
    const noop = () => undefined;
    render(<Dropdown surveyId="1" onChange={noop} onOpen={async () => []} userList={[]} />);

    const label = screen.getByText('Filter by User:');
    expect(label).toBeInTheDocument();

    const selectElement = screen.getByLabelText('Filter by User:');

    expect(selectElement).toHaveValue('');
    expect(selectElement).toHaveTextContent('None');

    userEvent.click(selectElement);

    await screen.findByText('None');

    expect(screen.getByText('None')).toBeInTheDocument();

    userEvent.tab();

    expect(screen.getByRole('option', { name: 'None' })).toBeInTheDocument();
  });

  it('fetches users and renders options after clicking on the dropdown', async () => {
    const mockedUsers = ['User1', 'User2', 'SelectedUser'];
    mockedAxios.get.mockResolvedValue({ data: mockedUsers });

    const noop = () => undefined;
    render(<Dropdown surveyId="1" onChange={noop} onOpen={async () => mockedUsers} userList={['User1', 'User2']} />);

    fireEvent.click(screen.getByLabelText('Filter by User:'));

    await waitFor(() => {
      expect(screen.getByText('User1')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('User2')).toBeInTheDocument();
    });
  });

  it('handles user selection and triggers onChange', async () => {
    const mockedOnChange = jest.fn();

    render(<Dropdown surveyId="1" onChange={mockedOnChange} onOpen={async () => []} userList={['User1', 'User2', 'SelectedUser']} />);

    fireEvent.click(screen.getByLabelText('Filter by User:'));

    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Filter by User:'), {
      target: { value: 'SelectedUser' },
    });

    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith('SelectedUser');
    });
  });

  it('handles selecting "None" and triggers onChange with an empty string', async () => {
    const mockedOnChange = jest.fn();

    render(<Dropdown surveyId="1" onChange={mockedOnChange} onOpen={async () => []} userList={[]} />);

    fireEvent.click(screen.getByLabelText('Filter by User:'));

    fireEvent.change(screen.getByLabelText('Filter by User:'), {
      target: { value: '' },
    });

    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith('');
    });
  });

  it('closes the dropdown after selecting an option', async () => {
    const mockedOnChange = jest.fn();

    render(<Dropdown surveyId="1" onChange={mockedOnChange} onOpen={async () => []} userList={['SelectedUser', 'OtherUser']} />);

    fireEvent.click(screen.getByLabelText('Filter by User:'));

    fireEvent.change(screen.getByLabelText('Filter by User:'), {
      target: { value: 'OtherUser' },
    });

    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith('OtherUser');
    });

    const dropdown = screen.getByLabelText('Filter by User:');
    expect(dropdown).not.toHaveFocus();
  });

  it('closes the dropdown when clicking outside', async () => {
    const mockedOnChange = jest.fn();

    render(<Dropdown surveyId="1" onChange={mockedOnChange} onOpen={async () => []} userList={[]} />);

    fireEvent.click(screen.getByLabelText('Filter by User:'));

    fireEvent.mouseDown(document.body);

    const dropdown = screen.getByLabelText('Filter by User:');
    expect(dropdown).not.toHaveFocus();
  });

  it('starts with the dropdown closed and opens on user interaction', async () => {
    const mockedOnChange = jest.fn();

    render(<Dropdown surveyId="1" onChange={mockedOnChange} onOpen={async () => []} userList={['User1', 'User2', 'SelectedUser']} />);

    const dropdown = screen.getByLabelText('Filter by User:');
    expect(dropdown).not.toHaveFocus();

    fireEvent.click(screen.getByLabelText('Filter by User:'));

    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getByText('SelectedUser')).toBeInTheDocument();
  });
});
