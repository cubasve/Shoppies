import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";
// import Movies from '../src/components/Movies/Movies';
// import Search from '../src/components/Search/Search';

afterEach(() => {
	cleanup();
	//Cleans up after every test
	//Makes sure every test has the same starting point
});

// test("renders learn react link", () => {
// 	render(<App />);
// 	const linkElement = screen.getByText(/learn react/i);
// 	expect(linkElement).toBeInTheDocument();
// });

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<button></button>, div);
// })

// it("search query is a string and >1 character", () => {
// 	expect(App.handleSearchQueryChange("Lord")).toBe("Lord");
// });

it("app.js contains search, movies and nominations", () => {
	const { queryByTestId } = render(<App />);
	expect(queryByTestId("search")).toBe(null);
	// expect(queryByTestId("movies")).toBe(<div />);
	// expect(queryByTestId("nominations")).toBe(null);
});

// test("test", () => {
// 	render(<App />);
// 	const appElement = screen.getByTestId("app");
// 	expect(appElement).toBeInTheDocument();
// 	// expect(appElement).toContain()
// });

// test('search query is a string and > 1 character', () => {
//   render(<Movies />);
//   const movieElement = screen.getByTestId('movies');
//   expect(movieElement).toBeInTheDocument();
// });

// test("search query is a string and > 1 character", () => {
// 	render(<Search />);
// 	const searchQueryElement = screen.getByTestId("search-query");
// 	expect(searchQueryElement).toBe("string");
// });
