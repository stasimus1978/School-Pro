// import { convertDateToISO } from "@/lib/convertDateToIso";
import { TypedRequestBody, UserCreateProps } from "@/types/types";
import { createUserService } from "../../students/route";

// Create
export async function POST(request: TypedRequestBody<UserCreateProps>) {
  const data = await request.json();

  try {
    const newUser = await createUserService(data);

    return new Response(JSON.stringify({ data: newUser, error: null }), {
      status: 201,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Something went wrong", data: null }),
      {
        status: 500,
        // headers: { "Content-Type": "application/json" },
      }
    );
  }
}
