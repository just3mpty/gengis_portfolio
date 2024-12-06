import Scene from "@/components/canva/Scene";
import styles from "./page.module.css";
import Banner from "@/components/banner/Banner";
import SelectedWorks from "@/components/selectedWorks/SelectedWorks";
import AllWorks from "@/components/works/AllWorks";
import About from "@/components/about/About";
import Footer from "@/components/footer/Footer";

export default function Home() {
    return (
        <main className={styles.main}>
            {/* HOMEPAGE */}
            <section id="homepage" className={styles.homepage}>
                <div className={styles.title}>
                    <h1>Gengis</h1>
                    <h2>
                        Artist, <br />
                        <span>3D</span> enjoyer.
                    </h2>
                </div>
                <div className={styles.scene}>
                    <Scene />
                </div>
            </section>

            {/* MOVING BANNERS */}
            <Banner background="var(--white)" text="HIGHLIGHTS" angle={-2} />
            <Banner
                background="var(--accent)"
                text="SELECTED WORKS"
                direction="right"
            />

            {/* SELECTED WORKS */}
            <SelectedWorks />

            {/* ALL WORKS */}
            <AllWorks />

            {/* ABOUT */}
            <About />

            <Footer />
        </main>
    );
}
