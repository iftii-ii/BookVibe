import React from "react";
import Link from "next/link";


const getBooks = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booksData.json`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }

    return response.json();
};

const BookCard = ({ book }) => {
    const {
        bookId,
        bookName,
        author,
        image,
        category,
        rating,
        tags = [],
        totalPages,
        publisher,
        yearOfPublishing,
    } = book;

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-200/40">
            {/* Cover */}
            <div className="relative flex justify-center overflow-hidden bg-gradient-to-br from-amber-100 via-stone-100 to-emerald-100 px-6 pb-8 pt-10">
                {/* Soft glow behind the book */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />

                {category && (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur">
                        {category}
                    </span>
                )}
                {rating && (
                    <span className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-stone-900 px-3 py-1 text-xs font-bold text-amber-300 shadow-md">
                        ★ {rating}
                    </span>
                )}

                <img
                    src={image}
                    alt={bookName}
                    className="relative h-60 w-40 rounded-md object-cover shadow-[10px_14px_28px_rgba(0,0,0,0.3)] transition duration-500 group-hover:-rotate-2 group-hover:scale-105"
                />
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                    <h3 className="line-clamp-2 text-xl font-extrabold leading-snug text-stone-900">
                        {bookName}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">by {author}</p>
                </div>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <dl className="mt-auto grid grid-cols-3 divide-x divide-stone-200 rounded-2xl bg-stone-50 py-3 text-center">
                    <div className="px-2">
                        <dd className="text-sm font-bold text-stone-800">{totalPages}</dd>
                        <dt className="text-xs text-stone-400">Pages</dt>
                    </div>
                    <div className="px-2">
                        <dd className="text-sm font-bold text-stone-800">{yearOfPublishing}</dd>
                        <dt className="text-xs text-stone-400">Year</dt>
                    </div>
                    <div className="px-2">
                        <dd className="truncate text-sm font-bold text-stone-800">{publisher}</dd>
                        <dt className="text-xs text-stone-400">Publisher</dt>
                    </div>
                </dl>

                <Link
                    href={`/Books/${bookId}`}
                    className="flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-amber-400 hover:text-stone-900"
                >
                    View details
                    <span className="transition duration-300 group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </article>
    );
};

const Books = async ({ limit, showViewMore = false }) => {
    const booksData = await getBooks();
    const visibleBooks = limit ? booksData.slice(0, limit) : booksData;

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="mx-auto mb-12 max-w-2xl text-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
                    Books
                </h2>
                <p className="mt-3 text-stone-500">
                    Pick a story, check the details, and find your next read.
                </p>
                <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-amber-400" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visibleBooks.map((book, ind) => (
                    <BookCard key={book.bookId ?? ind} book={book} />
                ))}
            </div>

            {showViewMore && (
                <div className="mt-14 flex justify-center">
                    <Link
                        href="/Books"
                        className="rounded-full bg-amber-400 px-10 py-3.5 text-sm font-bold text-stone-900 shadow-lg shadow-amber-200 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                    >
                        View more
                    </Link>
                </div>
            )}
        </section>
    );
};

export default Books;