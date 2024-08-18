"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/banner.module.css";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface BannerProps {
    background: string;
    text: string;
    direction?: "left" | "right";
    angle?: number;
}

const Banner = ({
    background,
    text,
    direction = "left",
    angle = 0,
}: BannerProps) => {
    const [repeatCount, setRepeatCount] = useState(10);
    const { scrollY } = useScroll();

    const x = useTransform(
        scrollY,
        [0, 1500],
        direction === "left" ? [0, -250] : [0, 250]
    );

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const textWidth = text.length * 10;
        const count = Math.ceil(screenWidth / textWidth) + 2;
        setRepeatCount(count);
    }, [text]);

    return (
        <div
            style={{ background: background, transform: `rotate(${angle}deg)` }}
            className={styles.container}>
            <motion.div className={styles.bannerContent} style={{ x }}>
                {[...Array(repeatCount)].map((_, index) => (
                    <div className={styles.banner} key={index}>
                        <Image
                            src="/images/star.svg"
                            alt="Star icon"
                            width={50}
                            height={50}
                        />
                        <p>{text}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Banner;
