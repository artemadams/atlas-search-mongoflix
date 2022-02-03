import React from "react";

const Dropdown = ({ list, selectedList, addItem, removeItem }) => {
    return (
        <div
            id="dropdown"
            className="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto "
        >
            <div className="flex flex-col w-full">
                {list.map((item, key) => {
                    return selectedList.includes(item.title) ? (
                        <div
                            key={key}
                            className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                            onClick={() => removeItem(item.title)}
                        >
                            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative bg-green-300">
                                <div className="w-full items-center flex">
                                    <div className="mx-2 leading-6  ">
                                        {item.title}{" "}
                                        <span className="text-gray-700 text-sm font-light">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            key={key}
                            className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                            onClick={() => addItem(item.title)}
                        >
                            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:bg-green-100">
                                <div className="w-full items-center flex">
                                    <div className="mx-2 leading-6  ">
                                        {item.title}{" "}
                                        <span className="text-gray-700 text-sm font-light">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dropdown;
