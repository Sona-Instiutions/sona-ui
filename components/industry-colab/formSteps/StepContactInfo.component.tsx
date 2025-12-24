import { UseFormReturn } from "react-hook-form";
import { IIndustryCollaborationFormData } from "@/types/industry-collaboration.types";

type StepProps = {
  form: UseFormReturn<IIndustryCollaborationFormData>;
};

export default function Step2Contact({ form }: StepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="bg-white space-y-8">

      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900">
        Contact Information
      </h2>

      {/* Grid – 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border rounded-xl px-4 py-3 bg-gray-50
                       focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter full name"
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Job Title */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border rounded-xl px-4 py-3 bg-gray-50
                       focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter job title"
            {...register("jobTitle", { required: true })}
          />
          {errors.jobTitle && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border rounded-xl px-4 py-3 bg-gray-50
                       focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter email address"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border rounded-xl px-4 py-3 bg-gray-50
                       focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter phone number"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>
      </div>

      {/* LinkedIn Connect Box */}
      <div className="flex items-center justify-between bg-blue-50 border border-blue-100
                      rounded-xl px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-700 text-xl font-bold">in</span>
          </div>
          <div>
            <p className="font-medium text-gray-800">Connect via LinkedIn</p>
            <p className="text-sm text-gray-600">
              Link your LinkedIn profile for faster verification and networking
            </p>
          </div>
        </div>

        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold
                     hover:bg-blue-700 transition"
        >
          Connect
        </button>
      </div>
    </div>
  );
}
