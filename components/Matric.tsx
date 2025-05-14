import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl: string;
  value: number | string;
  title: string;
  alt: string;
  textStyle: string;
  href?: string;
  isAuthor?: boolean;
}

const Matric = ({
  imgUrl,
  value,
  title,
  alt,
  textStyle,
  href,
  isAuthor,
}: Props) => {
  const content = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={isAuthor ? 20 : 16}
        height={isAuthor ? 20 : 16}
        className="rounded-full object-contain"
      />
      <p className={`${textStyle} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );
  return href ? (
    <Link href={href} className="flex-center gap-1">
      {content}
    </Link>
  ) : (
    <div className="flex-center gap-1">{content}</div>
  );
};

export default Matric;
