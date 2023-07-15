import { render, screen } from "@testing-library/react"
import LoginComponent from "./LoginComponent"
import userEvent from '@testing-library/user-event'


test('checking login component ', () => {
  render(<LoginComponent/>)

  const button = screen.getByRole('button')
    userEvent.click(button)

    const output = screen.getByText("Sign In",{exact:false})
    expect(output).toBeInTheDocument();
})
