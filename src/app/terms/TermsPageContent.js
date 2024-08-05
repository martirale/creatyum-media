"use client";

import { useState, useEffect } from "react";
import FormatContent from "../../components/FormatContent";

const TermsPageContent = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyContent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/terms-of-use`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch data:", res.status, res.statusText);
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setContent(data.data.attributes.content);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchPrivacyContent();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error fetching data</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-extrabold text-5xl pb-16 md:text-7xl">
        Términos de uso
      </h2>
      <FormatContent blocks={content} />
    </div>
  );
};

export default TermsPageContent;
