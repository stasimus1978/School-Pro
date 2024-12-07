"use client";

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
import { ClassItem, ParentItem, SelectOptionProps } from "@/types/types";

// export type SelectOptionProps = {
//   label: string;
//   value: string;
// };
type SingleStudentFormProps = {
  classes: ClassItem[];
  parents: ParentItem[];
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

export type StudentProps = {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
};

export default function SingleStudentForm({ classes, parents, editingId, initialData }: SingleStudentFormProps) {
  // Parents
  const parentOptions = parents.map((parent) => {
    return {
      label: `${parent.firstName} ${parent.lastName}`,
      value: parent.id,
    };
  });

  const [selectedParent, setSelectedParent] = useState<SelectOptionProps | null>(null);

  // Class
  const classOptions = classes.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  const [selectedClass, setSelectedClass] = useState<SelectOptionProps>(classOptions[0]);
  const classId = selectedClass.value ?? "";

  const streams = classes.find((item) => item.id === classId)?.streams || [];
  const streamOptions = streams.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

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
                options={parentOptions}
                option={selectedParent}
                setOption={setSelectedParent}
                toolTipText="Add New Parent"
                href="/dashboard/users/parents/new"
              />

              <FormSelectInput
                label="Class"
                options={classOptions}
                option={selectedClass}
                setOption={setSelectedClass}
                toolTipText="Add New Class"
                href="/dashboard/academics/classes"
              />

              <FormSelectInput
                label="Stream/Section"
                options={streamOptions}
                option={selectedStream}
                setOption={setSelectedStream}
                toolTipText="Add New Stream"
                href="/dashboard/academics/classes"
              />
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
              <FormSelectInput
                label="Gender"
                options={genders}
                option={selectedGender}
                setOption={setSelectedGender}
                isSearchable={false}
              />

              <TextInput register={register} errors={errors} label="Date of Birth" name="dob" type="date" />

              <TextInput register={register} errors={errors} label="Roll No." name="rollNo" />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="">
                <div className="grid gap-3">
                  <TextInput register={register} errors={errors} label="Registration No." name="regNo" />

                  <TextInput register={register} errors={errors} label="Admission Date" name="admissionDate" />
                </div>

                <div className="grid gap-3">
                  <TextArea register={register} errors={errors} label="Address" name="address" />
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
