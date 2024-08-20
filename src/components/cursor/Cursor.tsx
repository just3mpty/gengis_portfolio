"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/customCursor.module.css";

interface CustomCursorProps {
    isHovering: boolean;
}

const CustomCursor = ({ isHovering }: CustomCursorProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const size = isHovering ? 120 : 30;

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <div
            className={styles.cursor}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
};

export default CustomCursor;
