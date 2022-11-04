import React from "react";
import { screen, render, fireEvent} from "@testing-library/react";
import { Nav } from "../Nav";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

// test for Stock Graph
describe("Stock Graph", () => {
    it("Stock Graph page renders", () => {
        render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
        );
        screen.debug()
    });
});