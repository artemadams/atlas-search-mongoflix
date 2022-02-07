# Atlas Search Workshop

MongoFlix - interactive demo for [MongoDB Atlas Search](https://www.mongodb.com/atlas/search), [MongoDB Realm](https://www.mongodb.com/realm), [GraphQL](https://docs.mongodb.com/realm/graphql/) and so much more.

## Live Demo

[This is what we will build!](https://atlas-search-mongoflix-ybbwzbv7l-artemadams.vercel.app/)

[Also available on Realm as a static site!](https://application-0-kjasg.mongodbstitch.com/)

## Code with us

Open the project live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/artemadams/atlas-search-mongoflix)

Duplicate the file `.env.local.example-add-app-id-here` and name it: `.env.local`.
You will need to change the `<APP_ID>` value to the app id of your MongoDB Realm app, which will be created at a later step.

## Atlas Cluster

To follow along with the demo, you will need to create a MongoDB Atlas cluster and load the sample data set into your cluster.
Please create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and follow the instructions.
If it is the first time you use Atlas you will need to create an organization and a project. After you complete the account setup, you will see the **Atlas UI**. If you don not have any cluster click the **Build a Database** button.

In the following dialog select **Shared** and click **Create**.
The following screen will provide an interface to configure the cluster.

If you choose a region other than Frankfurt you will need to update the endpoint in the app in `services/RealmService.js` to match the region.

Here are the settings for the cluster:

-   **Cloud Provider & Region**: `AWS, Frankfurt (eu-central-1)`
-   **Cluster Tier**: `MO Sandbox (Shared RAM, 512 MB Storage)`
-   **Cluster Name**: `Cluster0`

![Atlas Cluster](/docs/create-shared-cluster.png?raw=true "Atlas Cluster")

### Load Sample Data

After your cluster was deployed in the region of your choice, you will need to load the sample data set into your cluster.
Click the three dots menu in the top headline of the cluster card.
Click **Load Sample Dataset**. Click the **Load Sample Dataset** button in the overlay to start the process. (It should take about 5-10 minutes. ☕️ 🍵)

![Load Sample Data](/docs/load-data-1.png?raw=true "Load Sample Data")

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

In your cluster on **Atlas** in the **Search** tab, create a new index with the name `default` and the above JSON.

![Atlas Search First Index](/docs/add-index-autocomplete.png?raw=true "Atlas Search First Index")

## Create Realm App

In the **Atlas** UI click the **Realm** tab. If you are using Realm for the first time, you will see a dialog with additonal instructions. You can safely cancel it and click the **Create a New App** button.

![Create Realm App Step 1](/docs/create-realm-app.png?raw=true "Create Realm App Step 1")

In the following dialog, setup the name of the Realm App, connect it to your newly created cluster and select a local (single region) deployment model. It should be preferable to use the region closest to your cluster region.

-   Name: Application-0
-   Cluster: Cluster0
-   Deployment Model: Local

To create the app click the create button.

![Create Realm App Step 2](/docs/create-realm-app-config.png?raw=true "Create Realm App Step 2")

### Realm Activate Anonymous Authentication

On the left side bar of the Atlas UI, within **Data Access**, click **Authentication**. As you see **Realm** provides many authentication methods, we will use **Anonymous** for this demo. Click on the **Edit** button and set the checkbox to **ON** for this authentication method.

![Realm Activate Anonymous Authentication](/docs/add-auth.png?raw=true "Realm Activate Anonymous Authentication")

### Realm Configure Access Rules

On the left side bar of the Atlas UI, within **Data Access**, click **Rules**. **Rules** provide you many ways to limit and configure data access per collection and user role, deep down to the document level. For this demo we will allow all users to only `read` all documents in the movies colelction. **Realm** provides templates for many scenarios and we will use the **Users can only read all data** template.

![Realm Configure Access Rules](/docs/add-rules-movies.png?raw=true "Realm Configure Access Rules")

### Realm Generate Schema

On the left side bar of the Atlas UI, within **Data Access**, click **Schema**. **Schema** defines the data structures and types for documents in each collection in the databases. Select the **movies** collection within the **sample_mflix** database. Click the generate schema button.
Select just the **movies** collection, leave the samling size as default and click the **Generate Schema** button.
This will also generate all the neccessary types and querries for a **GraphQL** schema. Which can be used immediately to access the data through the GraphQL endpoint managed by Realm.

![Realm Generate Schema](/docs/create-schema-movies.png?raw=true "Realm Generate Schema")

Click the **Review Draft & Deploy** button at the top of the page and **Deploy** your changes.

![Review Draft & Deploy](/docs/hint-review.png?raw=true "Review Draft & Deploy")

![Deploy](/docs/hint-review-deploy.png?raw=true "Deploy")

---

## Feature 1: Autocomplete

Now with the correct rules and schema in place we can start creating functions for the app.
For the first feature we will create a function that will return a list of movies that match the search term by the title. It will use our dynamic index created in the previous step with the autocomplete functionality. This enables us to provide autocomplete and fuzzy search for movie tiltes in the search bar of the frontend app.

### Create Autocomplete Function

On the left side bar of the Atlas UI, within **Build**, click **Functions**. **Functions** provide a way to execute serverside logic on **Realm** integrating data from the connected cluster. With the **Aggregation Framework** at your disposal you can create very powerful aggregations, even without a driver.

Click the **Create New Function** button and enter `autocompleteTitle` as the name for the function.

![Create Autocomplete Function](/docs/create-func-autocomplete-config.png?raw=true "Create Autocomplete Function")

### Implement Autocomplete Function

Now click the **Function Editor** tab.

![Implement Autocomplete Function](/docs/create-func-autocomplete-code.png?raw=true "Implement Autocomplete Function")

Paste the following code into the **Function Editor**:

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

Click the **Save Draft** button to save the function.

### Create Autocomplete Custom Resolver

We want to use the autocomplete function in our GraphQL schema. To do this we need to create a custom resolver. Custom resolvers allow us to define custom querries and mutations for our GraphQL schema, backed by **Functions** created on Realm.

On the left side bar of the Atlas UI, within **Build**, click **GraphQL**. Click the **Custom Resolvers** tab and click the **Add a Custom Resolver** button. For the **GraphQL Field Name** enter `autocompleteTitle`, for the **Parent Type** select **Query** and for the **Function Name** select the newly created function `autocompleteTitle`.

The input type defines the data type of what will be send to the GraphQL API as input for this resolver.
The return type defines the data type of what will be returned by the API.
We will send a string as input and expect a list of movie objects as output.

#### Input Type

-   Input Type: `Scalar Type`, `String`

#### Return Type

-   Return Type: `Existing Type (List)`, `[Movie]`

Click the **Save Draft** button to save the custom resolver.

![Create Autocomplete Custom Resolver](/docs/create-func-autocomplete-resolver.png?raw=true "Create Autocomplete Custom Resolver")

Click the **Review Draft & Deploy** button at the top of the page and **Deploy** your changes.

Now with the first feature setup take the time to test the app, enter some movie titles into the search bar and see the autocomplete results.

---

## Feature 2: Highlights and Scoring

Now with the autocomplete function in place we can creat a new function for highlights and scoring. This function will return a list of movies that match the search term by the title, the genres selected and the country where a certain movie was produced.
Additionally, it will return highlights and search scores for the results. The highlights contain the exact substring within the title and the plot strings, containing the matched search term.
This will allow us to highlight the found search terms within the frontend UI.

### Create Highlights Function

Similar to the previous function we will create a new function for highlights and scoring.

On the left side bar of the Atlas UI, within **Build**, click **Functions**.
Click the **Create New Function** button and enter `filteredMovies` as the name for the function.

![Create Highlights Function](/docs/create-func-filter-config.png?raw=true "Create Highlights Function")

### Implement Highlights Function

Now click the **Function Editor** tab.

![Implement Highlights Function](/docs/create-func-filter-code.png?raw=true "Implement Highlights Function")

Paste the following code into the **Function Editor**:

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

### Create Highlights Custom Resolver

On the left side bar of the Atlas UI, within **Build**, click **GraphQL**. Click the **Custom Resolvers** tab and click the **Add a Custom Resolver** button. For the **GraphQL Field Name** enter `filteredMovies`, for the **Parent Type** select **Query** and for the **Function Name** select the newly created function `filteredMovies`.

We will send a string as input and expect a list of custom movie objects, containing the scores and highlights for each movie as output.

![Create Highlights Custom Resolver](/docs/create-func-filter-resolver.png?raw=true "Create Highlights Custom Resolver")

#### Input Type

-   Input Type: `Scalar Type`

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

#### Return Type

-   Return Type: `Existing Type (List)`, `[Movie]`

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

Click the **Save Draft** button to save the custom resolver.

Click the **Review Draft & Deploy** button at the top of the page and **Deploy** your changes.

Now with the highlights feature setup take the time to test the app, enter some movie titles into the search bar scroll in the results list and verify that the fuzzy matched search term is highlighted within the movie title and the short plot when there is a match.

---

## Feature 3: Facets

Facets open many powerful use cases for grouping your search results. The following feature shows how to run an Atlas Search query to get results grouped by values for genres of each movie in the **movies** collection, including the count for each of those groups.

### Facets Search Index Creation

In your cluster on **Atlas** in the **Search** tab, create a new index with the name `facets` and the following JSON for the **movies** collection.

![Atlas Search Facets Index](/docs/add-index-facets.png?raw=true "Atlas Search Facets Index")

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

### Create Facets Function

Now with the index created, in the **Atlas** UI click the **Realm** tab. Click **Application-0** in the UI. On the left side bar of the Atlas UI, within **Build**, click **Functions**.
Click the **Create New Function** button and enter `facetsGenres` as the name for the function.

![Create Facets Function](/docs/create-func-facets-config.png?raw=true "Create Facets Function")

### Implement Facets Function

Now click the **Function Editor** tab.

![Implement Facets Function](/docs/create-func-facets-code.png?raw=true "Implement Facets Function")

Paste the following code into the **Function Editor**:

```js
exports = async (arg) => {
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
};
```

### Create Facets Custom Resolver

On the left side bar of the Atlas UI, within **Build**, click **GraphQL**. Click the **Custom Resolvers** tab and click the **Add a Custom Resolver** button. For the **GraphQL Field Name** enter `facetsGenres`, for the **Parent Type** select **Query** and for the **Function Name** select the newly created function `facetsGenres`.

We won't send input to this query and expect a list of custom objects representing the facets for each genre, containing the number of movies for each Genre.

![Create Facets Custom Resolver](/docs/create-func-facets-resolver.png?raw=true "Create Facets Custom Resolver")

#### Input Type

-   Input Type: `None`

#### Return Type

-   Return Type: `Custom Type`

```json
{
    "title": "GenresMeta",
    "type": "array",
    "items": {
        "bsonType": "object",
        "properties": {
            "count": {
                "bsonType": "double"
            },
            "facet": {
                "bsonType": "object",
                "properties": {
                    "genresFacet": {
                        "bsonType": "object",
                        "properties": {
                            "buckets": {
                                "bsonType": "array",
                                "items": {
                                    "bsonType": "object",
                                    "properties": {
                                        "_id": {
                                            "bsonType": "string"
                                        },
                                        "count": {
                                            "bsonType": "double"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

Click the **Save Draft** button to save the custom resolver.

Click the **Review Draft & Deploy** button at the top of the page and **Deploy** your changes.

Now with the facets setup test the app and open the dropdown for **Genres**. Notice that there is now a number besides each genre representing the total number of movies for that genre.

---

## Realm Static Site Hosting

**MongoDB Realm Hosting** allows you to host, manage, and serve your application's static media and document files. You can use Hosting to store individual pieces of content or to upload and serve your entire client application

Our frontend app contains all the necessary calls to the GraphQL API on Realm. We can export the whole frontend app as a statci site and host it on MongoDB Realm.

For this you need to execute the follwing code in the root of the project.
Make sure that you have the dependencies installed with.

```bash
 npm install
```

and then build and export the site with next.

```bash
 next build && next export
```

This will create a folder called `out` in the root of the project.

On the MongoDB Atlas UI on the **Realm** tab. On the left side bar of the Atlas UI, within **Manage**, click **Hosting**. Click the _Enable Hosting_ button. Drag and drop the contents of the folder `out` into the **Hosting** tab to upload all files.

Click the **Review Draft & Deploy** button at the top of the page and **Deploy** your changes.

![Review Draft & Deploy](/docs/hint-review.png?raw=true "Review Draft & Deploy")

![Deploy](/docs/hint-review-deploy.png?raw=true "Deploy")

Click now the **Settings** tab copy the **Realm Domain** paste it in a browser of your choice and press enter to view the site. 🎉
