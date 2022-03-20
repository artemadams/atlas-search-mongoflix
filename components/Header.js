import React, { useState, Fragment } from "react";
import Link from "next/link";
import { CodeIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import { generateAuthHeader, REALM_GRAPHQL_ENDPOINT } from "../services/RealmService";
import useSWR from "swr";
import { request } from "graphql-request";
import Multiselect from "../components/Multiselect";
import { handleError } from "/pages/index";
import CodeModal from "./CodeModal";
import { Menu, Transition } from "@headlessui/react";
import { code } from "../services/exampleCode";

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

const Header = ({ genresWithCount, countries, filters, setFilters }) => {
    const router = useRouter();
    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(0);

    // modal
    const [isOpen, setIsOpen] = useState(false);
    const [codeExample, setCodeExample] = useState([]);
    const handleMenuSelect = (isOpen, codeExample) => {
        setIsOpen(isOpen);
        setCodeExample(codeExample);
    };

    const { data } = useSWR([autocompleteTitle, searchTerm], fetcher);
    if (data?.error) return handleError(data.error);
    const movieTitles = data?.autocompleteTitle ?? [];

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsAutocompleteOpen(false);
        if (movieTitles.length > 0 && focusedIndex < movieTitles.length) {
            const movieId = movieTitles[focusedIndex]._id;
            handleSelect(movieId);
        }
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

    const updateFilterGenres = (genresWithCount) => {
        setFilters({ ...filters, genres: genresWithCount });
    };

    const updateFilterCountries = (countries) => {
        setFilters({ ...filters, countries: countries });
    };

    const handleKeyPress = (event) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            setFocusedIndex((focusedIndex - 1 + movieTitles.length) % movieTitles.length);
            console.log(focusedIndex);
        }
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setFocusedIndex((focusedIndex + 1) % movieTitles.length);
            console.log(focusedIndex);
        }
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
                        <Menu as="div" className="relative inline-block text-left z-50">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    Code
                                    <ChevronDownIcon
                                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleMenuSelect(true, code.autocomplete)}
                                                    className={`${
                                                        active
                                                            ? "bg-green-100 text-green-500"
                                                            : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                >
                                                    Autocomplete
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() =>
                                                        handleMenuSelect(true, code.combinedSearch)
                                                    }
                                                    className={`${
                                                        active
                                                            ? "bg-green-100 text-green-500"
                                                            : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                >
                                                    Multiple Search Criteria
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleMenuSelect(true, code.facetSearch)}
                                                    className={`${
                                                        active
                                                            ? "bg-green-100 text-green-500"
                                                            : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                >
                                                    Facets
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleMenuSelect(true, code.top50)}
                                                    className={`${
                                                        active
                                                            ? "bg-green-100 text-green-500"
                                                            : "text-gray-900"
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                >
                                                    Top 50 Movies
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    <CodeModal isOpen={isOpen} setIsOpen={setIsOpen} codeExamples={codeExample}></CodeModal>

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
                                onKeyDown={handleKeyPress}
                            />
                        </form>

                        {/* {data ? (
                            !movies && <div className="status">No movies Found</div>
                        ) : (
                            <div className="status"> Fetching data...</div>
                        )} */}
                        {movieTitles.length > 0 && isAutocompleteOpen && (
                            <ul
                                className="absolute inset-x-0 top-full bg-white border border-green-500 rounded-md z-20"
                                tabIndex={0}
                                onKeyDown={handleKeyPress}
                            >
                                {movieTitles.map((item, index) => {
                                    return (
                                        <li
                                            key={item._id}
                                            className={`px-4 py-2
                                            ${
                                                focusedIndex === index ? "bg-green-300" : ""
                                            } hover:bg-green-300 cursor-pointer`}
                                            onMouseDown={(e) => e.preventDefault()}
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
                        items={genresWithCount.map((e) => {
                            return { title: e._id, subtitle: e.count };
                        })}
                        selectedItems={filters.genres}
                        setSelectedItems={updateFilterGenres}
                        placeholder="Select Genres"
                    />
                    <Multiselect
                        items={countries.map((e) => {
                            return { title: e._id, subtitle: e.count };
                        })}
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
