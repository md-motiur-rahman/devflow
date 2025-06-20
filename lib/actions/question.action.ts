"use server";

import { ActionResponse, ErrorResponse } from "@/types/global";
import action from "../handlers/actions";
import { AskQuestionSchema } from "../validations";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import TagQuestion from "@/database/tag_question.model";

export async function createQuestion(
  params: CreateQuestionParams
): Promise<ActionResponse> {
  const validatedResult = await action({
    params,
    schema: AskQuestionSchema,
    authorize: true,
  });

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const { title, content, tags } = validatedResult.params!;
  const userId = validatedResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [question] = await Question.create(
      [{ title, content, author: userId }],
      { session }
    );
    if (!question) {
      throw new Error("Failed to create question");
    }
    const tagId: mongoose.Types.ObjectId[] = [];
    const tagQuestionDocs = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
        { session, upsert: true, new: true }
      );
      tagId.push(existingTag._id);
      tagQuestionDocs.push({
        question: question._id,
        tag: existingTag._id,
      });
    }

    await TagQuestion.insertMany(tagQuestionDocs, { session });
    await Question.findByIdAndUpdate(
      question._id,
      { $push: { tags: { $each: tagId } } },
      { session }
    );
    await session.commitTransaction();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(question)),
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
