import React from "react";

const Category = ({ title, subtitle }) => {
    return (
        <>
            <h3 className="text-gray-700 text-2xl font-medium block mt-16">
                {title}
            </h3>
            <span className="mt-3 text-sm text-gray-500">{subtitle}</span>
        </>
    );
};

export default Category;
