import React from "react";
import styles from "@/styles/projectCard.module.css";
import Link from "next/link";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import Image from "next/image";

interface ProjectProps {
    title: string;
    date?: string;
    cover: string;
    url: string;
    parallax?: boolean;
}

const ProjectCard = ({ title, date, cover, url, parallax }: ProjectProps) => {
    const formattedDate = date
        ? new Date(date).toISOString().split("T")[0].replace(/-/g, ".")
        : undefined;

    return (
        <Link href={url} className={styles.card}>
            {parallax ? (
                <ParallaxBanner
                    className={styles.parallax}
                    style={{ position: "relative" }}>
                    <ParallaxBannerLayer speed={-10} image={cover} />
                </ParallaxBanner>
            ) : (
                <figure>
                    <Image src={cover} alt={`${title}'s illustration`} fill />
                </figure>
            )}
            <div className={styles.text}>
                <p>{title}</p>
                {formattedDate && (
                    <p className={styles.date}>{formattedDate}</p>
                )}
            </div>
        </Link>
    );
};

export default ProjectCard;
