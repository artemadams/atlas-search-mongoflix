import React from "react";
import Image from "next/image";
import Category from "./Category";
import Movie from "./Movie";
import { generateAuthHeader, REALM_GRAPHQL_ENDPOINT } from "/services/RealmService";
import useSWR from "swr";
import { request } from "graphql-request";
import { handleError } from "/pages/index";

const getMoviesBy = `
    query GetMoviesBy($sortByInput: MovieSortByInput!, $queryInput: MovieQueryInput!, $limit: Int!) {
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

const fetcherMovies = async (query, input) => {
    const headers = await generateAuthHeader();
    return request(
        REALM_GRAPHQL_ENDPOINT,
        query,
        {
            sortByInput: "METACRITIC_DESC",
            queryInput: input,
            limit: 50,
        },
        headers
    );
};

const MovieDetail = ({ movie }) => {
    const { data: dataLeadRole } = useSWR(
        [getMoviesBy, { cast_in: [movie.cast[0]], _id_ne: movie._id }],
        fetcherMovies
    );
    if (dataLeadRole?.error) return handleError(dataLeadRole.error);
    const moviesLeadRole = dataLeadRole?.movies ?? [];

    const { data: responseDirector } = useSWR(
        [getMoviesBy, { directors_in: [movie.directors[0]], _id_ne: movie._id }],
        fetcherMovies
    );
    if (responseDirector?.error) return handleError(responseDirector.error);
    const moviesDirector = responseDirector?.movies ?? [];

    return (
        <div className="md:flex md:items-start">
            <div className="w-full h-96 md:w-1/2 lg:h-screen relative overflow-hidden">
                {movie.poster && (
                    <>
                        <Image
                            src={"/"}
                            alt={movie.title}
                            layout="fill"
                            objectFit="cover"
                            className="absolute z-0 scale-125"
                            blurDataURL={"https://source.unsplash.com/random/1920x1080"}
                            placeholder="blur"
                        />
                        <Image
                            src={movie.poster}
                            alt={movie.title}
                            layout="fill"
                            objectFit="contain"
                            className="z-0 rounded"
                            blurDataURL="https://source.unsplash.com/random/1920x1080"
                            placeholder="blur"
                        />
                    </>
                )}
            </div>
            <div className="w-full mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                <h3 className="text-gray-700 text-3xl font-medium block">{movie.title}</h3>
                <h4 className="text-gray-500 mt-2 text-xl font-medium block">
                    {`${movie.year} - ${movie.genres?.join(", ") ?? ""} - (${
                        movie.countries?.join(", ") ?? ""
                    })`}
                </h4>
                <div className="text-gray-500 mt-5 text-base">{movie.fullplot}</div>
                {moviesLeadRole && (
                    <div>
                        <Category
                            title={`Lead role played by ${movie.cast[0]}`}
                            subtitle="Also appeared in"
                        />
                        <div className="flex overflow-x-auto space-x-8">
                            {moviesLeadRole.map((movie, index) => (
                                <div className="flex-shrink-0">
                                    <Movie className="" key={index} movie={movie} showDetail={false} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {moviesDirector && (
                    <div>
                        <Category title={`Directed by ${movie.directors[0]}`} subtitle="Also directed" />
                        <div className="flex overflow-x-auto space-x-8">
                            {moviesDirector.map((movie, index) => (
                                <div className="flex-shrink-0">
                                    <Movie className="" key={index} movie={movie} showDetail={false} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
