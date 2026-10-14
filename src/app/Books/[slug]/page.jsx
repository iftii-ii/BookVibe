import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookActions from "@/components/BookActions";
const getBooks = async () => {
    const response = await fetch("http://localhost:3000/booksData.json", {
        cache: "no-store",
    });
    return response.json();
};

const page = async ({ params }) => {
    const { slug } = await params;
    const booksData = await getBooks();
    const book = booksData.find((book) => book.bookId === Number(slug));

    if (!book) notFound();

    return (
        <div className="mx-auto container px-4 py-8">
            <Link
                href="/Books"
                className="mb-6 inline-block text-sm font-medium text-stone-500 transition hover:text-stone-900"
            >
                ← Back to books
            </Link>

            <div className="card overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/60 lg:card-side">
                {/* Cover */}
                <figure className="relative bg-gradient-to-br from-amber-50 via-stone-100 to-stone-200 p-10 lg:min-w-[380px]">
                    <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl" />
                    <Image
                        src={book.image}
                        alt={book.bookName}
                        width={300}
                        height={400}
                        priority
                        className="relative h-auto w-60 rounded-md object-cover shadow-[12px_16px_32px_rgba(0,0,0,0.3)]"
                    />
                </figure>

                {/* Content */}
                <div className="card-body gap-5 p-8 lg:p-12">
                    <div>
                        <h2 className="card-title text-3xl font-extrabold leading-tight text-stone-900 sm:text-4xl">
                            {book.bookName}
                        </h2>
                        <p className="mt-1 text-stone-500">by {book.author}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                            {book.category}
                        </span>
                        <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-amber-300">
                            ★ {book.rating}
                        </span>
                        {book.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <p className="max-w-2xl leading-relaxed text-stone-600">
                        {book.review}
                    </p>

                    <dl className="grid grid-cols-3 gap-4 border-t border-dashed border-stone-200 pt-5">
                        <div>
                            <dt className="text-xs text-stone-400">Pages</dt>
                            <dd className="font-semibold text-stone-800">{book.totalPages}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-stone-400">Year</dt>
                            <dd className="font-semibold text-stone-800">{book.yearOfPublishing}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-stone-400">Publisher</dt>
                            <dd className="font-semibold text-stone-800">{book.publisher}</dd>
                        </div>
                    </dl>

                    <div className="card-actions justify-end">
                        <BookActions book={book} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;