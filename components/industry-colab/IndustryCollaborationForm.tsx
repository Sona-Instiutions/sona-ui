"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Step1Company from "./formSteps/StepCompanyInfo";
import Step2Contact from "./formSteps/StepContactInfo";
import Step3Requirements from "./formSteps/StepRequirements";
import Step4Project from "./formSteps/StepProjectDetails";
import StepProgress from "./formSteps/StepProgress";

const TOTAL_STEPS = 4;
const STORAGE_KEY = "industry-collab-form";

/* ------------------------------------------
   ✅ 1 — Define Type for Entire Form
------------------------------------------- */
export type IndustryFormData = {
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  companyDescription: string;

  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;

  collaborationTypes: string[]; 
  timeline: string;
  budgetRange: string;

  projectDescription: string;
  skills: string;
  successMetrics: string;
  additionalRequirements: string;
};

export default function IndustryMultiStepForm() {
  const [step, setStep] = useState(1);

  /* ------------------------------------------
     2 — React Hook Form with typed defaults
  ------------------------------------------- */
  const form = useForm<IndustryFormData>({
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

  const { handleSubmit, trigger, reset, watch } = form;

  /* ------------------------------------------
     3 — Load saved form values
  ------------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        reset(JSON.parse(saved));
      } catch {}
    }
  }, [reset]);

  /* ------------------------------------------
     4 — Save form in localStorage on change
  ------------------------------------------- */
  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  /* ------------------------------------------
     5 — TanStack Mutation (Typed)
  ------------------------------------------- */
  const mutation = useMutation({
    mutationFn: async (data: IndustryFormData) => {
      const res = await fetch("/api/collaboration/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return res.json();
    },

    onSuccess: () => {
      reset();
      localStorage.removeItem(STORAGE_KEY);
      setStep(1);
    },
  });

  /* ------------------------------------------
     6 — Step Navigation + Validation
  ------------------------------------------- */
  const nextStep = async () => {
    const valid = await trigger();
    if (!valid) {
      alert("Please fill all required fields before continuing.");
      return;
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  /* ------------------------------------------
     ❗ FIXED: Typed submitForm function
  ------------------------------------------- */
  const submitForm = (data: IndustryFormData) => {
    mutation.mutate(data);
  };

  /* ------------------------------------------
     7 — UI
  ------------------------------------------- */
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-10">

        <div className="text-center px-6">
          <h2 className="text-4xl font-extrabold mb-4">
            Submit Your <span className="text-yellow-400">Requirements</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Tell us about your collaboration needs and we will create a customized proposal.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="bg-white shadow p-8 rounded-2xl"
        >
          <StepProgress step={step} />

          {step === 1 && <Step1Company form={form} />}
          {step === 2 && <Step2Contact form={form} />}
          {step === 3 && <Step3Requirements form={form} />}
          {step === 4 && <Step4Project form={form} />}

          <div className="flex justify-between pt-6">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="px-8 py-3 rounded-lg bg-gray-200">
                Previous
              </button>
            ) : (
              <div></div>
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
              <button type="submit" className="px-8 py-3 rounded-lg bg-yellow-400 text-white">
                {mutation.isPending ? "Submitting..." : "Submit Your Requirement"}
              </button>
            )}
          </div>
        </form>

        {mutation.isSuccess && (
          <p className="text-green-600 text-center">Form submitted successfully!</p>
        )}
      </div>
    </section>
  );
}
