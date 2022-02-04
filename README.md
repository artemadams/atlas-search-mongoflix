# Atlas Search Workshop

MongoFlix - interactive demo for [MongoDB Atlas Search](https://www.mongodb.com/atlas/search), [Realm](https://www.mongodb.com/realm), [GraphQL](https://docs.mongodb.com/realm/graphql/) and so much more.

## Live Demo

[This is what we will build!](https://atlas-search-mongoflix.vercel.app/)

[Also available on Realm as a static site!](https://application-0-kjasg.mongodbstitch.com/)

## Code with us

Open the project live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/artemadams/atlas-search-mongoflix)

Duplicate the file `.env.local.example-add-app-id-here` and name it: `.env.local`.
Then change the `<APP_ID>` value to the app id of your Realm app.

## Atlas Cluster and Sample Data

## Atlas Search Index Creation

```json
{
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
}
```

In your cluster on _Atlas_ in the _Search_ tab, create a new index with the name `default` and the above JSON.
![Atlas Search First Index](/docs/add-index-autocomplete.png?raw=true "Atlas Search First Index")

## Realm GraphQL Schema Generation

### Implement Autocomplete Function

```js
exports = async (title) => {
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
};
```

### Create Custome Resolver for Autocomplete

### Input Type

### Implement Highlight Search Function

```js
exports = async (input) => {
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
                score: { $meta: "searchScore" },
                highlights: { $meta: "searchHighlights" },
            },
        },
        { $limit: 20 },
    ];

    return await collection.aggregate(searchQuery).toArray();
};
```

## Create Custome Resolver for Highlight Search

### Input Type

```json
{
    "type": "object",
    "title": "FilteredMoviesInput",
    "properties": {
        "term": {
            "bsonType": "string"
        },
        "genres": {
            "bsonType": "array",
            "items": {
                "bsonType": "string"
            }
        },
        "countries": {
            "bsonType": "array",
            "items": {
                "bsonType": "string"
            }
        }
    }
}
```

### Return Type

```json
{
    "type": "array",
    "title": "FilteredMovies",
    "items": {
        "bsonType": "object",
        "properties": {
            "_id": {
                "bsonType": "objectId"
            },
            "score": {
                "bsonType": "double"
            },
            "highlights": {
                "bsonType": "array",
                "items": {
                    "bsonType": "object",
                    "properties": {
                        "score": {
                            "bsonType": "double"
                        },
                        "path": {
                            "bsonType": "string"
                        },
                        "texts": {
                            "bsonType": "array",
                            "items": {
                                "bsonType": "object",
                                "properties": {
                                    "value": {
                                        "bsonType": "string"
                                    },
                                    "type": {
                                        "bsonType": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "poster": {
                "bsonType": "string"
            },
            "title": {
                "bsonType": "string"
            },
            "cast": {
                "bsonType": "array",
                "items": {
                    "bsonType": "string"
                }
            },
            "directors": {
                "bsonType": "array",
                "items": {
                    "bsonType": "string"
                }
            },
            "fullplot": {
                "bsonType": "string"
            },
            "plot": {
                "bsonType": "string"
            },
            "year": {
                "bsonType": "int"
            },
            "countries": {
                "bsonType": "array",
                "items": {
                    "bsonType": "string"
                }
            },
            "genres": {
                "bsonType": "array",
                "items": {
                    "bsonType": "string"
                }
            }
        }
    }
}
```

## Facets

### Facets Search Index Creation

```json
{
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
}
```

In your cluster on _Atlas_ in the _Search_ tab, create a new index with the name `facets` and the above JSON.
![Atlas Search First Index](/docs/add-index-facets.png?raw=true "Atlas Search First Index")

### Implement Facets Search Function

```js
exports = async (arg) => {
    const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");

    return await collection.aggregate([
        {
            $searchMeta: {
                index: "facets",

                facet: {
                    operator: {
                        range: {
                            path: "year",
                            gte: 2000,
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
    ]);
};
```

## CI/CD integration with Realm

todo
