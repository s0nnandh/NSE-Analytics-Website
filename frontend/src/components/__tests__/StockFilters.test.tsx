import axios from "axios";
import React from "react";
import { Nav } from "../Nav";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, Mock, SpyInstance } from "vitest";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { StockFilters } from "../StockFilters";

const baseUrl = "http://localhost:8000/api";

const server = setupServer(
  rest.get(`${baseUrl}/stock/ids`, (req, res, ctx) => {
    return res(ctx.json([{id : "RELIANCE"}]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const me = (id : string, a : string, b : string) => {
};




describe("Loader", () => {


    it("Loader is present", async () => {
        const submitFn = vi.fn().mockImplementation(me);
        render(
        <BrowserRouter>
            <StockFilters handleSubmit={submitFn} />
        </BrowserRouter>
        );

        const loader = screen.getByTestId("audio-loading");
        expect(loader).toBeInTheDocument(); 

    });

});

describe("Stock Filters", () => {

    it("Stock Filters page renders", async () => {
        const submitFn = vi.fn().mockImplementation(me);
        render(
        <BrowserRouter>
            <StockFilters handleSubmit={submitFn} />
        </BrowserRouter>
        );

        const loader = screen.getByTestId("audio-loading");
        expect(loader).toBeInTheDocument(); 

        await waitFor(() => expect(loader).not.toBeInTheDocument())

        const id = screen.getByText("Select Stock");
        const submit = screen.getByRole(`button`, {name: /Search/i});

        expect(id).toBeInTheDocument();
        expect(submit).toBeInTheDocument();

        fireEvent.click(id);
        fireEvent.click(screen.getByText("RELIANCE"));
        

    });

});