import Head from "next/head";
import { useState } from "react";
import Category from "../components/Category";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Movies from "../components/Movies";
import { generateAuthHeader, REALM_GRAPHQL_ENDPOINT } from "/services/RealmService";
import useSWR from "swr";
import { request } from "graphql-request";
import { testGenres, testCountries } from "/services/testData";

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

const fetcherMovies = async (query, filter) => {
    const headers = await generateAuthHeader();
    return request(
        REALM_GRAPHQL_ENDPOINT,
        query,
        {
            sortByInput: "METACRITIC_DESC",
            queryInput: {
                poster_exists: true,
                genres_in: filter.genres.length > 0 ? filter.genres : undefined,
                countries_in: filter.countries.length > 0 ? filter.countries : undefined,
            },
            limit: 50,
        },
        headers
    );
};

const getFilteredMovies = `
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
    return request(REALM_GRAPHQL_ENDPOINT, query, { filter: filter }, headers);
};

const getFacetsGenres = `
    query GetFacetsGenres {
        facetsGenres {
            count
            facet {
                genresFacet {
                    buckets {
                        _id
                        count
                    }
                }
            }
        }
    }
`;

const fetcherFacetsGenres = async (query) => {
    const headers = await generateAuthHeader();
    return request(REALM_GRAPHQL_ENDPOINT, query, null, headers);
};

export const handleError = (error) => {
    console.error(error);
    return <p>An error occurred: ${error}</p>;
};

export default function Home() {
    const [filters, setFilters] = useState({ term: "", genres: [], countries: [] });

    const { data: dataFiltered } = useSWR([getFilteredMovies, filters], fetcherFilteredMovies);
    if (dataFiltered?.error) return handleError(error);
    const filteredMovies = dataFiltered?.filteredMovies ?? [];

    const { data: dataMovies } = useSWR([getMovies, filters], fetcherMovies);
    if (dataMovies?.error) return handleError(dataMovies.error);
    const movies = dataMovies?.movies ?? [];

    const { data: dataFacets } = useSWR([getFacetsGenres], fetcherFacetsGenres);
    if (dataFacets?.error) return handleError(dataFacets.error);
    const genresWithCount = dataFacets?.facetsGenres[0]?.facet.genresFacet.buckets ?? testGenres;

    const countries = testCountries; // TASK: make facets API generic to support other properties

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
                <title>MongoFlix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-100 w-full min-h-screen">
                <Header
                    genresWithCount={genresWithCount}
                    countries={countries}
                    filters={filters}
                    setFilters={setFilters}
                />
                <Container>
                    <Category
                        title="Movie Search"
                        subtitle={`${
                            filteredMovies.length > 0 ? filteredMovies.length : movies.length
                        } Movies`}
                    />
                    <Movies movies={filteredMovies.length > 0 ? filteredMovies : movies} />
                </Container>
                <Footer />
            </div>
        </div>
    );
}
