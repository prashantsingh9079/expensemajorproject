import { render,screen } from "@testing-library/react"
import HomePageComponent from "./HomePageComponent"


test('testing home page component ', () => {
  render(<HomePageComponent/>)
  const check = screen.getByText("Welcome to Expense Tracker!!!")
  expense(check).toBeInTheDocument();
})
