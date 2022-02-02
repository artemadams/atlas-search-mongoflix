import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import MovieDetail from "../../components/MovieDetail";
import { generateAuthHeader, REALM_GRAPHQL_ENDPOINT } from "../../services/RealmService";
import useSWR from "swr";
import { request } from "graphql-request";
import HeaderBase from "../../components/HeaderBase";
import { handleError } from "/pages/index";

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
    return request(REALM_GRAPHQL_ENDPOINT, query, { queryInput: { _id: movieId } }, headers);
};

const MovieDetails = () => {
    const { query } = useRouter();
    const { data } = useSWR([getMovieById, query.id], fetcher);
    if (data?.error) return handleError(data.error);
    const movie = data?.movie ?? null;

    return (
        <>
            {movie && (
                <>
                    <Head>
                        <title>MongoFlix - {movie.title}</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <div className="bg-gray-100 w-full min-h-screen">
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
