"use client";

import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        
        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* ------------------------------------------------ */}
          {/* LEFT — CONTACT FORM */}
          {/* ------------------------------------------------ */}

          <div className="md:col-span-2">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
              Get In Touch
            </h2>

            <p className="text-gray-600 max-w-lg mb-10">
              Have questions about our programs, admissions, or campus life?
              We’d love to hear from you. Fill out the form and our team will
              get back to you within 24 hours.
            </p>

            <form className="space-y-6">

              {/* Select */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  I am a
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                >
                  <option>Select your category</option>
                  <option>Student</option>
                  <option>Parent</option>
                  <option>Working Professional</option>
                  <option>Other</option>
                </select>
              </div>

              {/* First + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this regarding?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Tell us more about your inquiry…"
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-950 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* ------------------------------------------------ */}
          {/* RIGHT — CONTACT INFO BOXES */}
          {/* ------------------------------------------------ */}

          <div className="md:col-span-1 space-y-8">

            {/* CARD 1 */}
            <div className="bg-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Other Ways to Reach Us
              </h3>

              <div className="space-y-5 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-blue-900 text-xl">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-gray-600">+91 427 230 1234</p>
                    <p className="text-xs text-gray-500">
                      Monday – Friday, 9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-900 text-xl">📧</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-gray-600">
                      admissions@scale. edu.in
                    </p>
                    <p className="text-xs text-gray-500">We’ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-900 text-xl">📍</span>
                  <div>
                    <p className="font-semibold">Visit Us</p>
                    <p className="text-sm text-gray-600">
                      SCALE Campus  
                      <br />
                      Salem–Bangalore Highway  
                      <br />
                      Tamil Nadu 636601, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-900 text-xl">⏰</span>
                  <div>
                    <p className="font-semibold">Campus Hours</p>
                    <p className="text-sm text-gray-600">
                      Monday – Saturday: 8:00 AM – 8:00 PM  
                      <br />
                      Sunday: 10:00 AM – 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-3">Department Contacts</h3>

              <div className="space-y-3 text-left text-sm">
                <p className="flex justify-between border-b pb-2">
                  <span>Admissions Office</span> <strong>+91 427 230 1235</strong>
                </p>
                <p className="flex justify-between border-b pb-2">
                  <span>Student Services</span> <strong>+91 427 230 1236</strong>
                </p>
                <p className="flex justify-between border-b pb-2">
                  <span>International Office</span> <strong>+91 427 230 1237</strong>
                </p>
                <p className="flex justify-between">
                  <span>Career Services</span> <strong>+91 427 230 1238</strong>
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-blue-900 rounded-2xl p-6 shadow-md text-white text-left">
              <h3 className="text-lg font-bold mb-2">Schedule a Campus Tour</h3>
              <p className="text-sm mb-4">
                Experience SCALE firsthand with a personalized campus tour.
              </p>
              <button className="bg-white text-blue-900 font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition">
                Book Your Visit
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
