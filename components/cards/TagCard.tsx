import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { getDeviconClassName } from "@/lib/utils";
import Image from "next/image";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  isButton,
  remove,
  handleRemove,
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }
  const iconClass = getDeviconClassName(name);
  const content = (
    <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
      <div className="flex-center space-x-2">
        <i className={`${iconClass} text-sm`}></i>
        <span>{name}</span>
      </div>
      {
        remove && <Image src="/icons/close.svg" alt="close" width={12} height={12} className="cursor-pointer object-contain invert-0 dark:invert" onClick={handleRemove} />
      }
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </Badge>
  );

  if (compact) {
    return isButton ? (
      <button onClick={handleClick} className="flex-between gap-2">
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAG(_id)}
        className="flex justify-between items-center gap-2"
      >
        {content}
      </Link>
    );
  }

  // return (
  //   <Link
  //     href={ROUTES.TAG(_id)}
  //     className="flex justify-between items-center gap-2"
  //   >
  //     {content}
  //   </Link>
  // );
};

export default TagCard;
