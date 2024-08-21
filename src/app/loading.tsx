import Scene from "@/components/canva/Scene";
import React from "react";
import styles from "@/styles/loading.module.css";

const LoadingPage = () => {
    return (
        <section id="homepage" className={styles.homepage}>
            <div className={styles.title}>
                <h1>Gengis</h1>
                <h2>
                    3D artist, <br />
                    <span>digital</span> sculptor.
                </h2>
            </div>
            <div className={styles.scene}>
                <Scene />
            </div>
        </section>
    );
};

export default LoadingPage;
