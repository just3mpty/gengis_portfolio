"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Cursor from "@/components/cursor/Cursor";
import ToggleButton from "@/components/menu/ToggleButton";
import { ParallaxProvider } from "react-scroll-parallax";
import { usePathname } from "next/navigation";

const variants = {
    hidden: { opacity: 0, x: 0, y: 100 },
    enter: { opacity: 1, x: 0, y: 0 },
};

export default function Template({ children }: { children: ReactNode }) {
    const lenis = useLenis(({ scroll }) => {});
    const pathname = usePathname();

    // Définir les routes du dashboard
    const dashboardRoutes = [
        "/dashboard",
        "/dashboard/create-project",
        "/dashboard/update-project",
        "/dashboard/delete-project",
    ];

    // Vérifier si la route actuelle fait partie des routes du dashboard
    const isDashboardRoute = dashboardRoutes.includes(pathname);

    return (
        <ParallaxProvider>
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
                    {!isDashboardRoute && <Cursor />}
                    <ToggleButton />
                    {children}
                </motion.main>
            </ReactLenis>
        </ParallaxProvider>
    );
}
