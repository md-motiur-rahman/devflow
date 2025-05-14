import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import TagCard from "./TagCard";
import Matric from "../Matric";

interface Props {
  question: Question;
}

const QuestionCard = ({
  question: { _id, title, tags, author, answers, upvotes, views, createdAt },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>

          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap w-full gap-2">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>
      <div className="flex-between mt-6 flex-wrap gap-3 w-full">
        <Matric
          imgUrl={author.image}
          value={author.name}
          title={` ·݀݀݀݀ asked ${getTimeStamp(createdAt)} ago`}
          href={ROUTES.PROFILE(author._id)}
          textStyle="body-medium text-dark400_light700"
          isAuthor
          alt="author"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Matric
            imgUrl="/icons/like.svg"
            alt="like"
            value={upvotes}
            title=" Votes"
            textStyle="small-medium text-dark400_light800"
          />
          <Matric
            imgUrl="/icons/message.svg"
            alt="comment"
            value={answers}
            title={answers > 1 ? " Answers" : " Answer"}
            textStyle="small-medium text-dark400_light800"
          />
          <Matric
            imgUrl="/icons/eye.svg"
            alt="views"
            value={views}
            title={views > 1 ? " Views" : " View"}
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
