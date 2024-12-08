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
import { countries, Country } from "@/lib/countries";
import { ParentCreateProps } from "@/types/types";
import { createParent } from "@/actions/parents";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

export default function TeacherForm({ editingId, initialData }: SingleStudentFormProps) {
  // Parents
  const relationships = [
    { label: "Mother", value: "Mother" },
    { label: "Father", value: "Father" },
    { label: "Guardian", value: "Guardian" },
    { label: "Other", value: "Other" },
  ];
  const [selectedRelationship, setSelectedRelationship] = useState<SelectOptionProps>(relationships[0]);

  // Titles
  const titles = [
    { label: "Ms.", value: "Ms" },
    { label: "Mr.", value: "Mr" },
    { label: "Mrs.", value: "Mrs" },
    { label: "Dr.", value: "Dr" },
    { label: "Prof.", value: "Prof." },
  ];
  const [selectedTitle, setSelectedTitle] = useState<SelectOptionProps>(titles[0]);

  // Contact Method
  const contactMethod = [
    { label: "Phone", value: "Phone" },
    { label: "Email", value: "Email" },
    { label: "Whatsap", value: "Whatsap" },
  ];
  const [selectedContactMethod, setSelectedContactMethod] = useState<SelectOptionProps>(contactMethod[0]);

  // Departments
  const departments = [
    { label: "Science", value: "12388" },
    { label: "Chemistry", value: "77845" },
  ];
  const [selectedDepartment, setSelectedDepartment] = useState<SelectOptionProps>(departments[0]);

  // Subjects
  const subjects = [
    { label: "Science", value: "12388" },
    { label: "Chemistry", value: "77845" },
  ];
  const [selectedSubject, setSelectedSubject] = useState<SelectOptionProps>(subjects[0]);
  const [mainSubject, setMainSubject] = useState<SelectOptionProps>(subjects[0]);

  // Classes
  const classes = [
    { label: "S1", value: "12388" },
    { label: "S2", value: "77845" },
  ];
  const [selectedClass, setSelectedClass] = useState<SelectOptionProps>(classes[0]);

  // Qualification
  const qualifications = [
    { label: "Bachelors", value: "Bachelors" },
    { label: "Diploma", value: "Diploma" },
    { label: "Certificate", value: "Certificate" },
  ];
  const [qualification, setQualification] = useState<SelectOptionProps>(qualifications[0]);

  // Sections/Streams
  const streams = [
    { label: "S1A", value: "1234556" },
    { label: "S1B", value: "1233778" },
    { label: "S2A", value: "1233778" },
    { label: "S2b", value: "1233778" },
  ];
  const [selectedStream, setSelectedStream] = useState<SelectOptionProps>(streams[0]);

  // Gender
  const genders = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
    { label: "OTHER", value: "OTHER" },
  ];
  const [selectedGender, setSelectedGender] = useState<SelectOptionProps>(genders[0]);

  // Nationality
  const initialCountryCode = "UA";
  const initialCountry = countries.find((country) => country.countryCode === initialCountryCode) || countries[0];
  const [selectedNationality, setSelectedNationality] = useState<Country>(initialCountry);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParentCreateProps>({
    defaultValues: {
      firstName: "",
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveParent(data: ParentCreateProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value;
      data.relationship = selectedRelationship.value;
      data.gender = selectedGender.value;
      data.nationality = selectedNationality?.label;
      data.contactMethod = selectedContactMethod.value;

      console.log("Data: ", data);

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        const res = await createParent(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        // setImageUrl("/placeholder.svg");
        router.push("/dashboard/users/parents");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveParent)}>
      <FormHeader href="/teachers" parent="teacher" title="Teacher" editingId={editingId} loading={loading} />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Title"
                options={titles}
                option={selectedTitle}
                setOption={setSelectedTitle}
                isSearchable={false}
              />

              <TextInput register={register} errors={errors} label="First Name" name="firstName" />
              <TextInput register={register} errors={errors} label="Last Name" name="lastName" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput register={register} errors={errors} label="Phone" name="phone" type="tel" />

              <TextInput register={register} errors={errors} label="Email" name="email" type="email" />

              <TextInput register={register} errors={errors} type="tel" label="Whatsap No." name="whatsapNo" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Nationality"
                options={countries}
                option={selectedNationality as SelectOptionProps}
                setOption={setSelectedNationality}
              />

              <TextInput register={register} errors={errors} label="National ID/Passport No" name="NIN" />

              <FormSelectInput
                label="Gender"
                options={genders}
                option={selectedGender}
                setOption={setSelectedGender}
                isSearchable={false}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput register={register} errors={errors} label="Date of Birth" name="dob" type="date" />

              <FormSelectInput
                label="Preferred Contact Method"
                options={contactMethod}
                option={selectedContactMethod}
                setOption={setSelectedContactMethod}
                isSearchable={false}
              />

              <PasswordInput
                register={register}
                errors={errors}
                label="Teacher Portal Password"
                name="password"
                type="password"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput register={register} errors={errors} label="Date of Joining" name="dateOfJoining" type="date" />

              <TextInput
                register={register}
                errors={errors}
                label="Designation"
                name="designation"
                placeholder="eg Head of Department"
              />

              <FormSelectInput
                label="Department"
                options={departments}
                option={selectedDepartment}
                setOption={setSelectedDepartment}
                href="/dashboard/academics/departments/new"
                toolTipText="Create New Department"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Qualification"
                options={qualifications}
                option={qualification}
                setOption={setQualification}
                isSearchable={false}
              />

              <FormSelectInput
                label="Main Subject"
                options={subjects}
                option={mainSubject}
                setOption={setMainSubject}
                href="/dashboard/academics/subjects/new"
                toolTipText="Add New Subject"
              />

              {/* Multi Select */}
              <FormSelectInput
                label="Subject"
                options={subjects}
                option={selectedSubject}
                setOption={setSelectedSubject}
                href="/dashboard/academics/subjects/new"
                toolTipText="Add New Subject"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-3">
                {/* Multi Select */}
                <FormSelectInput
                  label="Classes"
                  options={classes}
                  option={selectedClass}
                  setOption={setSelectedClass}
                  href="/dashboard/academics/classes"
                  toolTipText="Add New Class"
                />
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Years of Experience"
                    name="experience"
                    type="number"
                    placeholder="Eg 5"
                  />
                </div>

                <div className="grid gap-3">
                  <TextArea register={register} errors={errors} label="Address" name="address" />
                </div>
              </div>

              <div className="grid">
                <ImageInput
                  title="Teacher Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="teacherProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormFooter href="/teachers" editingId={editingId} loading={loading} title="Teacher" parent="users" />
    </form>
  );
}
