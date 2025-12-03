"use client";

import {
  Car,
  Bus,
  Plane,
  Train,
  MapPin,
} from "lucide-react";

export default function FindOurCampusSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10">
          Find Our <span className="text-yellow-500">Campus</span>
        </h2>

        {/* MAP WITH FLOATING CARD */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* GOOGLE MAP IFRAME */}
          <div className="w-full h-[350px] md:h-[420px] overflow-hidden rounded-2xl">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.26048744774!2d78.1408894!3d11.6643259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1c56cbe1f81%3A0x7d3e13d3f961bd9!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709812345678"
            ></iframe>
          </div>

          {/* FLOATING INFO CARD */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 md:p-8 rounded-2xl shadow-xl w-[260px] md:w-[300px] text-center">
            
            {/* Icon */}
            <div className="w-14 h-14 mx-auto mb-4 bg-blue-900 text-white rounded-full flex items-center justify-center">
              <MapPin size={28} />
            </div>

            <h3 className="text-lg font-bold text-gray-900">SCALE Campus</h3>

            <p className="text-gray-600 text-sm mt-2">
              Salem–Bangalore Highway  
              <br /> Tamil Nadu 636601, India
            </p>

            <a
              href="https://maps.google.com"
              target="_blank"
              className="mt-4 inline-block bg-blue-900 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-950 transition"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* TRANSPORT OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          {/* By Car */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Car size={24} />
            </div>

            <h4 className="font-bold text-gray-900 mb-2">By Car</h4>
            <p className="text-sm text-gray-600">
              Enjoy free on-campus parking. Simply take Exit 12 on the Salem–Bangalore Highway to reach SCALE.
            </p>
          </div>

          {/* Public Transport */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
              <Bus size={24} />
            </div>

            <h4 className="font-bold text-gray-900 mb-2">Public Transport</h4>
            <p className="text-sm text-gray-600">
               Frequent buses operate from Salem and Bangalore. A SCALE shuttle is available from the railway station.
            </p>
          </div>

          {/* By Air */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4">
              <Plane size={24} />
            </div>

            <h4 className="font-bold text-gray-900 mb-2">By Air</h4>
            <p className="text-sm text-gray-600">
              Salem Airport is just 45 minutes away, with shuttle services arranged on request.
            </p>
          </div>

          {/* By Train */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <Train size={24} />
            </div>

            <h4 className="font-bold text-gray-900 mb-2">By Train</h4>
            <p className="text-sm text-gray-600">
              Salem Junction is the closest railway station. Shuttle services to campus run during peak hours.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
