import Scene from "@/components/canva/Scene";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
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
        </main>
    );
}
