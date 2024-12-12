"use client";

import { createUser } from "@/actions/users";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { UserCreateProps } from "@/types/types";
import { Lock, Mail, Phone, Send, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// import { useRouter } from "next/navigation";

export type SchoolProps = {
  name: string;
  logo: string;
};

export default function SchoolAdminForm({
  schoolId,
  schoolName,
}: {
  schoolId: string;
  schoolName: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserCreateProps>({
    defaultValues: {
      name: "",
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function saveStudent(data: UserCreateProps) {
    try {
      setLoading(true);
      data.schoolId = schoolId;
      data.schoolName = schoolName;
      data.role = "ADMIN";

      console.log("Data: ", data);

      const res = await createUser(data);
      console.log(res);
      setLoading(false);
      toast.success("Admin Successfully Created!");
      reset();
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <div className="text-center">
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Welcome to {schoolName}
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-2">
          Create the Admin for this School
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 py-6">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Admin Name"
                name="name"
                icon={User}
              />
              <TextInput
                register={register}
                errors={errors}
                label="Admin Email"
                name="email"
                icon={Mail}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Admin Phone"
                name="phone"
                icon={Phone}
              />
              <PasswordInput
                register={register}
                errors={errors}
                label="Admin Password"
                name="password"
                icon={Lock}
              />
            </div>
          </div>
        </div>
      </div>

      <SubmitButton
        buttonIcon={Send}
        title="Create School Admin"
        loading={loading}
        loadingTitle="Creating please wait..."
      />
    </form>
  );
}
