import Link from "next/link";

const HeaderBase = ({}) => {
    return (
        <>
            <header>
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <div className="w-full text-green-500 text-2xl font-semibold cursor-pointer">
                                MongoFlix
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};

export default HeaderBase;
