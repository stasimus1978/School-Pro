"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import SubmitButton from "../FormInputs/SubmitButton";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import PhoneInput from "../FormInputs/PhoneInput";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { countries, Country } from "@/lib/countries";
import toast from "react-hot-toast";
import { createContact } from "@/actions/contacts";

type Option = {
  readonly label: string;
  readonly value: string;
};

type Options = readonly Option[];

export type ContactProps = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  school: string;
  country: string;
  schoolPage: string;
  students: number;
  role: string;
  media: string;
  message: string;
};

const removeLeadingZero = (phoneNumber: string) => {
  const numberStr = phoneNumber.toString();

  if (numberStr.startsWith("0")) {
    return numberStr.substring(1);
  }
  return numberStr;
};

const ContactUs: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const initialCountryCode = "UA";
  const initialCountry = countries.find((country) => country.countryCode === initialCountryCode);
  const [selectedCountry, setSelectedCountry] = useState<Country>(initialCountry as Country);

  const [phoneCode, setPhoneCode] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactProps>();

  const roles: Options = [
    { label: "Principal/Leadership/Mgt", value: "Principal" },
    { label: "School Administrator", value: "Administrator" },
    { label: "Head Teacher", value: "Headteacher" },
    { label: "Teacher/Parent/Student", value: "teacher/parent/student" },
    { label: "Consultant/Reseller", value: "consultant/reseller" },
    { label: "Other", value: "other" },
  ];
  const [selectedRole, setSelectedRole] = useState<Option>(roles[0]);

  const media: Options = [
    { label: "Blog", value: "blog" },
    { label: "Google", value: "google" },
    { label: "Friend", value: "friend" },
    { label: "Other", value: "other" },
  ];
  const [selectedMedia, setSelectedMedia] = useState<Option>(media[0]);

  async function onSubmit(data: ContactProps) {
    data.phone = removeLeadingZero(data.phone);
    const phoneNumber = `${phoneCode}${data.phone}`;

    data.phone = phoneNumber;
    data.country = selectedCountry.label;
    data.role = selectedRole.value;
    data.media = selectedMedia.value;
    data.students = Number(data.students);

    try {
      setLoading(true);
      console.log("Data: ", data);
      const res = await createContact(data);
      console.log(res);
      setLoading(false);
      toast.success("Successfully Created!");
      reset();
      // router.push("/dashboard/categories");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-4">
            <div className="bg-green-800 text-white p-6 rounded-2xl">
              <h3 className="font-semibold text-xl mb-2">Speak to someone in sales</h3>

              <p className="text-sm mb-4 py-4">
                To create a more value-added solution, is essential to an analysis if the possible solutions are aligned
                with the company's goals.
              </p>

              <Button className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300">
                Book Appointment
              </Button>
            </div>

            <div className="bg-lime-400 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2 text-xl">Contact to our team</h3>

              <p className="text-sm mb-4 py-4">
                To create a more value-added solution, is essential to an analysis if the possible solutions are aligned
                with the company's goals.
              </p>

              <Button className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300">
                Book Appointment
              </Button>
            </div>
          </div>
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold">Tell us about your institution and requirements</h3>
            <p className="text-muted-foreground text-sm text-center px-4 py-2 max-w-2xl mx-auto">
              Our team will reach out within 24 hours to schedule a personalized demo and discuss your specific needs.
            </p>

            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                label="Your Full Name"
                register={register}
                name="fullName"
                type="text"
                errors={errors}
                placeholder="John Doe"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="Email Address"
                  register={register}
                  name="email"
                  type="text"
                  errors={errors}
                  placeholder="Eg. johndoe@gmail.com"
                />

                <PhoneInput
                  register={register}
                  errors={errors}
                  label="Phone (eg 0934150262)"
                  name="phone"
                  toolTipText="Select Code and write ur number"
                  placeholder="Phone number"
                  setPhoneCode={setPhoneCode}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="School Name"
                  register={register}
                  name="school"
                  type="text"
                  errors={errors}
                  placeholder="Evernote High School"
                />

                <FormSelectInput
                  label="Country"
                  options={countries}
                  option={selectedCountry}
                  setOption={setSelectedCountry}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="School Website/Social Media Page"
                  register={register}
                  name="schoolPage"
                  type="text"
                  errors={errors}
                  placeholder="https://www.evernotehighschool.com"
                />

                <TextInput
                  label="Number of Students"
                  register={register}
                  type="number"
                  name="students"
                  errors={errors}
                  placeholder="300"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormSelectInput label="Roles" options={roles} option={selectedRole} setOption={setSelectedRole} />

                <FormSelectInput
                  label="Which Media did hear about Us?"
                  options={media}
                  option={selectedMedia}
                  setOption={setSelectedMedia}
                />
              </div>

              <TextArea
                label="Please share with us the key plan points you want to solve"
                register={register}
                name="message"
                errors={errors}
                // placeholder="300"
              />

              <SubmitButton
                buttonIcon={Send}
                title="Submit"
                loading={loading}
                loadingTitle="Signing in please wait..."
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
