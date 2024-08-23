"use client";
import React, { useState } from "react";
import styles from "@/styles/menu.module.css";
import Menu from "./Menu";

const ToggleButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div
                onClick={toggleMenu}
                className={`${styles.menuButton} ${isOpen ? styles.open : ""}`}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>
            <Menu isOpen={isOpen} click={toggleMenu} />
        </>
    );
};

export default ToggleButton;
