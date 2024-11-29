"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TextArea from "../FormInputs/TextAreaInput";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
  };

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold text-green-900 mb-2">Get In Touch</h2>
        <p className="text-gray-600 mb-8 pb-4">
          Streamline your process and empower your team with our products. Effortlessly manage employee data and more.
        </p>

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
            <h3 className="text-xl font-semibold mb-4">Send us a message</h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="p-2 border border-gray-300 rounded"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="p-2 border border-gray-300 rounded"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                type="email"
                name="emil"
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded mb-2"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full border border-gray-300 p-2 rounded mb-2"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <Button
                type="submit"
                className="bg-green-800 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-700 transition duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
