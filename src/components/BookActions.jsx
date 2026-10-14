"use client";

import { useEffect, useState } from "react";

const READ_KEY = "readList";
const WISH_KEY = "wishlist";

const load = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
};

const save = (key, list) => localStorage.setItem(key, JSON.stringify(list));

export default function BookActions({ book }) {
    const [isRead, setIsRead] = useState(false);
    const [isWished, setIsWished] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setIsRead(load(READ_KEY).some((b) => b.bookId === book.bookId));
        setIsWished(load(WISH_KEY).some((b) => b.bookId === book.bookId));
    }, [book.bookId]);

    const handleRead = () => {
        if (isRead) {
            setMessage("This book is already in your read list.");
            return;
        }
        save(READ_KEY, [...load(READ_KEY), book]);
        // A book you have read no longer belongs in the wishlist
        save(WISH_KEY, load(WISH_KEY).filter((b) => b.bookId !== book.bookId));
        setIsRead(true);
        setIsWished(false);
        setMessage("Added to your read list.");
    };

    const handleWishlist = () => {
        if (isRead) {
            setMessage("You have already read this book.");
            return;
        }
        if (isWished) {
            setMessage("This book is already in your wishlist.");
            return;
        }
        save(WISH_KEY, [...load(WISH_KEY), book]);
        setIsWished(true);
        setMessage("Added to your wishlist.");
    };

    return (
        <div className="flex flex-col items-end gap-3">
            <div className="flex gap-3">
                <button
                    onClick={handleWishlist}
                    className={`rounded-full border px-8 py-3 text-sm font-semibold transition ${isWished
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-stone-300 bg-white text-stone-800 hover:border-stone-900 hover:bg-stone-50"
                        }`}
                >
                    {isWished ? "♥ In wishlist" : "♡ Wishlist"}
                </button>
                <button
                    onClick={handleRead}
                    className={`rounded-full px-8 py-3 text-sm font-bold transition ${isRead
                            ? "bg-stone-900 text-amber-300"
                            : "bg-amber-400 text-stone-900 hover:bg-amber-300"
                        }`}
                >
                    {isRead ? "✓ Read" : "Read"}
                </button>
            </div>
            {message && <p className="text-sm text-stone-500">{message}</p>}
        </div>
    );
}