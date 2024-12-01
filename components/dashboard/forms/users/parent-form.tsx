"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import ImageInput from "@/components/FormInputs/ImageInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { countries } from "@/lib/countries";

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

export default function ParentForm({ editingId, initialData }: SingleStudentFormProps) {
  // Parents
  const parents = [
    { label: "John Doe", value: "1234556" },
    { label: "Allan Smith", value: "1233778" },
  ];
  const [selectedParent, setSelectedParent] = useState<any>(null);

  // Class
  const classes = [
    { label: "S1", value: "1234556" },
    { label: "S2", value: "1233778" },
  ];
  const [selectedClass, setSelectedClass] = useState<any>(null);

  // Sections/Streams
  const streams = [
    { label: "S1A", value: "1234556" },
    { label: "S1B", value: "1233778" },
    { label: "S2A", value: "1233778" },
    { label: "S2b", value: "1233778" },
  ];
  const [selectedStream, setSelectedStream] = useState<any>(null);

  // Gender
  const genders = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
  ];
  const [selectedGender, setSelectedGender] = useState<any>(null);

  // Nationality
  const initialCountryCode = "UA";
  const initialCountry = countries.find((country) => country.countryCode === initialCountryCode);
  const [selectedNationality, setSelectedNationality] = useState<any>(initialCountry);

  // Religion
  const religions = [
    { label: "Roman Catholic", value: "Catholic" },
    { label: "Anglican", value: "Anglican" },
    { label: "Islamic", value: "Islamic" },
    { label: "Hindu", value: "Hindu" },
  ];
  const [selectedReligion, setSelectedReligion] = useState<any>(initialCountry);

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
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: StudentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;

      console.log("Data: ", data);

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        // await createCategory(data);
        // setLoading(false);
        // toast.success("Successfully Created!");
        // reset();
        // setImageUrl("/placeholder.svg");
        // router.push("/dashboard/categories");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <FormHeader href="/students" parent="" title="Student" editingId={editingId} loading={loading} />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput register={register} errors={errors} label="Student First Name" name="firstName" />
              <TextInput register={register} errors={errors} label="Student Last Name" name="lastName" />
              <TextInput register={register} errors={errors} label="Email" name="email" type="email" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Parent"
                options={parents}
                option={selectedParent}
                setOption={setSelectedParent}
                toolTipText="Add New Parent"
                href="/dashboard/parents/new"
              />

              <FormSelectInput
                label="Gender"
                options={genders}
                option={selectedGender}
                setOption={setSelectedGender}
                isSearchable={false}
              />

              <TextInput register={register} errors={errors} label="Date of Birth" name="dob" type="date" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput register={register} errors={errors} label="Phone" name="phone" type="tel" />

              <FormSelectInput
                label="Nationality"
                options={countries}
                option={selectedNationality}
                setOption={setSelectedNationality}
              />

              <PasswordInput
                register={register}
                errors={errors}
                label="Student Password"
                name="password"
                toolTipText="Password will be used by student on the student Portal"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput register={register} errors={errors} label="State/Village" name="state" />

              <TextInput register={register} errors={errors} label="Birth Certificate No." name="BCN" />

              <FormSelectInput
                label="Religion"
                options={religions}
                option={selectedReligion}
                setOption={setSelectedReligion}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput label="Class" options={classes} option={selectedClass} setOption={setSelectedClass} />

              <FormSelectInput
                label="Streams"
                options={streams}
                option={selectedStream}
                setOption={setSelectedStream}
              />

              <TextInput register={register} errors={errors} label="Roll No." name="rollNo" />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="">
                <div className="grid gap-3">
                  <TextInput register={register} errors={errors} label="Registration No." name="regNo" />

                  <TextInput register={register} errors={errors} label="Admission Date" name="admissionDate" />
                </div>

                <div className="grid gap-3">
                  <TextArea register={register} errors={errors} label="Description" name="description" />
                </div>
              </div>

              <div className="grid">
                <ImageInput
                  title="Student Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="studentProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">

          </div>
        </div> */}
      </div>
      <FormFooter href="/students" editingId={editingId} loading={loading} title="Student" parent="" />
    </form>
  );
}
