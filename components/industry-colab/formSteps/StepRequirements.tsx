

import { UseFormReturn } from "react-hook-form";
import { IIndustryCollaborationFormData } from "@/types/industry-collaboration.types";

type StepProps = {
  form: UseFormReturn<IIndustryCollaborationFormData>;
};

export default function Step3Requirements({ form }: StepProps) {
  const { register, formState: { errors } } = form;
    // Options list
  const collaborationOptions = [
    "Curriculum Design",
    "Internship Programs",
    "Contract-to-Hire",
    "Joint R&D Projects",
  ];


  return (
    <div className="bg-white space-y-8">

      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900">
        Collaboration Requirements
      </h2>

      {/* Collaboration Type Title */}
      <div className="space-y-2">
        <label className="text-gray-700 font-semibold">
          Collaboration Type <span className="text-red-500">*</span>{" "}
          <span className="text-gray-500 text-sm">(Select all that apply)</span>
        </label>

        {/* CHECKBOX GRID — EXACT UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {collaborationOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 bg-white cursor-pointer
                         hover:border-blue-500 transition"
            >
              <input
                type="checkbox"
                value={option}
                className="w-5 h-5 accent-blue-600"
                {...register("collaborationTypes", { required: true })}
              />
              <span className="text-gray-700 font-medium">{option}</span>
            </label>
          ))}

        </div>

        {/* Validation Error */}
        {errors.collaborationTypes && (
          <p className="text-red-500 text-sm">
            Select at least one collaboration type.
          </p>
        )}
      </div>

      {/* Dropdowns — Timeline & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

        {/* Expected Timeline */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Expected Timeline</label>
          <select
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:ring-2 
                       focus:ring-blue-500 outline-none"
            {...register("timeline")}
          >
            <option value="">Select Timeline</option>
            <option>1–3 Months</option>
            <option>3–6 Months</option>
            <option>6+ Months</option>
          </select>
        </div>

        {/* Budget Range */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Budget Range</label>
          <select
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:ring-2 
                       focus:ring-blue-500 outline-none"
            {...register("budgetRange")}
          >
            <option value="">Select Budget Range</option>
            <option>₹50,000 – ₹1,00,000</option>
            <option>₹1,00,000 – ₹3,00,000</option>
            <option>₹3,00,000+</option>
          </select>
        </div>

      </div>
    </div>
  );
}