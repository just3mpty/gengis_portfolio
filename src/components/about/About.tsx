/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import styles from "@/styles/about.module.css";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

const About = () => {
    return (
        <section id="about" className={styles.container}>
            <h2>
                About <span>me</span>
            </h2>
            <div className={styles.content}>
                <ParallaxBanner className={styles.parallax}>
                    <ParallaxBannerLayer
                        speed={-5}
                        image={"/images/logo.png"}
                    />
                </ParallaxBanner>
                <div className={styles.text}>
                    <p>
                        I'm Gengis, I work as a <span>freelance</span> 3D
                        artist.
                    </p>
                    <p>
                        3D enjoyer and visual storyteller, creating{" "}
                        <span>captivating</span> digital art and designs. With a
                        keen eye for detail and a passion for aesthetics, I
                        craft unique and engaging{" "}
                        <span>visual experiences</span>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
