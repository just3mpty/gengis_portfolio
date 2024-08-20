"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/customCursor.module.css";

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            setCursorPosition({ x: clientX, y: clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const followCursor = () => {
            setPosition((prevPosition) => {
                const dx = cursorPosition.x - prevPosition.x;
                const dy = cursorPosition.y - prevPosition.y;
                const speed = 0.1;

                if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                    return {
                        x: prevPosition.x + dx * speed,
                        y: prevPosition.y + dy * speed,
                    };
                }
                return prevPosition;
            });

            requestRef.current = requestAnimationFrame(followCursor);
        };

        requestRef.current = requestAnimationFrame(followCursor);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [cursorPosition]);

    return (
        <div
            className={styles.cursor}
            style={{
                position: "fixed",
                top: position.y - 30 / 2,
                left: position.x - 30 / 2,
                width: `30px`,
                height: `30px`,
            }}
        />
    );
};

export default Cursor;
