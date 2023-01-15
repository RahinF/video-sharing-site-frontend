
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { store } from "../../app/store"
import EditUser from "./EditUser"



const r = component => render(<Provider store={store}>
    {component}
</Provider>)


test("if the update button is disabled if name is empty", async () => {
    r(<EditUser />)

    expect(await screen.findByRole('button', { name: /update/i })).toBeDisabled()


    userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/bio/i), "bio");

    expect(await screen.findByRole('button', { name: /update/i })).toBeEnabled()

    // screen.debug()
})

