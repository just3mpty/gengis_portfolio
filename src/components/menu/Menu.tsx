"use client";
import React from "react";
import styles from "@/styles/menu.module.css";
import Link from "next/link";

type Menu = {
    isOpen: boolean;
    click: () => void;
};
type MenuLinks = {
    name: string;
    path: string;
};

const links: MenuLinks[] = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Projects",
        path: "/",
    },
    {
        name: "About",
        path: "/",
    },
    {
        name: "Contact",
        path: "/",
    },
];

const Menu = ({ isOpen, click }: Menu) => {
    return (
        <div className={styles.menuContainer}>
            <nav style={isOpen ? { right: "0" } : { right: "-100%" }}>
                <ul>
                    {links.map((link, idx) => (
                        <li key={idx}>
                            <Link onClick={click} href={link.path}>
                                {link.name} <span>0{idx + 1}.</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
