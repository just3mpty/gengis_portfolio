"use client";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Footer from "@/components/footer/Footer";
import Cursor from "@/components/cursor/Cursor";
import ToggleButton from "@/components/menu/ToggleButton";

const variants = {
    hidden: { opacity: 0, x: 0, y: 100 },
    enter: { opacity: 1, x: 0, y: 0 },
};

export default function Template({ children }: { children: ReactNode }) {
    const lenis = useLenis(({ scroll }) => {});

    return (
        <ReactLenis root>
            <motion.main
                className="slide-in"
                variants={variants}
                initial="hidden"
                animate="enter"
                transition={{
                    duration: 1,
                    ease: [0.2, 1, 0.3, 1],
                }}>
                <>
                    <Cursor />
                    <ToggleButton />
                    {children}
                    <Footer />
                </>
            </motion.main>
        </ReactLenis>
    );
}
