/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import styles from "@/styles/notFound.module.css";
import Scene from "@/components/canva/Scene";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1>404</h1>
            <div className={styles.scene}>
                <Scene />
            </div>
            <h2>404</h2>
            <div className={styles.content}>
                <p>Sorry, you asked for something that doesn’t exist...</p>
                <div className={styles.links}>
                    <Link className={styles.link} href="/">
                        Try again
                    </Link>
                    <Link
                        className={styles.link}
                        href="https://www.google.com/search?q=loser&sca_esv=7714a799c7b8016b&udm=2&biw=1920&bih=917&sxsrf=ADLYWIIK7J-QCX6U2cUFV9ZV51r7EFGV7g%3A1724237807683&ei=78fFZuOpKa-ckdUP--DgoAw&ved=0ahUKEwij3aOw9oWIAxUvTqQEHXswGMQQ4dUDCBA&uact=5&oq=loser&gs_lp=Egxnd3Mtd2l6LXNlcnAiBWxvc2VyMgoQABiABBhDGIoFMgQQABgDMgUQABiABDIKEAAYgAQYQxiKBTIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEibFlCkCVifDXADeACQAQCYAXmgAacDqgEDNC4xuAEDyAEA-AEBmAIIoAK9A8ICBhAAGAcYHsICCBAAGIAEGLEDwgILEAAYgAQYsQMYgwGYAwCIBgGSBwM3LjGgB7gW&sclient=gws-wiz-serp/"
                        target="_blank">
                        Give up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
