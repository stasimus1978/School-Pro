"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import SubmitButton from "../FormInputs/SubmitButton";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import PhoneInput from "../FormInputs/PhoneInput";

export type RegisterInputProps = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

const ContactUs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();

  async function onSubmit(data: RegisterInputProps) {
    console.log(data);
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
                name="name"
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
                  label="Phone"
                  name="phone"
                  toolTipText="Enter your phone number with country code"
                  placeholder="Phone number"
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

                <TextInput
                  label="Country"
                  register={register}
                  name="country"
                  errors={errors}
                  placeholder="Eg. johndoe@gmail.com"
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
                  name="students"
                  errors={errors}
                  placeholder="300"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="Your Role"
                  register={register}
                  name="role"
                  type="text"
                  errors={errors}
                  placeholder="role"
                />

                <TextInput
                  label="Product Interest (Which features are you looking for?)"
                  register={register}
                  name="phone"
                  errors={errors}
                  placeholder="Eg. johndoe@gmail.com"
                />
              </div>

              <TextArea label="How did you here about Us?" register={register} name="phone" errors={errors} />

              <SubmitButton
                buttonIcon={Send}
                title="Submit"
                loading={isLoading}
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
