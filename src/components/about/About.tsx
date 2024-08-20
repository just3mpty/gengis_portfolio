/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "@/styles/about.module.css";
import Scene from "../canva/Scene";
import Image from "next/image";

const About = () => {
    return (
        <section id="about" className={styles.container}>
            <h2>
                About <span>me</span>
            </h2>
            <div className={styles.content}>
                <figure>
                    <Image src={"/images/205.png"} alt="Profile Pic" fill />
                </figure>
                <div className={styles.text}>
                    <p>
                        I'm Gengis, I work as a <span>freelance</span> 3D
                        artist.
                    </p>
                    <p>
                        With a passion for storytelling and a keen eye for
                        detail, I seamlessly blend art and technology to create{" "}
                        <span>captivating content</span>. My work reflects a
                        commitment to innovation and excellence.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
