"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Step1Company from "./formSteps/StepCompanyInfo";
import Step2Contact from "./formSteps/StepContactInfo";
import Step3Requirements from "./formSteps/StepRequirements";
import Step4Project from "./formSteps/StepProjectDetails";
import StepProgress from "./formSteps/StepProgress";

const TOTAL_STEPS = 4;
const STORAGE_KEY = "industry-collab-form";

/* ------------------------------------------
   1 — Define Type for Entire Form
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
  const isResetting = useRef(false); // Prevent autosave after submit/reset

  /* ------------------------------------------
     2 — React Hook Form Initialization
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

  const { handleSubmit, trigger, reset, control } = form;

  /* ------------------------------------------
     3 — Restore Saved Form on Refresh
     ⭐ Includes re-validation fix so Step 3 → Step 4 works
  ------------------------------------------- */
  useEffect(() => {
    function loadSaved() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as IndustryFormData;

        form.reset(parsed);

        (Object.keys(parsed) as (keyof IndustryFormData)[]).forEach((key) => {
          form.setValue(key, parsed[key], {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        });
      }
    }

    loadSaved();
  }, [form]);

  /* ------------------------------------------
     4 — Autosave Form on Change
  ------------------------------------------- */
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (isResetting.current) return; // Stop autosave during form reset

    if (watchedValues) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
    }
  }, [watchedValues]);

  /* ------------------------------------------
     5 — Step-wise Field Mapping
  ------------------------------------------- */
  const stepFields: Record<number, (keyof IndustryFormData)[]> = {
    1: ["companyName", "industry", "companySize", "website", "companyDescription"],
    2: ["fullName", "jobTitle", "email", "phone"],
    3: ["collaborationTypes", "timeline", "budgetRange"],
    4: ["projectDescription", "skills", "successMetrics", "additionalRequirements"],
  };

  /* ------------------------------------------
     6 — TanStack Mutation (Submit Handler)
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
      isResetting.current = true; // Prevent autosave loop

      reset(); // Clear form values
      localStorage.removeItem(STORAGE_KEY); // Clear saved draft
      setStep(1); // Go back to step 1

      setTimeout(() => {
        isResetting.current = false; // Resume autosave after reset finishes
      }, 500);
    },
  });

  /* ------------------------------------------
     7 — Step Navigation (with Correct Validation)
  ------------------------------------------- */
  const nextStep = async () => {
    const fields = stepFields[step]; // Validate only fields relevant to this step

    // ⭐ shouldFocus fixes UX + validation accuracy
    const valid = await trigger(fields, { shouldFocus: true });

    if (!valid) {
      alert("Please fill all required fields before continuing.");
      return;
    }

    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  /* ------------------------------------------
     8 — Final Submit Handler
  ------------------------------------------- */
  const submitForm = (data: IndustryFormData) => {
    mutation.mutate(data);
  };

  /* ------------------------------------------
     9 — UI Rendering
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
