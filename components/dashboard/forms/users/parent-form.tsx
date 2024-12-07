"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
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

export default function ParentForm({ editingId, initialData }: SingleStudentFormProps) {
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
        // router.push("/dashboard/categories");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveParent)}>
      <FormHeader href="/parents" parent="users" title="Parents" editingId={editingId} loading={loading} />

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
              <FormSelectInput
                label="Relationship"
                options={relationships}
                option={selectedRelationship}
                setOption={setSelectedRelationship}
                isSearchable={false}
              />

              <TextInput register={register} errors={errors} label="National ID/Passport" name="NIN" />

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
              <TextInput register={register} errors={errors} label="Phone" name="phone" type="tel" />

              <FormSelectInput
                label="Nationality"
                options={countries}
                option={selectedNationality as SelectOptionProps}
                setOption={setSelectedNationality}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
              {/* <TextInput register={register} errors={errors} label="Phone" name="phone" type="tel" /> */}

              <TextInput register={register} errors={errors} label="Email" name="email" type="email" />

              <TextInput register={register} errors={errors} type="tel" label="Whatsap No." name="whatsapNo" />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="grid gap-3">
                  <FormSelectInput
                    label="Preferred Contact Method"
                    options={contactMethod}
                    option={selectedContactMethod}
                    setOption={setSelectedContactMethod}
                    isSearchable={false}
                  />

                  <TextInput register={register} errors={errors} label="Occupation" name="occupation" />
                </div>

                <div className="grid gap-3">
                  <TextArea register={register} errors={errors} label="Address" name="address" />
                </div>
                <div className="grid">
                  <PasswordInput register={register} errors={errors} label="Parent Portal Password" name="password" />
                </div>
              </div>

              <div className="grid">
                <ImageInput
                  title="Parent Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="parentProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormFooter href="/parents" editingId={editingId} loading={loading} title="Parents" parent="users" />
    </form>
  );
}
