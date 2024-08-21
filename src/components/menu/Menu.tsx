"use client";
import React from "react";
import styles from "@/styles/menu.module.css";
import Link from "next/link";
import Image from "next/image";

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
        path: "/#projects",
    },
    {
        name: "About",
        path: "/#about",
    },
    {
        name: "Contact",
        path: "/#contact",
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
                <Link className={styles.dashboard} href={"/dashboard"}>
                    <Image src={"/images/lock.svg"} alt="Lock icon" fill />
                </Link>
            </nav>
        </div>
    );
};

export default Menu;
