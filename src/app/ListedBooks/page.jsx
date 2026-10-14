"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const READ_KEY = "readList";
const WISH_KEY = "wishlist";

const load = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
};

const ListItem = ({ book, onRemove }) => (
    <div className="flex items-center gap-5 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        <img
            src={book.image}
            alt={book.bookName}
            className="h-28 w-20 rounded-md object-cover shadow-md"
        />
        <div className="flex-1">
            <h3 className="text-lg font-bold text-stone-900">{book.bookName}</h3>
            <p className="text-sm text-stone-500">by {book.author}</p>
            <p className="mt-1 text-xs text-stone-400">
                {book.category} · {book.totalPages} pages · ★ {book.rating}
            </p>
        </div>
        <div className="flex flex-col gap-2">
            <Link
                href={`/Books/${book.bookId}`}
                className="rounded-full bg-stone-900 px-5 py-2 text-center text-xs font-semibold text-white transition hover:bg-stone-700"
            >
                View details
            </Link>
            <button
                onClick={onRemove}
                className="rounded-full border border-stone-300 px-5 py-2 text-xs font-semibold text-stone-600 transition hover:border-red-400 hover:text-red-500"
            >
                Remove
            </button>
        </div>
    </div>
);

export default function ListedBooksPage() {
    const [tab, setTab] = useState("read");
    const [readList, setReadList] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        setReadList(load(READ_KEY));
        setWishlist(load(WISH_KEY));
    }, []);

    const removeFrom = (key, list, setList, id) => {
        const updated = list.filter((b) => b.bookId !== id);
        localStorage.setItem(key, JSON.stringify(updated));
        setList(updated);
    };

    const activeList = tab === "read" ? readList : wishlist;

    return (
        <section className="mx-auto max-w-4xl px-4 py-12">
            <h1 className="mb-8 text-center text-4xl font-extrabold text-stone-900">
                Listed Books
            </h1>

            <div className="mx-auto mb-8 flex w-fit rounded-full bg-stone-100 p-1">
                {[
                    { id: "read", label: `Read (${readList.length})` },
                    { id: "wishlist", label: `Wishlist (${wishlist.length})` },
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                            tab === t.id
                                ? "bg-stone-900 text-white"
                                : "text-stone-600 hover:text-stone-900"
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {activeList.length === 0 ? (
                <p className="py-16 text-center text-stone-500">
                    Nothing here yet.{" "}
                    <Link href="/Books" className="font-semibold text-amber-600 hover:underline">
                        Browse books
                    </Link>
                </p>
            ) : (
                <div className="flex flex-col gap-4">
                    {activeList.map((book) => (
                        <ListItem
                            key={book.bookId}
                            book={book}
                            onRemove={() =>
                                tab === "read"
                                    ? removeFrom(READ_KEY, readList, setReadList, book.bookId)
                                    : removeFrom(WISH_KEY, wishlist, setWishlist, book.bookId)
                            }
                        />
                    ))}
                </div>
            )}
        </section>
    );
}