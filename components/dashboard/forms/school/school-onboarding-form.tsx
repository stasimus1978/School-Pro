"use client";

import { createSchool } from "@/actions/school";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type SchoolProps = {
  name: string;
  logo: string;
};

export default function SchoolOnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolProps>({
    defaultValues: {
      name: "",
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = "/images/logo.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: SchoolProps) {
    try {
      setLoading(true);
      data.logo = imageUrl;
      console.log("Data: ", data);
      const res = await createSchool(data);
      console.log(res);
      setLoading(false);
      toast.success("Successfully Created!");
      reset();
      router.push(`/school-admin/${res.id}?name=${res.name}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <div className="text-center">
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Welcome to School Pro,
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-2">
          Complete your school's profile to get started with SchoolPro.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 py-6">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="School Name"
                name="name"
              />
            </div>

            <div className="grid">
              <ImageInput
                title="Customize your School Logo (500px x 150px)"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="schoolLogo"
                className="object-contain"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      <SubmitButton
        buttonIcon={Send}
        title="Register School"
        loading={loading}
        loadingTitle="Creating please wait..."
      />
    </form>
  );
}
