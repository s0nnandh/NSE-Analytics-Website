import React from "react";
import { screen, render, fireEvent} from "@testing-library/react";
import { Nav } from "../Nav";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

describe("Stock Detail", () => {
    it("Stock Detail page renders", () => {
        render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
        );
        screen.debug()
    });
});