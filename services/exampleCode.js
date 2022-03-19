export const code = {
    autocomplete: {
        index: `{
            "mappings": {
                "dynamic": true,
                "fields": {
                    "title": [
                        {
                            "dynamic": true,
                            "type": "document"
                        },
                        {
                            "type": "autocomplete"
                        }
                    ]
                }
            }
        }`,
        aggregation: `exports = async (title) => {
            const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
            return await collection
                .aggregate([
                    {
                        $search: {
                            autocomplete: {
                                path: "title",
                                query: title,
                                fuzzy: { maxEdits: 1 },
                            },
                        },
                    },
                    {
                        $project: {
                            title: 1,
                        },
                    },
                    {
                        $limit: 10,
                    },
                ])
                .toArray();
        };`,
        graphqlQuery: `
        query GetAutocompleteTitle($title: String!) {
            autocompleteTitle(input: $title) {
                _id
                title
            }
        }`,
    },
    combinedSearch: {
        aggregation: `exports = async (input) => {
            const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
            const { term, genres, countries } = input;
            const searchShould = [];
            const searchMust = [];
        
            if (term.length > 0) {
                const termStage = {
                    autocomplete: {
                        path: "title",
                        query: term,
                        fuzzy: { maxEdits: 1.0 },
                        score: {
                            boost: {
                                path: "imdb.rating",
                                undefined: 1,
                            },
                        },
                    },
                };
                searchMust.push(termStage);
        
                const plotStage = {
                    text: {
                        query: term,
                        path: "plot",
                    },
                };
                searchShould.push(plotStage);
            }
        
            if (genres.length > 0) {
                const genresStage = {
                    text: {
                        query: genres,
                        path: "genres",
                    },
                };
                searchMust.push(genresStage);
            }
        
            if (countries.length > 0) {
                const countryStage = {
                    text: {
                        query: countries,
                        path: "countries",
                    },
                };
                searchMust.push(countryStage);
            }
        
            const searchQuery = [
                {
                    $search: {
                        compound: {
                            should: searchShould,
                            must: searchMust,
                        },
                        highlight: { path: ["title", "genres", "countries", "plot"] },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        poster: 1,
                        cast: 1,
                        directors: 1,
                        plot: 1,
                        fullplot: 1,
                        year: 1,
                        genres: 1,
                        countries: 1,
                        imdb: 1,
                        score: { $meta: "searchScore" },
                        highlights: { $meta: "searchHighlights" },
                    },
                },
                { $limit: 20 },
            ];
        
            return await collection.aggregate(searchQuery).toArray();
        };`,
        graphqlQuery: ``,
    },
    facetSearch: {
        index: `{
            "mappings": {
                "dynamic": true,
                "fields": {
                    "title": [
                        {
                            "dynamic": true,
                            "type": "document"
                        },
                        {
                            "type": "autocomplete"
                        }
                    ]
                }
            }
        }`,
        aggregation: `exports = async (arg) => {
            const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
        
            return await collection
                .aggregate([
                    {
                        $searchMeta: {
                            index: "facets",
                            facet: {
                                operator: {
                                    range: {
                                        path: "year",
                                        gte: 1900,
                                    },
                                },
                                facets: {
                                    genresFacet: {
                                        type: "string",
                                        path: "genres",
                                    },
                                },
                            },
                        },
                    },
                ])
                .toArray();
        };`,
        graphqlQuery: ``,
    },
    top50: {
        graphqlQuery: `query GetMovies($sortByInput: MovieSortByInput!, $queryInput: MovieQueryInput!, $limit: Int!) {
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
        }`,
    },
};
