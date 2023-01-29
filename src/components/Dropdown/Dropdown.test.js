import {
    render,
    screen,
    waitForElementToBeRemoved
} from "@testing-library/react";
import user from "@testing-library/user-event";
import { ChatDots } from "phosphor-react";
import Dropdown from "./Dropdown";


describe("dropdown menu", () => {
    const ariaLabel = "user settings";

    beforeEach(() => {
        render(
            <Dropdown ariaLabel={ariaLabel} triggerIcon={ChatDots}>
                <button>test 1</button>
                <button>test 2</button>
                <button>test 3</button>
            </Dropdown>
        );
    });

    test("trigger button renders", () => {
        const button = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });
        expect(button).toBeInTheDocument();
    });

    test("menu doesnt render on initial render", () => {
        const menu = screen.queryByTestId("menu");
        expect(menu).not.toBeInTheDocument();
    });

    test("backdrop doesnt render on initial render", () => {
        const backdrop = screen.queryByTestId("backdrop");
        expect(backdrop).not.toBeInTheDocument();
    });

    test("caret doesnt render on initial render", () => {
        const caret = screen.queryByTestId("caret");
        expect(caret).not.toBeInTheDocument();
    });

    test("menu renders if trigger is clicked", async () => {
        user.setup();

        const button = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(button);

        const menu = screen.getByTestId("menu");
        expect(menu).toBeInTheDocument();
    });

    test("children render when menu is opened", async () => {
        user.setup();

        const button = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(button);

        const children = screen.getAllByRole("button", { name: /test/ });
        expect(children).toHaveLength(3);
    });

    test("backdrop renders if trigger is clicked", async () => {
        user.setup();

        const button = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(button);

        const backdrop = screen.getByTestId("backdrop");
        expect(backdrop).toBeInTheDocument();
    });

    test("backdrop removed if clicked", async () => {
        user.setup();

        const button = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(button);

        const backdrop = screen.getByTestId("backdrop");
        await user.click(backdrop);

        await waitForElementToBeRemoved(() => screen.getByTestId("backdrop"));
    });

    test("caret renders if trigger is clicked", async () => {
        user.setup();

        const button = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(button);

        const caret = screen.getByTestId("caret");
        expect(caret).toBeInTheDocument();
    });

    test("caret removed if clicked", async () => {
        user.setup();

        const button = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(button);

        const backdrop = screen.getByTestId("backdrop");
        await user.click(backdrop);

        await waitForElementToBeRemoved(() => screen.getByTestId("caret"));
    });

    test("trigger button has focus when menu is opened", async () => {
        user.setup();

        const button = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(button);

        expect(button).toHaveFocus();
    });

    test("focus is trapped to menu items and trigger button", async () => {
        user.setup();

        const triggerButton = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(triggerButton);

        expect(triggerButton).toHaveFocus();

        await user.tab();
        const menuItem1 = screen.getByRole("button", {
            name: `test 1`,
        });
        expect(menuItem1).toHaveFocus();

        await user.tab();
        const menuItem2 = screen.getByRole("button", {
            name: `test 2`,
        });
        expect(menuItem2).toHaveFocus();

        await user.tab();
        const menuItem3 = screen.getByRole("button", {
            name: `test 3`,
        });
        expect(menuItem3).toHaveFocus();

        await user.tab();
        expect(triggerButton).toHaveFocus();
    });

    test("focus is trapped to menu items and trigger button and shift tab reverses focus order", async () => {
        user.setup();

        const triggerButton = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(triggerButton);

        expect(triggerButton).toHaveFocus();

        await user.keyboard("{Shift>}{Tab}");
        const menuItem3 = screen.getByRole("button", {
            name: `test 3`,
        });
        expect(menuItem3).toHaveFocus();


        await user.keyboard("{Shift>}{Tab}");
        const menuItem2 = screen.getByRole("button", {
            name: `test 2`,
        });
        expect(menuItem2).toHaveFocus();

        await user.keyboard("{Shift>}{Tab}");
        const menuItem1 = screen.getByRole("button", {
            name: `test 1`,
        });
        expect(menuItem1).toHaveFocus();

        await user.keyboard("{Shift>}{Tab}");
        expect(triggerButton).toHaveFocus();
    });

    test("menu closes when item is clicked", async () => {
        user.setup();

        const triggerButton = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(triggerButton);

        const menuItem = screen.getByRole("button", { name: "test 1" });


        await user.click(menuItem);

        await waitForElementToBeRemoved(() => expect(screen.getByTestId("menu")));
    });

    test("menu closes when escape key is pressed", async () => {
        user.setup();

        const triggerButton = screen.getByRole("button", {
            name: `${ariaLabel} dropdown menu`,
        });

        await user.click(triggerButton);

        await user.keyboard("{Escape}");

        await waitForElementToBeRemoved(() => expect(screen.getByTestId("menu")));
    });

});
