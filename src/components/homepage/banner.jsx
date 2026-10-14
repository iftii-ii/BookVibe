import React from "react";
import Image from "next/image";
import bannerimage from "@/assets/hero_img.jpg";

const Banner = () => {
    return (
        <section className="mx-auto mt-8 max-w-7xl px-4">
            <div className="relative overflow-hidden rounded-[2rem] bg-stone-900 px-6 py-12 sm:px-12 lg:py-16">
                {/* Decorative glows */}
                <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

                <div className="relative grid items-center gap-10 lg:grid-cols-2">
                    {/* Text */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                            Books to freshen up <br className="hidden sm:block" /> your
                            bookshelf
                        </h2>
                        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone-300 lg:mx-0">
                            Browse stories, track what you have read, and keep a wishlist of
                            what comes next.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                            <a
                                href="#books"
                                className="rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-stone-900 transition hover:bg-amber-300"
                            >
                                View the list
                            </a>
                            <a
                                href="#"
                                className="rounded-full border border-stone-600 px-7 py-3 text-sm font-semibold text-white transition hover:border-stone-400"
                            >
                                Learn more
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative mx-auto w-full max-w-md">
                        <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-3xl bg-amber-400/80" />
                        <Image
                            src={bannerimage}
                            alt="Banner Image"
                            priority
                            className="relative h-auto w-full rounded-3xl object-cover shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;