"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Select from "react-tailwindcss-select";
import { CircleHelp } from "lucide-react";
import { countries, Country } from "@/lib/countries";

type PhoneInputProps = {
  register: any;
  errors: any;
  label: string;
  name: string;
  toolTipText?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export default function PhoneInput({
  register,
  errors,
  label,
  name,
  toolTipText,
  placeholder,
  onChange,
}: PhoneInputProps) {
  const initialCountryCode = "UA";
  const modifiedCountries = countries.map((country) => ({
    ...country,
    label: `${country.countryCode} ${country.phoneCode}`,
    value: country.countryCode,
  }));

  const initialCountry = modifiedCountries.find((item) => item.countryCode === initialCountryCode);
  const [selectedCountry, setSelectedCountry] = useState<any>(initialCountry);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (option: any) => {
    console.log(option);

    const country = countries.find((c) => c.countryCode === option.value);
    if (country) {
      setSelectedCountry(country);
      const newValue = `${country.phoneCode}${phoneNumber.replace(/[^0-9]/g, "")}`;
      onChange?.(newValue);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawNumber = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(rawNumber);
    const fullNumber = `${selectedCountry.phoneCode}${rawNumber}`;
    onChange?.(fullNumber);
  };

  const countryOptions = countries.map((country) => ({
    value: country.countryCode,
    label: `${country.flag} ${country.phoneCode}`,
  }));

  return (
    <div>
      <div className="flex space-x-2 items-center">
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <CircleHelp className="w-4 h-4 text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="mt-2">
        <div className="flex gap-2">
          <div className="w-32">
            <div className="">
              <div className="flex items-center space-x-2">
                <Select
                  isSearchable
                  primaryColor="blue"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  options={modifiedCountries}
                  placeholder={label}
                />
              </div>
            </div>
          </div>
          <div className="relative flex-1">
            <input
              id={name}
              type="tel"
              {...register(name, {
                required: true,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePhoneChange(e),
              })}
              className={cn(
                "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                errors[name] && "ring-red-500 focus:ring-red-500"
              )}
              placeholder={placeholder || "Phone number"}
            />
            {/* hidden input */}
            <input
              type="hidden"
              {...register(name, { required: true })}
              value={`${selectedCountry.phoneCode}${phoneNumber}`}
            />
          </div>
        </div>
        {errors[name] && <span className="text-xs text-red-600">{label} is required</span>}
      </div>
    </div>
  );
}
