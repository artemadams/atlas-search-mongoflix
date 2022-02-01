import React from "react";
import Image from "next/image";
import Category from "./Category";
import Movie from "./Movie";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";

const MovieDetail = ({ movie }) => {
    return (
        <div className="md:flex md:items-start">
            <div className="w-full h-96 md:w-1/2 lg:h-96 relative">
                {movie.poster && (
                    <>
                        <Image
                            src={movie.poster}
                            alt={movie.title}
                            layout="fill"
                            objectFit="contain"
                            className="z-0 rounded"
                        />
                    </>
                )}
            </div>
            <div className="w-full mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                <h3 className="text-gray-700 text-3xl font-medium block">
                    {movie.title}
                </h3>
                <h4 className="text-gray-500 mt-2 text-xl font-medium block">
                    {`${movie.year} - ${movie.genres.join(
                        ", "
                    )} - (${movie.countries.join(", ")})`}
                </h4>
                <div className="text-gray-500 mt-5 text-base">
                    {movie.fullplot}
                </div>
                <Category
                    title={`Lead role played by ${movie.cast[0]}`}
                    subtitle="Also appeared in"
                />
                <div className="flex overflow-x-auto space-x-8">
                    {[movie, movie, movie, movie, movie].map((movie, index) => (
                        <div className="flex-shrink-0">
                            <Movie
                                className=""
                                key={index}
                                movie={movie}
                                showDetail={false}
                            />
                        </div>
                    ))}
                </div>
                <Category
                    title={`Directed by ${movie.directors[0]}`}
                    subtitle="Also directed"
                />
            </div>
        </div>
    );
};

export default MovieDetail;
