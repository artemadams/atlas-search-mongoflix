import Head from "next/head";
import { useState } from "react";
import Category from "../components/Category";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Movies from "../components/Movies";
import {
    generateAuthHeader,
    REALM_GRAPHQL_ENDPOINT,
} from "/services/RealmService";
import useSWR from "swr";
import { request } from "graphql-request";

const getMovies = `
    query GetMovies($sortByInput: MovieSortByInput!, $queryInput: MovieQueryInput!, $limit: Int!) {
        movies(sortBy: $sortByInput, query: $queryInput, limit: $limit) {
            _id
            title
            poster
            genres
            countries
            cast
            directors
            plot
            fullplot
            year
        }
    }
`;

const fetcher = async (query) => {
    const headers = await generateAuthHeader();
    return request(
        REALM_GRAPHQL_ENDPOINT,
        query,
        {
            sortByInput: "METACRITIC_DESC",
            queryInput: { poster_exists: true },
            limit: 50,
        },
        headers
    );
};

const filteredMoviesQuery = `
    query GetFilteredMovies($filter: FilteredMoviesInput!) {
        filteredMovies(input: $filter) {
            _id
            title
            poster
            cast
            directors
            plot
            fullplot
            year
            score
            genres
            countries
            highlights {
                path
                score
                texts {
                    value
                    type
                }
            }
        }
    }
`;

const fetcherFilteredMovies = async (query, filter) => {
    const headers = await generateAuthHeader();
    return request(
        REALM_GRAPHQL_ENDPOINT,
        query,
        {
            filter: {
                term: filter.term,
                genres: filter.genres,
                countries: filter.countries,
            },
        },
        headers
    );
};

const handleError = () => {
    console.error(response.data.error);
    return <p>An error occurred: ${response.data.error}</p>;
};

export default function Home() {
    const emptyFilter = { term: "", genres: [], countries: [] };
    const [filters, setFilters] = useState(emptyFilter);

    const response = useSWR(
        [filteredMoviesQuery, filters],
        fetcherFilteredMovies
    );
    console.log(response.data);
    if (response.data && response.data.error) {
        handleError();
    }
    const filteredMovies = response.data ? response.data.filteredMovies : [];
    console.log(filteredMovies, "filter");

    const { data } = useSWR([getMovies], fetcher);

    if (data && data.error) {
        console.error(data.error);
        return <p>An error occurred: ${data.error}</p>;
    }
    const movies = data ? data.movies : [];
    const genres = [...new Set(movies.map((e) => e.genres).flat())].sort(
        (a, b) => a > b
    );
    const countries = [...new Set(movies.map((e) => e.countries).flat())].sort(
        (a, b) => a > b
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
                <title>MongoFlix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-white w-full min-h-screen">
                <Header
                    genres={genres}
                    countries={countries}
                    filters={filters}
                    setFilters={setFilters}
                />
                <Container>
                    <Category
                        title="Movies"
                        subtitle={`${
                            filteredMovies.length > 0
                                ? filteredMovies.length
                                : movies.length
                        } Movies`}
                    />
                    <Movies
                        movies={
                            filteredMovies.length > 0 ? filteredMovies : movies
                        }
                    />
                </Container>
                <Footer />
            </div>
        </div>
    );
}
