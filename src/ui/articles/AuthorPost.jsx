import React from "react";
import Image from "next/image";
import Link from "next/link";

const AuthorPost = ({ author }) => {
  if (!author) {
    return null;
  }

  const profileImageUrl = author.profile?.url;

  return (
    <div className="mb-16">
      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
        {profileImageUrl && (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${profileImageUrl}`}
            alt={author.name || "Author"}
            width={256}
            height={256}
            className="self-center flex-shrink-0 w-24 h-24 border border-black rounded-full md:justify-self-start dark:border-yellow"
          />
        )}

        <div className="flex flex-col">
          <h4 className="text-3xl text-center font-extrabold mt-1 mb-2 hover:underline md:text-left">
            <Link href={`/autor/${author.slug}`}>{author.name}</Link>
          </h4>
          <p className="text-center md:text-left">{author.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorPost;
