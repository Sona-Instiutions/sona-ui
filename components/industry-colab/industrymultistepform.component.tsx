"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Step1Company from "./formSteps/StepCompanyInfo.component";
import Step2Contact from "./formSteps/StepContactInfo.component";
import Step3Requirements from "./formSteps/StepRequirements.component";
import Step4Project from "./formSteps/StepProjectDetails.component";
import StepProgress from "./formSteps/StepProgress.component";

import type { IIndustryCollaborationFormData } from "@/types/industry-collaboration.types";
import { submitIndustryCollaboration } from "@/services/client/industrycollab.client";

const TOTAL_STEPS = 4;
const STORAGE_KEY = "industry-collab-form";

export default function IndustryMultiStepForm() {
  const [step, setStep] = useState(1);
  const isResetting = useRef(false);

  const form = useForm<IIndustryCollaborationFormData>({
    defaultValues: {
      companyName: "",
      industry: "",
      companySize: "",
      website: "",
      companyDescription: "",

      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",

      collaborationTypes: [],
      timeline: "",
      budgetRange: "",

      projectDescription: "",
      skills: "",
      successMetrics: "",
      additionalRequirements: "",
    },
  });

  const { handleSubmit, trigger, reset, control, setValue } = form;

  /* Restore saved draft */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed = JSON.parse(saved) as IIndustryCollaborationFormData;
    reset(parsed);

    (Object.keys(parsed) as (keyof IIndustryCollaborationFormData)[]).forEach(
      (key) => {
        setValue(key, parsed[key], {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    );
  }, [reset, setValue]);

  /* Autosave */
  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (isResetting.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
  }, [watchedValues]);

  /* Step field validation */
  const stepFields: Record<
    number,
    (keyof IIndustryCollaborationFormData)[]
  > = {
    1: ["companyName", "industry", "companySize", "website", "companyDescription"],
    2: ["fullName", "jobTitle", "email", "phone"],
    3: ["collaborationTypes", "timeline", "budgetRange"],
    4: ["projectDescription", "skills", "successMetrics", "additionalRequirements"],
  };

  const mutation = useMutation({
    mutationFn: submitIndustryCollaboration,
    onSuccess: () => {
      isResetting.current = true;
      reset();
      localStorage.removeItem(STORAGE_KEY);
      setStep(1);
      setTimeout(() => (isResetting.current = false), 500);
    },
  });

  const nextStep = async () => {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (!valid) {
      alert("Please fill all required fields before continuing.");
      return;
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setStep((s) => s - 1);
  };

  const submitForm = (data: IIndustryCollaborationFormData) => {
    mutation.mutate(data);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-10">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="bg-white shadow p-8 rounded-2xl"
        >
          <StepProgress step={step} />

          {step === 1 && <Step1Company form={form} />}
          {step === 2 && <Step2Contact form={form} />}
          {step === 3 && <Step3Requirements form={form} />}
          {step === 4 && <Step4Project form={form} />}

          {/* ✅ FIXED BUTTONS */}
          <div className="flex justify-between pt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-3 rounded-lg bg-gray-200"
              >
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 rounded-lg bg-yellow-400 text-white"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 rounded-lg bg-yellow-400 text-white"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit Your Requirement"}
              </button>
            )}
          </div>
        </form>

        {mutation.isSuccess && (
          <p className="text-green-600 text-center">
            Form submitted successfully!
          </p>
        )}
      </div>
    </section>
  );
}
