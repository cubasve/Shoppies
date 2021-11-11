import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/Search/Search";
import Nominations from "./components/Nominations/Nominations";
import Movies from "./components/Movies/Movies";
import type { Movie } from "./models/movie";

export default function App() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [movieList, setMovieList] = useState<Movie[] | []>([]);
	const [nominations, setNominations] = useState<Movie[] | []>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const SECRET = process.env.REACT_APP_OMDB_API_KEY;
	const movieURL = `https://www.omdbapi.com/?apikey=${SECRET}&s=${searchQuery}`;

	const fetchNominationsFromStorage = useCallback(() => {
		//JSON.parse(): converts items in local storage from a string to an object
		const storedNominations = localStorage.getItem("savedNominations");
		if (storedNominations) {
			setNominations(JSON.parse(storedNominations));
		}
	}, [setNominations]);

	useEffect(() => {
		if (isLoading) {
			fetchNominationsFromStorage();
			setIsLoading(false);
		}
	}, [fetchNominationsFromStorage, isLoading]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(movieURL);
				const data = await response.json();

				if (Array.isArray(data.Search)) {
					//Only movies appear in the search results
					let onlyMovies: Movie[] = data.Search.filter(
						(result: Movie) => result.Type === "movie"
					);
					setMovieList(onlyMovies);
				} else {
					if (data.Error !== "Incorrect IMDb ID.") {
						setErrorMessage(data.Error);
					}
				}
			} catch (err) {
				console.error(err);
			}
		})();
	}, [searchQuery, movieList, movieURL]);

	const handleSearchQueryChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	): Promise<void> => {
		e.preventDefault();
		console.log("target.value: ", e.target.value);
		console.log(typeof e.target.value);
		setMovieList([]);
		setSearchQuery(e.target.value);
	};

	const handleSearchQuerySubmit = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		e.preventDefault();
		try {
			const response = await fetch(movieURL);
			const data = await response.json();
			setMovieList(data.Search);
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddNomination = (movie: Movie) => {
		const newNominations = [...nominations, movie];
		setNominations((nominations) => [...nominations, movie]);
		//JSON.stringify(): converts a JS object/value to a string
		localStorage.setItem("savedNominations", JSON.stringify(newNominations));
	};

	const handleDeleteNomination = (e: React.ChangeEvent<HTMLInputElement>) => {
		const nominationsCopy: Movie[] = [...nominations];
		let index = nominationsCopy.findIndex(
			(movie: Movie) => movie.imdbID === e.target.value
		);
		if (index !== -1) {
			nominationsCopy.splice(index, 1);
			setNominations(nominationsCopy);
			localStorage.setItem("savedNominations", JSON.stringify(nominationsCopy));
		}
		// let filteredNominations = nominations.filter(
		// 	(movie) => movie.imdbID !== e.target.value
		// );
		// setNominations(filteredNominations);
		// localStorage.setItem(
		// 	"savedNominations",
		// 	JSON.stringify(filteredNominations)
		// );
	};

	return (
		<div className="App" data-testid="app">
			<h1>The Shoppies</h1>
			<SearchBar
				handleSearchQueryChange={handleSearchQueryChange}
				handleSearchQuerySubmit={handleSearchQuerySubmit}
				searchQuery={searchQuery}
			/>
			<div className="shoppies">
				<Movies
					errorMessage={errorMessage}
					handleAddNomination={handleAddNomination}
					isLoading={isLoading}
					movieList={movieList}
					nominations={nominations}
				/>
				<Nominations
					handleDeleteNomination={handleDeleteNomination}
					nominations={nominations}
				/>
			</div>
		</div>
	);
}
