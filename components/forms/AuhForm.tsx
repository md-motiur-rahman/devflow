"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { ActionResponse } from "@/types/global";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  formType,
}: AuthFormProps<T>) => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;
    if (result?.success) {
      toast.success(
        formType === "SIGN_IN"
          ? "Signed in successfully!"
          : "Signed up successfully!"
      );
      router.push(ROUTES.HOME);
    }
    else{
      toast.error(
        result?.error?.message
      );
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-10"
        autoComplete="off"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full">
                <FormLabel className=" capitalize paragraph-medium text-dark400_light700">
                  {field.name === "email" ? "Email Address" : field.name}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={
                      field.name === "password"
                        ? "password"
                        : field.name === "email"
                        ? "email"
                        : "text"
                    }
                    {...field}
                    className=" paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting ? (
            <Loader className=" animate-spin" />
          ) : (
            buttonText
          )}
        </Button>
        {formType === "SIGN_IN" ? (
          <p className="paragraph-regular text-dark400_light700">
            Don&apos;t have an account?{" "}
            <a
              href="/sign-up"
              className="paragraph-medium primary-text-gradient hover:text-primary-600 focus:outline-none cursor-pointer "
            >
              Sign Up
            </a>
          </p>
        ) : (
          <p className="paragraph-regular text-dark400_light700">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="paragraph-medium primary-text-gradient hover:text-primary-600 focus:outline-none cursor-pointer "
            >
              Sign In
            </a>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
