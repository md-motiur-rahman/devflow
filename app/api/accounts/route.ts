import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();
    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIResponse;
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validateResult = AccountSchema.safeParse(body);
    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.flatten().fieldErrors);
    }
    const existingAccount = await Account.findOne({
      provider: validateResult.data.provider,
      providerAccountId: validateResult.data.providerAccountId,
    });

    if (existingAccount) {
      throw new ForbiddenError(
        "Account with this provider and account ID already exists."
      );
    }
    const newAccount = await Account.create(validateResult.data);
    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIResponse;
  }
}
