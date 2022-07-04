import React from "react";
import Movie from "./Movie";

const Movies = ({ movies }) => {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {movies.map((movie) => (
                <Movie key={movie._id} movie={movie} />
            ))}
        </div>
    );
};

export default Movies;
