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

export default function IndustryMultiStepForm() {
  const [step, setStep] = useState(1);

  // -----------------------------
  // 1️⃣ React-Hook-Form instance
  // -----------------------------
  const form = useForm({
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

  // -------------------------------------------
  // 2️⃣ Load Saved Data From LocalStorage
  // -------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const values = JSON.parse(saved);
        reset(values); // Fill form with saved data
      } catch { }
    }
  }, [reset]);

  // ---------------------------------------------------
  // 3️⃣ Persist Form Data Automatically on Every Change
  // ---------------------------------------------------
  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });

    return () => subscription.unsubscribe();
  }, [watch]);


  // --------------------------
  // 4️⃣ Tanstack Mutation
  // --------------------------
  const mutation = useMutation({
    mutationFn: async (data) => {
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


  // ----------------------------------------
  // 5️⃣ Step Navigation With Validation
  // ----------------------------------------
  const nextStep = async () => {
    const valid = await trigger();
    if (!valid) {
      alert("Please fill all required fields before continuing.");
      return;
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const submitForm = (data) => mutation.mutate(data);

  // --------------------------
  // 6️⃣ Final JSX
  // --------------------------
  return (
    <section className="py-16 bg-gray-50">
      <div className=" max-w-5xl mx-auto space-y-10">
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Submit Your <span className="text-yellow-400">Requirements</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-16">
            Tell us about your collaboration needs and we'll create a customized partnership proposal tailored to your business objectives
          </p>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="shadow p-8 rounded-2xl bg-white">

          <StepProgress step={step} />

          {step === 1 && <Step1Company form={form} />}
          {step === 2 && <Step2Contact form={form} />}
          {step === 3 && <Step3Requirements form={form} />}
          {step === 4 && <Step4Project form={form} />}

          {/* BUTTONS */}
          <div className="flex justify-between pt-6">

            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-3 rounded-lg bg-gray-200 text-gray-800"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={nextStep}
                className="cursor-pointer px-8 py-3 rounded-lg bg-yellow-400 text-white"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="cursor-pointer px-8 py-3 rounded-lg bg-yellow-400 text-white"
              >
                {mutation.isPending ? "Submitting..." : "Submit Your Requirement"}
              </button>
            )}

          </div>
        </form>

        {mutation.isSuccess && (
          <p className="text-green-600 font-semibold">Form submitted successfully!</p>
        )}
      </div>
    </section>

  );
}
