import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Dropdown from 'features/surveys/components/DropDownMenu/DropDownMenu'; // Opravte cestu podle vašich potřeb

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Dropdown', () => {
  it('renders with default values', async () => {
    const noop = () => undefined;
    render(<Dropdown surveyId="1" onChange={noop} onOpen={async () => []} userList={[]} />);

    // Ensure the label and default option are present
    const label = screen.getByText('Filter by User:');
    expect(label).toBeInTheDocument();

    // Find the select element directly using its label
    const selectElement = screen.getByLabelText('Filter by User:');

    // Ensure that the default option is present inside the select element
    expect(selectElement).toHaveValue('');
    expect(selectElement).toHaveTextContent('None');

    // Simulate opening the dropdown
    userEvent.click(selectElement);

    // Wait for axios to be called
    await screen.findByText('None');

    // Ensure that the dropdown options are rendered
    expect(screen.getByText('None')).toBeInTheDocument();

    // Simulate closing the dropdown
    userEvent.tab();

    // Ensure that the dropdown is closed
    expect(screen.getByRole('option', { name: 'None' })).toBeInTheDocument();
  });

  it('fetches users and renders options after clicking on the dropdown', async () => {
    const mockedUsers = ['User1', 'User2', 'SelectedUser'];
    mockedAxios.get.mockResolvedValue({ data: mockedUsers });

    const noop = () => undefined;
    render(<Dropdown surveyId="1" onChange={noop} onOpen={async () => mockedUsers} userList={['User1', 'User2']} />);

    // Open the dropdown
    fireEvent.click(screen.getByLabelText('Filter by User:'));

    // Wait for the fetch to complete and options to render
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

    // Open dropdown
    fireEvent.click(screen.getByLabelText('Filter by User:'));

    // Ensure that the dropdown options are rendered
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();

    // Select user from dropdown
    fireEvent.change(screen.getByLabelText('Filter by User:'), {
      target: { value: 'SelectedUser' },
    });

    // Wait for the onChange callback to be called
    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith('SelectedUser');
    });
  });

  it('handles selecting "None" and triggers onChange with an empty string', async () => {
    const mockedOnChange = jest.fn();

    render(<Dropdown surveyId="1" onChange={mockedOnChange} onOpen={async () => []} userList={[]} />);

    // Open dropdown
    fireEvent.click(screen.getByLabelText('Filter by User:'));

    // Select "None" from the dropdown
    fireEvent.change(screen.getByLabelText('Filter by User:'), {
      target: { value: '' },
    });

    // Wait for the onChange callback to be called
    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith('');
    });
  });

  it('closes the dropdown after selecting an option', async () => {
    const mockedOnChange = jest.fn();

    render(<Dropdown surveyId="1" onChange={mockedOnChange} onOpen={async () => []} userList={['SelectedUser', 'OtherUser']} />);

    // Open dropdown
    fireEvent.click(screen.getByLabelText('Filter by User:'));

    // Select user from dropdown
    fireEvent.change(screen.getByLabelText('Filter by User:'), {
      target: { value: 'OtherUser' },
    });

    // Wait for the onChange callback to be called
    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith('OtherUser');
    });

    // Check that the dropdown is closed
    const dropdown = screen.getByLabelText('Filter by User:');
    expect(dropdown).not.toHaveFocus();
  });

  it('closes the dropdown when clicking outside', async () => {
    const mockedOnChange = jest.fn();

    render(<Dropdown surveyId="1" onChange={mockedOnChange} onOpen={async () => []} userList={[]} />);

    // Open dropdown
    fireEvent.click(screen.getByLabelText('Filter by User:'));

    // Click outside the dropdown
    fireEvent.mouseDown(document.body);

    // Check that the dropdown is closed
    const dropdown = screen.getByLabelText('Filter by User:');
    expect(dropdown).not.toHaveFocus();
  });

  it('starts with the dropdown closed and opens on user interaction', async () => {
    const mockedOnChange = jest.fn();

    render(<Dropdown surveyId="1" onChange={mockedOnChange} onOpen={async () => []} userList={['User1', 'User2', 'SelectedUser']} />);

    // Check that the dropdown is initially closed
    const dropdown = screen.getByLabelText('Filter by User:');
    expect(dropdown).not.toHaveFocus();

    // Open dropdown
    fireEvent.click(screen.getByLabelText('Filter by User:'));

    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getByText('SelectedUser')).toBeInTheDocument();
  });
});
