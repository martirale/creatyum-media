import localFont from "next/font/local";

const Roboto = localFont({
  src: [
    {
      path: "../../public/fonts/roboto-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto-lightitalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/roboto-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto-mediumitalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-roboto",
});

const BricolageGrotesque = localFont({
  src: [
    {
      path: "../../public/fonts/bricolagegrotesque-condextralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/bricolagegrotesque-condextrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-bricolagegrotesque",
});

export { Roboto, BricolageGrotesque };
