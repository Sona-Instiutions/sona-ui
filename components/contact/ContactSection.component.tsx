"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useSubmitContactFormMutation } from "@/services/client/contactSubmission.client";
import { Phone, MapPin, Mail } from "lucide-react";
import { FOOTER_CONTACT_INFO } from "@/constants/navigation.constants";
export default function ContactSection() {
  const [form, setForm] = useState({
    Category: "",
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Subject: "",
    Message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const { mutate, isPending } = useSubmitContactFormMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // PHONE: Allow only numbers
    if (name === "PhoneNumber") {
      const numericValue = value.replace(/\D/g, ""); // remove letters
      setForm({ ...form, PhoneNumber: numericValue });
      setErrors({ ...errors, PhoneNumber: "" });
      return;
    }

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // VALIDATION FUNCTION
  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!form.Category) newErrors.Category = "Please select a category";
    if (!form.FirstName) newErrors.FirstName = "First name is required";

    // EMAIL VALIDATION
    if (!form.EmailAddress) {
      newErrors.EmailAddress = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.EmailAddress)) {
      newErrors.EmailAddress = "Enter a valid email address";
    }

    // PHONE VALIDATION
    if (!form.PhoneNumber) {
      newErrors.PhoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.PhoneNumber)) {
      newErrors.PhoneNumber = "Phone number must be 10 digits";
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    mutate(form, {
      onSuccess: () => {
        setSuccessMessage("Your message has been successfully submitted!");

        // Reset form
        setForm({
          Category: "",
          FirstName: "",
          LastName: "",
          EmailAddress: "",
          PhoneNumber: "",
          Subject: "",
          Message: "",
        });
      },
      onError: (error) => {
        console.error("Form submit error:", error);
      },
    });
  };

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-6 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          <div className='md:col-span-2'>
            <h2 className='text-4xl font-extrabold text-gray-900 mb-3'>Get in touch</h2>

            <p className='text-gray-600 max-w-lg mb-10'>
              Share your details and let us know how we can support your learning, collaboration, or information needs.
            </p>

            {/* SUCCESS MESSAGE */}
            {successMessage && <div className='bg-green-100 text-green-700 p-3 mb-6 rounded'>{successMessage}</div>}

            {/* FORM START */}
            <form className='space-y-6' onSubmit={handleSubmit}>
              {/* Category */}
              <div>
                {/* <label className='block text-sm font-medium text-gray-600 mb-1'>I am a</label> */}
                <select
                  name='Category'
                  value={form.Category}
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none'
                >
                  <option value=''>Select your category</option>
                  <option value='Student'>Student</option>
                  <option value='Parent'>Parent</option>
                  <option value='Working Professional'>Working Professional</option>
                  <option value='Other'>Other</option>
                </select>

                {errors.Category && <p className='text-red-500 text-sm'>{errors.Category}</p>}
              </div>

              {/* First Name */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>First Name</label>

                  <input
                    name='FirstName'
                    value={form.FirstName}
                    onChange={handleChange}
                    placeholder='First Name'
                    className='w-full border rounded-lg px-4 py-3'
                  />
                  {errors.FirstName && <p className='text-red-500 text-sm'>{errors.FirstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>Last Name</label>

                  <input
                    name='LastName'
                    value={form.LastName}
                    onChange={handleChange}
                    placeholder='Last Name'
                    className='w-full border rounded-lg px-4 py-3'
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Email Address</label>

                <input
                  name='EmailAddress'
                  type='email'
                  value={form.EmailAddress}
                  onChange={handleChange}
                  placeholder='Email Address'
                  className='w-full border rounded-lg px-4 py-3'
                />
                {errors.EmailAddress && <p className='text-red-500 text-sm'>{errors.EmailAddress}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Phone Number</label>

                <input
                  name='PhoneNumber'
                  value={form.PhoneNumber}
                  onChange={handleChange}
                  placeholder='Phone Number'
                  maxLength={10}
                  className='w-full border rounded-lg px-4 py-3'
                />
                {errors.PhoneNumber && <p className='text-red-500 text-sm'>{errors.PhoneNumber}</p>}
              </div>

              {/* Subject */}
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Subject</label>

                <input
                  name='Subject'
                  value={form.Subject}
                  onChange={handleChange}
                  placeholder='Subject'
                  className='w-full border rounded-lg px-4 py-3'
                />
              </div>

              {/* Message */}
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Message</label>

                <textarea
                  name='Message'
                  value={form.Message}
                  onChange={handleChange}
                  placeholder='Write your message'
                  className='w-full border rounded-lg px-4 py-3'
                />
              </div>

              {/* Submit */}
              <button
                type='submit'
                disabled={isPending}
                className={`w-full bg-blue-900 text-white rounded-lg py-3 transition ${
                  isPending ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-800 cursor-pointer"
                } `}
              >
                {isPending ? "Sending..." : "Message us"}
              </button>
            </form>
          </div>

          {/* ------------------------------------------------ */}
          {/* RIGHT — CONTACT INFO BOXES */}
          {/* ------------------------------------------------ */}

          <div className='md:col-span-1 space-y-8'>
            {/* CARD 1 */}
            <div className='bg-gray-100 rounded-2xl p-6 shadow-sm'>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>Other Ways to Reach Us</h3>

              <div className='space-y-5 text-left'>
                <div className='flex items-start gap-3'>
                  <div className='w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center'>
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className='font-semibold'>Phone</p>
                    <p className='text-sm text-gray-600'>
                      <a href='tel:+919442592175'>+91 9442592175</a>
                    </p>
                    <p className='text-xs text-gray-500'>Monday – Friday, 9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center'>
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className='font-semibold'>Email</p>
                    <p className='text-sm text-gray-600'>
                      <a href={`mailto:${FOOTER_CONTACT_INFO.email}`}>{FOOTER_CONTACT_INFO.email}</a>
                    </p>
                    <p className='text-xs text-gray-500'>We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center'>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className='font-semibold'>Visit Us</p>
                    <p className='text-sm text-gray-600'>
                      #43/1A , Billekempanahalli Village,
                      <br />
                      Bidadi Hobli, Ramnagara Taluk,
                      <br />
                      Karnataka – 562109, India.
                    </p>
                  </div>
                </div>

                {/* <div className='flex items-start gap-3'>
                  <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center">
                    <Clock3 size={20} />
                  </div>
                  <div>
                    <p className='font-semibold'>Campus Hours</p>
                    <p className='text-sm text-gray-600'>
                      Monday – Saturday: 8:00 AM – 8:00 PM
                      <br />
                      Sunday: 10:00 AM – 4:00 PM
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* CARD 2 */}
            {/* <div className='bg-gray-100 rounded-2xl p-6 shadow-sm'>
              <h3 className='text-lg font-bold mb-3'>Department Contacts</h3>

              <div className='space-y-3 text-left text-sm'>
                <p className='flex justify-between border-b pb-2'>
                  <span>Admissions Office</span> <strong>+91 427 230 1235</strong>
                </p>
                <p className='flex justify-between border-b pb-2'>
                  <span>Student Services</span> <strong>+91 427 230 1236</strong>
                </p>
                <p className='flex justify-between border-b pb-2'>
                  <span>International Office</span> <strong>+91 427 230 1237</strong>
                </p>
                <p className='flex justify-between'>
                  <span>Career Services</span> <strong>+91 427 230 1238</strong>
                </p>
              </div>
            </div> */}

            {/* CARD 3 */}
            {/* <div className='bg-blue-900 rounded-2xl p-6 shadow-md text-white text-left'>
              <h3 className='text-lg font-bold mb-2'>Schedule a Campus Tour</h3>
              <p className='text-sm mb-4'>Experience SCALE firsthand with a personalized campus tour.</p>
              <button className='bg-white text-blue-900 font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition'>
                Book Your Visit
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
