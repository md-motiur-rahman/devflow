import { RouteParams } from "@/types/global";
import React from "react";

const QuestionDetails = async ({ params }: RouteParams) => {
    const { id } = await params;
  return <div>Question Details for {id}</div>;
};

export default QuestionDetails;
