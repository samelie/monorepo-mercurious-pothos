import { TRPCError } from "@trpc/server";
// import bcrypt from "bcryptjs";
// import { OptionsType } from "cookies-next/lib/types";
// import customConfig from "../config/default";
// import { Context } from "../createContext";
// import { CreateUserInput, LoginUserInput } from "../schema/user.schema";
// import {
//   createUser,
//   findUniqueUser,
//   findUser,
//   signTokens,
// } from "../services/user.service";
// import redisClient from "../utils/connectRedis";
// import { signJwt, verifyJwt } from "../utils/jwt";


export const registerHandler = async ({
  input,
}: {
  input: any;
}) => {
  // try {
  //   const hashedPassword = await bcrypt.hash(input.password, 12);
  //   const user = await createUser({
  //     email: input.email,
  //     name: input.name,
  //     password: hashedPassword,
  //     photo: input.photo,
  //     provider: "local",
  //   });

  //   return {
  //     status: "success",
  //     data: {
  //       user,
  //     },
  //   };
  // } catch (err: any) {
  //   if (err.code === "P2002") {
  //     throw new TRPCError({
  //       code: "CONFLICT",
  //       message: "Email already exists",
  //     });
  //   }
  //   throw err;
  // }
};
