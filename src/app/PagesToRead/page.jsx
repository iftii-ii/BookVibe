"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const READ_KEY = "readList";

const load = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
};

const shorten = (text, max = 12) =>
    text.length > max ? text.slice(0, max) + "…" : text;

export default function PagesToReadPage() {
    const [readList, setReadList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setReadList(load(READ_KEY));
        setLoaded(true);
    }, []);

    if (!loaded) return null;

    if (readList.length === 0) {
        return (
            <section className="mx-auto max-w-4xl px-4 py-20 text-center">
                <h1 className="text-4xl font-extrabold text-stone-900">Pages To Read</h1>
                <p className="mt-6 text-stone-500">
                    You have not marked any book as read yet.{" "}
                    <Link href="/Books" className="font-semibold text-amber-600 hover:underline">
                        Browse books
                    </Link>
                </p>
            </section>
        );
    }

    // Sort so the book with the most pages comes first
    const data = [...readList]
        .sort((a, b) => b.totalPages - a.totalPages)
        .map((b) => ({ name: b.bookName, pages: b.totalPages }));

    const maxPages = data[0].pages;
    const totalPages = data.reduce((sum, b) => sum + b.pages, 0);

    return (
        <section className="mx-auto max-w-5xl px-4 py-12">
            <h1 className="mb-2 text-center text-4xl font-extrabold text-stone-900">
                Pages To Read
            </h1>
            <p className="mb-10 text-center text-stone-500">
                The page count of every book in your read list.
            </p>

            {/* Summary */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center shadow-sm">
                    <p className="text-3xl font-extrabold text-stone-900">{readList.length}</p>
                    <p className="text-sm text-stone-500">Books read</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center shadow-sm">
                    <p className="text-3xl font-extrabold text-stone-900">{totalPages}</p>
                    <p className="text-sm text-stone-500">Total pages</p>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center shadow-sm">
                    <p className="text-3xl font-extrabold text-stone-900">{maxPages}</p>
                    <p className="truncate text-sm text-stone-600">Longest: {data[0].name}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                            <XAxis
                                dataKey="name"
                                tickFormatter={(value) => shorten(value)}
                                tick={{ fontSize: 12, fill: "#78716c" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: "#78716c" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: "rgba(251, 191, 36, 0.12)" }}
                                contentStyle={{ borderRadius: 12, border: "1px solid #e7e5e4" }}
                                formatter={(value) => [`${value} pages`, "Pages"]}
                            />
                            <Bar dataKey="pages" radius={[10, 10, 0, 0]} maxBarSize={60}>
                                {data.map((entry) => (
                                    <Cell
                                        key={entry.name}
                                        fill={entry.pages === maxPages ? "#fbbf24" : "#292524"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}