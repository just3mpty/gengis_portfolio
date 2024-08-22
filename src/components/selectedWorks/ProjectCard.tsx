import React from "react";
import styles from "@/styles/projectCard.module.css";
import Link from "next/link";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

interface ProjectProps {
    title: string;
    date?: string;
    cover: string;
    url: string;
}

const ProjectCard = ({ title, date, cover, url }: ProjectProps) => {
    const formattedDate = date
        ? new Date(date).toISOString().split("T")[0].replace(/-/g, ".")
        : undefined;

    return (
        <Link href={url} className={styles.card}>
            <ParallaxBanner
                className={styles.parallax}
                style={{ position: "relative" }}>
                <ParallaxBannerLayer speed={-15} image={cover} />
            </ParallaxBanner>
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
