import React from "react";
import styles from "@/styles/banner.module.css";

interface BannerProps {
    background: string;
    text: string;
}

const Banner = ({ background, text }: BannerProps) => {
    return (
        <div style={{ background: background }} className={styles.banner}>
            <p>*</p>
            <p>{text}</p>
        </div>
    );
};

export default Banner;
