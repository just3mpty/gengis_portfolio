import React from "react";
import styles from "@/styles/works.module.css";
import Image from "next/image";

const AllWorks = () => {
    return (
        <section id="works" className={styles.container}>
            <div className={styles.title}>
                <h2>
                    More of my <br /> <span>works</span>
                </h2>
            </div>
            <div className={styles.categories}>
                <div className={styles.category}>
                    <Image
                        src={"/images/205.png"}
                        alt="Category illustration"
                        fill
                    />
                    <div className={styles.overlay} />
                    <p>Freelance projects</p>
                </div>
                <div className={styles.category}>
                    <Image
                        src={"/images/205.png"}
                        alt="Category illustration"
                        fill
                    />

                    <div className={styles.overlay} />
                    <p>Personnal stuff</p>
                </div>
            </div>
        </section>
    );
};

export default AllWorks;
