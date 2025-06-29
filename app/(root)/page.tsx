import Link from "next/link";

import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";
// import { auth } from "@/auth";
//import handleError from "@/lib/handlers/error";

//import { api } from "@/lib/api";

// const test = async() => {
//   try {
//     return api.users.getAll()
//   } catch (error) {
//     return handleError(error);
//   }
// }

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  // // const users = await test();
  // // console.log( users);
  // const session = await auth();
  // console.log("Session:", session);

  const { page, pageZige, query, filter } = await searchParams;
  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageZige) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          iconSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClass="flex-1"
        />
      </section>
      <HomeFilter />
      {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No Questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 items-center justify-center flex w-full">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch questions"}
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
