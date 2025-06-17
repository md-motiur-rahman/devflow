"use server"

import { ActionResponse, ErrorResponse } from "@/types/global";
import action from "../handlers/actions";
import { SignUpSchema } from "../validations";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import User from "@/database/user.model";
import bcrypt from "bcryptjs";
import Account from "@/database/account.model";
import { signIn } from "@/auth";

export async function signUpWithCredentials(
  params: authCredentials
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, email, username, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }
    const exsitingUsername = await User.findOne({ username }).session(session);
    if (exsitingUsername) {
      throw new Error("Username is already taken.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await User.create(
      [{ name, email, username, password: hashedPassword }],
      { session }
    );

    await Account.create(
      [{
        userId: newUser._id,
        name,
        provider: "credentials",
        providerAccountId: email,
        password: hashedPassword,
      }],
      { session }
    );
    await session.commitTransaction();

    await signIn("credentials", { email, password, redirect: false });
    return {success: true} as ActionResponse;
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
