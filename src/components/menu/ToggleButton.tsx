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
            <button
                onClick={toggleMenu}
                className={styles.menuButton}
                style={
                    isOpen
                        ? {
                              backgroundColor: "#f8f9fa",
                          }
                        : { backgroundColor: "#fbff4f" }
                }></button>
            <Menu isOpen={isOpen} click={toggleMenu} />
        </>
    );
};

export default ToggleButton;
