import React, { useState, Fragment } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { code } from "../services/exampleCode";
import { ChevronUpIcon } from "@heroicons/react/outline";

const CodeModal = ({ isOpen, setIsOpen }) => {
    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 bg-opacity-60"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Code Example
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500"></p>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-green-900 bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                                                <span>Aggregation Pipeline</span>
                                                <ChevronUpIcon
                                                    className={`${
                                                        open ? "transform rotate-180" : ""
                                                    } w-5 h-5 text-green-500`}
                                                />
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-200 ease-out"
                                                enterFrom="transform origin-bottom scale-y-0 opacity-0"
                                                enterTo="transform origin-top scale-y-100 opacity-100"
                                                leave="transition duration-200 ease-out"
                                                leaveFrom="transform origin-bottom scale-y-150 opacity-100"
                                                leaveTo="transform origin-bottom scale-y-0 opacity-0"
                                            >
                                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                                    <SyntaxHighlighter language="javascript" style={dracula}>
                                                        {code.autocomplete.aggregation}
                                                    </SyntaxHighlighter>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex float-right justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                                    onClick={closeModal}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CodeModal;
