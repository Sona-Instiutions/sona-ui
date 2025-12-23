import { UseFormReturn } from "react-hook-form";
import { IIndustryCollaborationFormData } from "@/types/industry-collaboration.types";

type StepProps = {
  form: UseFormReturn<IIndustryCollaborationFormData>;
};

export default function Step4Project({ form }: StepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="bg-white space-y-8">

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900">
        Project Details
      </h2>

      {/* Project Description */}
      <div className="space-y-2">
        <label className="text-gray-700 font-semibold">
          Project Description <span className="text-red-500">*</span>
        </label>

        <textarea
          rows={4}
          className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 
                     focus:ring-blue-500 outline-none placeholder:text-gray-400"
          placeholder="Describe your project requirements, objectives, and expected outcomes in detail"
          {...register("projectDescription", { required: true })}
        />

        {errors.projectDescription && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>

      {/* Required Skills */}
      <div className="space-y-2">
        <label className="text-gray-700 font-semibold">
          Required Skills & Technologies
        </label>

        <textarea
          rows={3}
          className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 
                     focus:ring-blue-500 outline-none placeholder:text-gray-400"
          placeholder="List specific skills, technologies, or expertise areas you're looking for"
          {...register("skills")}
        />
      </div>

      {/* Success Metrics */}
      <div className="space-y-2">
        <label className="text-gray-700 font-semibold">
          Success Metrics
        </label>

        <textarea
          rows={3}
          className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 
                     focus:ring-blue-500 outline-none placeholder:text-gray-400"
          placeholder="How will you measure the success of this collaboration?"
          {...register("successMetrics")}
        />
      </div>

      {/* Additional Requirements */}
      <div className="space-y-2">
        <label className="text-gray-700 font-semibold">
          Additional Requirements
        </label>

        <textarea
          rows={3}
          className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 
                     focus:ring-blue-500 outline-none placeholder:text-gray-400"
          placeholder="Any additional requirements, preferences, or constraints"
          {...register("additionalRequirements")}
        />
      </div>
    </div>
  );
}
