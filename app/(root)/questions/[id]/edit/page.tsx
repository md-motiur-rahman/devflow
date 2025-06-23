import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.action";
import { RouteParams } from "@/types/global";
import { notFound, redirect } from "next/navigation";
import React from "react";

const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();
  const session = await auth();
  if (!session) return redirect("sign-in");
  const { data: question, success } = await getQuestion({ questionId: id });
  if (!success || !question) return notFound();

  if (question?.author._id.toString() !== session?.user?.id)
    redirect(ROUTES.QUESTION(id));

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit question</h1>
      <div className="mt-9">
        <QuestionForm question={question} isEdit />
      </div>
    </div>
  );
};

export default EditQuestion;
