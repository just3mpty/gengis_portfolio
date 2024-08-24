import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["300", "400", "600", "900"],
});

export const metadata: Metadata = {
    title: "Gengis - 3D Artist",
    description:
        "3D enjoyer and visual storyteller, creating captivating digital art and designs. With a keen eye for detail and a passion for aesthetics, I craft unique and engaging visual experiences.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Gengis",
        image: "https://pbs.twimg.com/profile_images/1668933141719908352/mA8pJmIl_400x400.jpg",
        "@id": "https://pbs.twimg.com/profile_images/1668933141719908352/mA8pJmIl_400x400.jpg",
        url: "https://www.3dgengis.com/",

        priceRange: "$$",

        // AJOUTER ADRESSED
        address: {
            "@type": "PostalAddress",
            streetAddress: "",
            addressLocality: "",
            postalCode: "",
            addressCountry: "FR",
        },
        //

        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
        },
    };
    return (
        <html lang="en">
            <head>
                {/* <link rel="icon" href="/logo.svg" /> */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@Gengis10_" />
                <meta name="twitter:title" content="Gengis - 3D Artist" />
                <meta
                    name="twitter:description"
                    content="3D enjoyer and visual storyteller, creating captivating digital art and designs. With a keen eye for detail and a passion for aesthetics, I craft unique and engaging visual experiences."
                />
                <meta
                    name="twitter:image"
                    content="https://pbs.twimg.com/profile_images/1668933141719908352/mA8pJmIl_400x400.jpg"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Gengis - 3D Artist" />
                <meta
                    property="og:description"
                    content="3D enjoyer and visual storyteller, creating captivating digital art and designs. With a keen eye for detail and a passion for aesthetics, I craft unique and engaging visual experiences."
                />
                <meta
                    property="og:image"
                    content="https://pbs.twimg.com/profile_images/1668933141719908352/mA8pJmIl_400x400.jpg"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={barlow.className}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
