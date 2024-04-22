import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../App.jsx'
import '@testing-library/jest-dom'

test("Submit button renders successfully", () => {
    render(<App/>);

    const element = screen.getByText('Submit');
    expect(element).toBeInTheDocument();
})

test("Submit button click error", async () => {
    render(<App/>);
    
    const element = screen.getByText('Submit');
    await userEvent.click(element);

    const errorContainer = screen.getByTestId('error-name');
    expect(errorContainer.innerHTML).toContain('The name field is required and must be at least 2 characters long');
})

test("Submit button click name completed", async () => {
    render(<App/>);
    
    const inputName = screen.getByTestId('input-name');
    await userEvent.type(inputName, "Marc");
    
    const element = screen.getByText('Submit');
    await userEvent.click(element);

    expect(screen.queryByTestId('error-name')).toBeNull();
})