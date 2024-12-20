"use client";

import { createStudent } from "@/actions/students";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import RadioInput from "@/components/FormInputs/RadioInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { countries } from "@/lib/countries";
import { generateRegistrationNumber } from "@/lib/generateRegNo";
import { generateRollNumber } from "@/lib/generateRollNo";
import useSchoolStore from "@/store/school";
import { ClassItem, ParentItem, SelectOptionProps, StudentCreateProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";

type SingleStudentFormProps = {
  classes: ClassItem[];
  parents: ParentItem[];
  nextSeq: number;
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

export default function SingleStudentForm({
  classes,
  parents,
  nextSeq,
  editingId,
  initialData,
}: SingleStudentFormProps) {
  // Parents Options
  const parentOptions = parents.map(parent => {
    return {
      label: `${parent.firstName} ${parent.lastName}`,
      value: parent.id,
    };
  });
  const [selectedParent, setSelectedParent] = useState<SelectOptionProps | null>(null);

  // Class Options
  const classOptions = classes.map(item => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const [selectedClass, setSelectedClass] = useState<SelectOptionProps>(classOptions[0]);

  // Stream Options
  const classId = selectedClass.value ?? "";
  const streams = classes.find(item => item.id === classId)?.streams || [];
  const streamOptions = streams.map(item => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const [selectedStream, setSelectedStream] = useState<SelectOptionProps | null>(null);

  // Gender
  const genders = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
  ];
  const [selectedGender, setSelectedGender] = useState<SelectOptionProps>(genders[0]);

  // Nationality
  const initialCountryCode = "UA";
  const initialCountry = countries.find(country => country.countryCode === initialCountryCode);
  const [selectedNationality, setSelectedNationality] = useState<any>(initialCountry);

  // Religion
  const religions = [
    { label: "Roman Catholic", value: "Catholic" },
    { label: "Anglican", value: "Anglican" },
    { label: "Islamic", value: "Islamic" },
    { label: "Hindu", value: "Hindu" },
  ];
  const [selectedReligion, setSelectedReligion] = useState<SelectOptionProps>(religions[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentCreateProps>({
    defaultValues: {
      firstName: "",
      password: "Login@2024",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  const studentTypes = [
    { label: "Private Student", id: "PS" },
    { label: "Sponsored Student", id: "SS" },
  ];

  const { school } = useSchoolStore();

  async function saveStudent(data: StudentCreateProps) {
    try {
      setLoading(true);
      data.schoolId = school?.id ?? "";
      data.schoolName = school?.name ?? "";
      data.imageUrl = imageUrl;
      data.name = `${data.firstName} ${data.lastName}`;
      data.parentId = selectedParent?.value;
      data.parentName = selectedParent?.label;
      data.classId = selectedClass.value;
      data.classTitle = selectedClass.label;
      data.streamId = selectedStream?.value;
      data.streamTitle = selectedStream?.label;
      data.nationality = selectedNationality.value;
      data.religion = selectedReligion.value;
      data.gender = selectedGender.value;

      console.log("Data: ", data);

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        const rollNo = generateRollNumber();
        data.rollNo = rollNo;

        const studentType = data.studentType as "PS" | "SS";
        const regNo = generateRegistrationNumber("BU", studentType, nextSeq);
        data.regNo = regNo;
        const res = await createStudent(data);
        setLoading(false);
        toast.success("Student Successfully Created!");
        reset();
        // setImageUrl("/placeholder.svg");
        router.push("/dashboard/students");
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

              <TextInput register={register} errors={errors} label="Admission Date" type="date" name="admissionDate" />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="">
                <div className="grid gap-3">
                  <RadioInput
                    radioOptions={studentTypes}
                    register={register}
                    errors={errors}
                    label="Student type"
                    name="studentType"
                    defaultValue="PS"
                  />
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
