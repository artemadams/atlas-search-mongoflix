import React from "react";

const Highlighted = ({ text = "", highlight = "" }) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
        <span>
            {parts.filter(String).map((part, i) => {
                return regex.test(part) ? (
                    <mark className="bg-green-400" key={i}>
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                );
            })}
        </span>
    );
};

export default Highlighted;
