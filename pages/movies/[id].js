import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import MovieDetail from "../../components/MovieDetail";
import {
    generateAuthHeader,
    REALM_GRAPHQL_ENDPOINT,
} from "../../services/RealmService";
import useSWR from "swr";
import { request } from "graphql-request";
import HeaderBase from "../../components/HeaderBase";

const getMovieById = `
    query GetMovie($queryInput: MovieQueryInput!) {
        movie(query: $queryInput) {
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

const fetcher = async (query, movieId) => {
    const headers = await generateAuthHeader();
    return request(
        REALM_GRAPHQL_ENDPOINT,
        query,
        { queryInput: { _id: movieId } },
        headers
    );
};

const MovieDetails = () => {
    const { query } = useRouter();
    const { data } = useSWR([getMovieById, query.id], fetcher);
    if (data && data.error) {
        console.error(data.error);
        return <p>An error occurred: ${data.error}</p>;
    }
    console.log(data);
    const movie = data ? data.movie : null;
    console.log(movie);

    return (
        <>
            {movie && (
                <>
                    <Head>
                        <title>MongoFlix - {movie.title}</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <div className="bg-white w-full min-h-screen">
                        <HeaderBase />
                        <Container>
                            <MovieDetail movie={movie} />
                        </Container>
                        <Footer />
                    </div>
                </>
            )}
        </>
    );
};

export default MovieDetails;
