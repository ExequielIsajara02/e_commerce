"use client";

import { useState } from "react";

export const Slider = () => {
    const [index, setIndex] = useState(0);

    const banners = [
        "https://png.pngtree.com/template/20220331/ourmid/pngtree-simple-atmosphere-fashion-sneaker-banner-poster-image_912834.jpg",
        "https://d2t2u1vclegqzc.cloudfront.net/b2b/1_desktop.jpg",
        "https://img.pikbest.com/origin/06/39/82/47ppIkbEsT7dJ.jpg!w700wp",
            // "https://via.placeholder.com/800x300/FF5733/fff?text=Banner+1",
            // "https://via.placeholder.com/800x300/33FF57/fff?text=Banner+2",
            // "https://via.placeholder.com/800x300/3357FF/fff?text=Banner+3",
            // "https://via.placeholder.com/800x300/FFFF33/fff?text=Banner+4",
    ];

    const nextBanner = () => {
        setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevBanner = () => {
        setIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative w-full h-96 mb-44">

            <div className="overflow-hidden w-full h-full">
                {/* Aplicamos el estilo `translateX` para desplazar los banners */}
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >

                    {banners.map((banner, i) => (
                        <div key={i} className="w-full flex-shrink-0">
                            <h1 className="text-center text-xl mb-4">Combos Destacados</h1>
                            <img src={banner} alt={`Banner ${i + 1}`} className="m-auto w-full h-auto object-contain object-top" />
                        </div>
                    ))}

                </div>

            </div>



            {/* Botones de navegación */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={prevBanner}
            >
                {"<"}
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={nextBanner}
            >
                {">"}
            </button>

        </div>
    );
};
