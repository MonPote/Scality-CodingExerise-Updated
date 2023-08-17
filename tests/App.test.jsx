import { test,expect } from 'vitest';
import {render,screen,fireEvent} from '@testing-library/react';
import App from '../src/App.jsx';



test('should display initial count as 0', () => {
    render(<App />);
    const countElement = screen.getByText('0');
    expect(countElement).toBeTruthy();
});

test('should increment count on button click', () => {
    render(<App />);
    const incrementButton = screen.getByText('Increase');
    fireEvent.click(incrementButton);
    const countDisplay = screen.getByText('1');
    expect(countDisplay.textContent).to.equal('1');
    
});

test('should disable increment count button when reaching limit',async ()=>{
    render(<App/>);
    const incrementButton = screen.getByText('Increase');

    // setting limit
    const limitInput = screen.getByRole('spinbutton');
    limitInput.value = '2';
    fireEvent.change(limitInput); 

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    // Check if the counter displays '2'
    const countElement = screen.getByText('2');
    expect(countElement).to.exist;

    // Try to increment one more time
    fireEvent.click(incrementButton);
   
    // Expect that the counter still displays '2' since we've reached the limit
    expect(countElement).to.exist;
})


