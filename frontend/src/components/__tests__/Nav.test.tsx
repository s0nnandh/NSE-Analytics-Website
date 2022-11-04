import React from "react";
import { screen, render, fireEvent} from "@testing-library/react";
import { Nav } from "../Nav";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

const Home = "Stock Graph";
const Detail = "Stock Detail";

// test for Nav
describe("Nav", () => {
    it("Title is prsent", () => {
        render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
        );
        const title = screen.getByText(/NSE Analytics/i);
        expect(title).toBeInTheDocument();
    });

    it("Active Tab test", () => {
        render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
        );
        const activeTab = screen.getByText(Home);
        expect(activeTab).toHaveClass("border-indigo-500");
    });

    it("Change Tab test", () => {
        render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
        );
        const activeTab = screen.getByText(Home);
        const changeTab = screen.getByText(Detail);
        expect(activeTab).toHaveClass("border-indigo-500");
        expect(changeTab).toHaveClass("border-transparent");
        // click on changeTab
        fireEvent.click(changeTab);
        expect(activeTab).toHaveClass("border-transparent");
    });


});
