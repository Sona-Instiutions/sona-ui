import { UseFormReturn } from "react-hook-form";
import { IIndustryCollaborationFormData } from "@/types/industry-collaboration.types";

type StepProps = {
  form: UseFormReturn<IIndustryCollaborationFormData>;
};

export default function Step1Company({ form }: StepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="bg-white space-y-8">
      {/* SECTION TITLE */}
      <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 
                       focus:ring-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Enter company name"
            {...register("companyName", { required: true })}
          />
          {errors.companyName && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Industry */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 
                       focus:ring-blue-500 outline-none text-gray-700"
            {...register("industry", { required: true })}
          >
            <option value="">Select Industry</option>
            <option>Information Technology</option>
            <option>Manufacturing</option>
            <option>Finance</option>
            <option>Healthcare</option>
          </select>
          {errors.industry && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Company Size */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            Company Size <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 
                       focus:ring-blue-500 outline-none text-gray-700"
            {...register("companySize", { required: true })}
          >
            <option value="">Select Company Size</option>
            <option>1 - 10 Employees</option>
            <option>10 - 50 Employees</option>
            <option>50 - 200 Employees</option>
            <option>200+ Employees</option>
          </select>
          {errors.companySize && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Website */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Website</label>
          <input
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 
                       focus:ring-blue-500 outline-none placeholder:text-gray-400"
            placeholder="https://www.company.com"
            {...register("website")}
          />
        </div>
      </div>

      {/* Company Description */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-semibold">Company Description</label>
        <textarea
          rows={3}
          className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 
                     focus:ring-blue-500 outline-none placeholder:text-gray-400"
          placeholder="Brief description of your company and business focus"
          {...register("companyDescription")}
        />
      </div>
    </div>
  );
}
