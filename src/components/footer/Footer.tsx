import React from "react";
import styles from "@/styles/footer.module.css";
import Link from "next/link";
import Image from "next/image";

interface Links {
    icon: string;
    text: string;
    url: string;
}

const links: Links[] = [
    {
        icon: "/images/email.svg",
        text: "Email",
        url: "mailto:gengis3d@gmail.com",
    },
];
const socials: Links[] = [
    {
        icon: "/images/instagram.svg",
        text: "Instagram",
        url: "https://instagram.com/gengis10_",
    },
    {
        icon: "/images/twitter.svg",
        text: "Twitter / X",
        url: "https://x.com/Gengis10_",
    },
];

const Footer = () => {
    return (
        <footer id="contact" className={styles.footer}>
            <h2>
                What if we worked <br /> <span>together</span>
            </h2>

            <div className={styles.links}>
                {links.map((link, idx) => (
                    <Link target="_blank" key={idx} href={link.url}>
                        <p>{link.text}</p>
                        <Image
                            src={link.icon}
                            alt={`${link.text}'s icon`}
                            width={24}
                            height={24}
                        />
                    </Link>
                ))}
            </div>
            <div className={styles.links}>
                {socials.map((link, idx) => (
                    <Link target="_blank" key={idx} href={link.url}>
                        <Image
                            src={link.icon}
                            alt={`${link.text}'s icon`}
                            width={30}
                            height={30}
                        />
                    </Link>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
