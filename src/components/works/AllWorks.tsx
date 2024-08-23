"use client";
import React, { useState } from "react";
import styles from "@/styles/works.module.css";
import Link from "next/link";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

const Category = [
    {
        category: "freelance",
        image: "/images/freelance.png",
        text: "Freelance Projects",
    },
    {
        category: "personnal",
        image: "/images/personnal.png",
        text: "Personnal stuff",
    },
];

const AllWorks = () => {
    const [hovering, setHovering] = useState<boolean[]>(
        Array(Category.length).fill(false)
    );
    const [heights, setHeights] = useState<number[]>(
        Array(Category.length).fill(200)
    );

    const handleMouseEnter = (index: number) => {
        const newHeights = [...heights];
        newHeights[index] = 400;
        setHeights(newHeights);

        const newHovering = [...hovering];
        newHovering[index] = true;
        setHovering(newHovering);
    };

    const handleMouseLeave = (index: number) => {
        const newHeights = [...heights];
        newHeights[index] = 200;
        setHeights(newHeights);

        const newHovering = [...hovering];
        newHovering[index] = false;
        setHovering(newHovering);
    };

    return (
        <section id="projects" className={styles.container}>
            <div className={styles.title}>
                <h2>
                    More of my <br /> <span>works</span>
                </h2>
            </div>
            <div className={styles.categories}>
                {Category.map((cat, idx) => (
                    <Link
                        onMouseEnter={() => handleMouseEnter(idx)}
                        onMouseLeave={() => handleMouseLeave(idx)}
                        key={idx}
                        style={{
                            height: heights[idx],
                            transition: "height 0.3s ease",
                        }}
                        href={`/works/${cat.category}`}
                        className={styles.category}>
                        <ParallaxBanner
                            style={
                                hovering[idx]
                                    ? {
                                          filter: "none",
                                          opacity: 1,
                                      }
                                    : {
                                          filter: "grayscale(1)",
                                          opacity: 0.5,
                                      }
                            }
                            className={styles.parallax}>
                            <ParallaxBannerLayer
                                image={cat.image}
                                speed={-20}
                            />
                        </ParallaxBanner>
                        <p>{cat.text}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default AllWorks;
