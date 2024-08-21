"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/customCursor.module.css";
import Image from "next/image";

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [cursorSize, setCursorSize] = useState(30);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            setCursorPosition({ x: clientX, y: clientY });
        };

        const handleMouseEnter = () => {
            setCursorSize(120);
        };

        const handleMouseLeave = () => {
            setCursorSize(30);
        };

        window.addEventListener("mousemove", handleMouseMove);

        const elements = document.querySelectorAll("a");
        elements.forEach((element) => {
            element.addEventListener("mouseenter", handleMouseEnter);
            element.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            elements.forEach((element) => {
                element.removeEventListener("mouseenter", handleMouseEnter);
                element.removeEventListener("mouseleave", handleMouseLeave);
            });
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
                top: position.y - cursorSize / 2,
                left: position.x - cursorSize / 2,
                width: `${cursorSize}px`,
                height: `${cursorSize}px`,
            }}>
            <Image
                src={"/images/arrow.svg"}
                alt="Arrow icon"
                width={cursorSize === 30 ? 0 : 60}
                height={cursorSize === 30 ? 0 : 60}
            />
        </div>
    );
};

export default Cursor;
