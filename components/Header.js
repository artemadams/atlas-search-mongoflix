import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import { generateAuthHeader, REALM_GRAPHQL_ENDPOINT } from "../services/RealmService";
import useSWR from "swr";
import { request } from "graphql-request";
import Multiselect from "../components/Multiselect";
import { handleError } from "/pages/index";

const autocompleteTitle = `
    query GetAutocompleteTitle($title: String!) {
        autocompleteTitle(input: $title) {
            _id
            title
            poster
        }
    }
`;

const fetcher = async (query, term) => {
    const headers = await generateAuthHeader();
    return request(REALM_GRAPHQL_ENDPOINT, query, { title: term }, headers);
};

const Header = ({ genres, countries, filters, setFilters }) => {
    const router = useRouter();
    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const { data } = useSWR([autocompleteTitle, searchTerm], fetcher);
    if (data?.error) return handleError(data.error);
    const movieTitles = data?.autocompleteTitle ?? [];

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsAutocompleteOpen(false);
        // router.push({
        //     pathname: `/search/${searchTerm}`,
        // });
    };

    const handleSelect = (id) => {
        setSearchTerm("");
        router.push({
            pathname: `/movies/${id}`,
        });
    };

    const onChangeSearchTerm = (term) => {
        setIsAutocompleteOpen(true);
        setSearchTerm(term);
        setFilters({ ...filters, term: term });
    };

    const updateFilterGenres = (genres) => {
        setFilters({ ...filters, genres: genres });
    };

    const updateFilterCountries = (countries) => {
        setFilters({ ...filters, countries: countries });
    };

    return (
        <>
            <header>
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <div className="w-full text-green-500 text-2xl font-semibold cursor-pointer">
                                MongoFlix
                            </div>
                        </Link>
                    </div>

                    <div className="relative mt-6 max-w-lg mx-auto">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon className="h-5 w-5" />
                        </span>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Search"
                                onChange={(e) => onChangeSearchTerm(e.target.value)}
                                onBlur={() => setIsAutocompleteOpen(false)}
                                onFocus={() => setIsAutocompleteOpen(true)}
                                value={searchTerm}
                            />
                        </form>

                        {/* {data ? (
                            !movies && <div className="status">No movies Found</div>
                        ) : (
                            <div className="status"> Fetching data...</div>
                        )} */}
                        {movieTitles.length > 0 && isAutocompleteOpen && (
                            <ul className="absolute inset-x-0 top-full bg-green-200 border border-green-500 rounded-md z-20">
                                {movieTitles.map((item) => {
                                    return (
                                        <li
                                            key={item._id}
                                            className="px-4 py-2 hover:bg-green-300 cursor-pointer"
                                            onClick={() => handleSelect(item._id)}
                                        >
                                            {item.title}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    <Multiselect
                        items={genres}
                        selectedItems={filters.genres}
                        setSelectedItems={updateFilterGenres}
                        placeholder="Select Genres"
                    />
                    <Multiselect
                        items={countries}
                        selectedItems={filters.countries}
                        setSelectedItems={updateFilterCountries}
                        placeholder="Select Countries"
                    />
                </div>
            </header>
        </>
    );
};

export default Header;
