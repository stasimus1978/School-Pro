"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageInput from "@/components/FormInputs/ImageInput";
import TextInput from "@/components/FormInputs/TextInput";
import toast from "react-hot-toast";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Send } from "lucide-react";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

export type StudentProps = {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
};

export default function SchoolOnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      imageUrl: "",
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = "/images/logo.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: StudentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      console.log("Data: ", data);
      // await updateCategoryById(editingId, data);
      // setLoading(false);
      // toast.success("Updated Successfully!");
      // reset();
      // router.push("/dashboard/categories");
      // setImageUrl("/placeholder.svg");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <div className="text-center">
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">Welcome to School Pro,</h2>

        <p className="leading-7 [&:not(:first-child)]:mt-2">
          Complete your school's profile to get started with SchoolPro.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 py-6">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <TextInput register={register} errors={errors} label="School Name" name="name" />
            </div>

            <div className="grid">
              <ImageInput
                title="Customize your School Logo"
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
