import Scene from "@/components/canva/Scene";
import styles from "./page.module.css";
import Banner from "@/components/banner/Banner";
import SelectedWorks from "@/components/selectedWorks/SelectedWorks";

export default function Home() {
    return (
        <main className={styles.main}>
            {/* HOMEPAGE */}
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

            {/* MOVING BANNERS */}
            <Banner background="var(--accent)" text="HIGHLIGHTS" />
            <Banner background="var(--white)" text="SELECTED WORKS" />

            {/* SELECTED WORKS */}
            <SelectedWorks />
        </main>
    );
}
