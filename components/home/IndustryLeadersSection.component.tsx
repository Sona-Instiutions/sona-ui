"use client"; // Needed for interactivity
import { useState } from "react";
import Image from "next/image";

export default function IndustryLeadersSection() {
  // Partner data with category tags
  const partners = [
    { id: 1, name: "Aviocian Technologies Pvt. Ltd ", tagline: " ", icon: "/images/aviocian-technologies-pvt-ltd.svg", categories: ["Consultancy"] },
    { id: 2, name: "Axial Global Automation, Chennai ", tagline: " ", icon: "/images/axial-global-automation-chennai.svg", categories: ["Consultancy"] },
    { id: 3, name: "Bharat Electronics Ltd., Haryana ", tagline: " ", icon: "/images/bharat-electronics-ltd-haryana.svg", categories: ["Consultancy"] },
    { id: 4, name: "Buddi Health ", tagline: " ", icon: "/images/buddi-health.svg", categories: ["Consultancy"] },
    { id: 5, name: "CBC Fashion (Asia) Pvt. Ltd., Tirupur ", tagline: " ", icon: "/images/cbc-fashion-asia-pvt-ltd-tirupur.svg", categories: ["Consultancy"] },
    { id: 6, name: "Codissia, Coimbatore ", tagline: " ", icon: "/images/codissia-coimbatore.svg", categories: ["Consultancy"] },
    { id: 7, name: "Daffodil International University Dhaka, Bangladesh ", tagline: " ", icon: "/images/daffodil-international-university-dhaka-bangladesh.svg", categories: ["Consultancy"] },
    { id: 8, name: "De NOVO Software Solution, PGN Group ", tagline: " ", icon: "/images/de-novo-software-solution-pgn-group.svg", categories: ["Consultancy "] },
    { id: 9, name: "Federation of all the Civil Engineers Association of Tamil Nadu and Puducherry ", tagline: " ", icon: "/images/federation-of-all-the-civil-engineers-association-of-tamil-nadu-and-puducherry.svg", categories: ["Consultancy "] },
    { id: 10, name: "Irrigation Management Training Institute (PWD) Water resource Govt. of Tamil Nadu ", tagline: " ", icon: "/images/irrigation-management-training-institute-pwd-water-resource-govt-of-tamil-nadu.svg", categories: ["Consultancy "] },
    { id: 11, name: "JSW Steel limited ", tagline: " ", icon: "/images/jsw-steel-limited.svg", categories: ["Consultancy"] },
    { id: 12, name: "KCube Consultancy Services Pvt. Ltd ", tagline: " ", icon: "/images/kcube-consultancy-services-pvt-ltd.svg", categories: ["Consultancy"] },
    { id: 13, name: "National Cyber Safety and Security Standards ", tagline: " ", icon: "/images/national-cyber-safety-and-security-standards.svg", categories: ["Consultancy"] },
    { id: 14, name: "National physical Research Laboratory, New Delhi ", tagline: "", icon: "/images/national-physical-research-laboratory-new-delhi.svg", categories: ["Consultancy"] },
    { id: 15, name: "Nottingham Trent University ", tagline: " ", icon: "/images/nottingham-trent-university.svg", categories: ["Consultancy"] },
    { id: 16, name: "Perundurai Common Effluent Traetment Plant, (SIPCOT) ", tagline: " ", icon: "/images/perundurai-common-effluent-treatment-plant-sipcot.svg", categories: ["Consultancy"] },
    { id: 17, name: "Prayojana Construction Management Training Institute, Salem ", tagline: " ", icon: "/images/prayojana-construction-management-training-institute-salem.svg", categories: ["Consultancy"] },
    { id: 18, name: "Rally Rebar Detailing Services ", tagline: " ", icon: "/images/rally-rebar-detailing-services.svg", categories: ["Consultancy"] },
    { id: 19, name: "SALIEABS ", tagline: " ", icon: "/images/salieabs.svg", categories: ["Consultancy"] },
    { id: 20, name: "Swinburne University of Technology  ", tagline: "", icon: "/images/swinburne-university-of-technology.svg", categories: ["Consultancy"] },
    { id: 21, name: "Tamil Nadu Pollution Board, Tamil Nadu  ", tagline: "", icon: "/images/tamil-nadu-pollution-board-tamilnadu.svg", categories: ["Consultancy"] },
    { id: 22, name: "Texvalley Market Ltd., Erode ", tagline: " ", icon: "/images/texvalley-market-ltd-erode.svg", categories: ["Consultancy"] },
    { id: 23, name: "Titan Company Ltd., Hosur ", tagline: " ", icon: "/images/titan-company-ltd-hosur.svg", categories: ["Consultancy"] },
    { id: 24, name: "Aviocian Technologies Pvt. Ltd ", tagline: " ", icon: "/images/aviocian-technologies-pvt-ltd.svg", categories: ["Research and Development"] },
    { id: 25, name: "CBC Fashion (Asia) Pvt. Ltd., Tirupur ", tagline: " ", icon: "/images/cbc-fashion-asia-pvt-ltd-tirupur.svg", categories: ["Research and Development"] },
    { id: 26, name: "Codissia, Coimbatore ", tagline: " ", icon: "/images/codissia-coimbatore.svg", categories: ["Research and Development"] },
    { id: 27, name: "De NOVO Software Solution, PGN Group ", tagline: " ", icon: "/images/de-novo-software-solution-pgn-group.svg", categories: ["Research and Development"] },
    { id: 28, name: "Department of Atmospheric Sciences, Cochin University of Science and Technology ", tagline: " ", icon: "/images/department-of-atmospheric-sciences-cochin-university-of-science-and-technology.svg", categories: ["Research and Development"] },
    { id: 29, name: "Federation of all the Civil Engineers Association of Tamil Nadu and Puducherry ", tagline: " ", icon: "/images/federation-of-all-the-civil-engineers-association-of-tamil-nadu-and-puducherry.svg", categories: ["Research and Development"] },
    { id: 30, name: "FESTO India Pvt. Ltd., Bangaluru ", tagline: " ", icon: "/images/festo-india-pvt-ltd-bangaluru.svg", categories: ["Research and Development"] },
    { id: 31, name: "Hedra ", tagline: " ", icon: "/images/hedra.svg", categories: ["Research and Development"] },
    { id: 32, name: "Irrigation Management Training Institute (PWD) Water Resource Govt. of Tamil Nadu ", tagline: " ", icon: "/images/irrigation-management-training-institute-pwd-water-resource-govt-of-tamil-nadu.svg", categories: ["Research and Development"] },
    { id: 33, name: "JSW Steel limited ", tagline: " ", icon: "/images/jsw-steel-limited.svg", categories: ["Research and Development"] },
    { id: 34, name: "KCube Consultancy Services Pvt. Ltd ", tagline: " ", icon: "/images/kcube-consultancy-services-pvt-ltd.svg", categories: ["Research and Development"] },
    { id: 35, name: "Nagoya Institue of Technology, Nagoya, Japan ", tagline: " ", icon: "/images/nagoya-institue-of-technology-nagoya-japan.svg", categories: ["Research and Development"] },
    { id: 36, name: "National Cyber Safety and Security Standards ", tagline: " ", icon: "/images/national-cyber-safety-and-security-standards.svg", categories: ["Research and Development"] },
    { id: 37, name: "National Physical Research Laboratory, New Delhi ", tagline: " ", icon: "/images/national-physical-research-laboratory-new-delhi.svg", categories: ["Research and Development"] },
    { id: 38, name: "Perundurai Common Effluent Traetment Plant (SIPCOT) ", tagline: " ", icon: "/images/perundurai-common-effluent-traetment-plant-sipcot.svg", categories: ["Research and Development"] },
    { id: 39, name: "Prayojana Construction Management Training Institute, Salem ", tagline: " ", icon: "/images/prayojana-construction-management-training-institute-salem.svg", categories: ["Research and Development"] },
    { id: 40, name: "Rally Rebar Detailing Services ", tagline: " ", icon: "/images/rally-rebar-detailing-services.svg", categories: ["Research and Development"] },
    { id: 41, name: "Red hat ", tagline: " ", icon: "/images/red-hat.svg", categories: ["Research and Development"] },
    { id: 42, name: "SALIEABS ", tagline: " ", icon: "/images/salieabs.svg", categories: ["Research and Development"] },
    { id: 43, name: "Semiconductor Physics Research Centre, Chonbug National University, Jeonju, South Korea ", tagline: " ", icon: "/images/semiconductor-physics-research-centre-chonbug-national-university-jeonju-south-korea.svg", categories: ["Research and Development"] },
    { id: 44, name: "Swinburne University of Technology ", tagline: " ", icon: "/images/swinburne-university-of-technology.svg", categories: ["Research and Development"] },
    { id: 45, name: "Tamil Nadu Pollution board, Tamil Nadu ", tagline: " ", icon: "/images/tamil-nadu-pollution-board-tamilnadu.svg", categories: ["Research and Development"] },
    { id: 46, name: "Texvalley Market Ltd., Erode ", tagline: " ", icon: "/images/texvalley-market-ltd-erode.svg", categories: ["Research and Development"] },
    { id: 47, name: "Titan Company Ltd., Hosur ", tagline: " ", icon: "/images/titan-company-ltd-hosur.svg", categories: ["Research and Development"] },
    { id: 48, name: "Virya Mobility 5.o LLP, Bangaluru ", tagline: " ", icon: "/images/virya-mobility-5o-llp-bangaluru.svg", categories: ["Research and Development"] },
    { id: 49, name: "Aviocian Technologies Pvt. Ltd ", tagline: " ", icon: "/images/logo-1.svg", categories: ["Training"] },
    { id: 50, name: "Axial Global Automation, Chennai ", tagline: " ", icon: "/images/logo-2.svg", categories: ["Training"] },
    { id: 51, name: "Bharat Electronics Ltd., Haryana ", tagline: " ", icon: "/images/logo-3.svg", categories: ["Training"] },
    { id: 52, name: "Buddi Health ", tagline: " ", icon: "/images/logo-4.svg", categories: ["Training"] },
    { id: 53, name: "CADD Centre Training Services, Salem ", tagline: " ", icon: "/images/logo-5.svg", categories: ["Training"] },
    { id: 54, name: "CBC Fashion (Asia) Pvt. Ltd.,Tirupur ", tagline: " ", icon: "/images/logo-6.svg", categories: ["Training"] },
    { id: 55, name: "Consleaque Consultancy Pvt. Ltd ", tagline: " ", icon: "/images/logo-7.svg", categories: ["Training"] },
    { id: 56, name: "Daffodil International University Dhaka, Bangladesh ", tagline: " ", icon: "/images/logo-8.svg", categories: ["Training"] },
    { id: 57, name: "Data Crop ", tagline: " ", icon: "/images/logo-9.svg", categories: ["Training"] },
    { id: 58, name: "De NOVO Software Solution, PGN Group ", tagline: " ", icon: "/images/logo-10.svg", categories: ["Training"] },
    { id: 59, name: "Federation of all the Civil Engineers Association of Tamil Nadu and Puducherry ", tagline: " ", icon: "/images/logo-11.svg", categories: ["Training"] },
    { id: 60, name: "FESTO India Pvt. Ltd., Bangaluru ", tagline: " ", icon: "/images/logo-12.svg", categories: ["Training"] },
    { id: 61, name: "IBM Academic Initiative ", tagline: " ", icon: "/images/logo-13.svg", categories: ["Training"] },

    { id: 62, name: "Infosys Computer Connect ", tagline: " ", icon: "/images/logo-14.svg", categories: ["Training"] },
    { id: 63, name: "Irrigation Management Training Institute (PWD) Water Resource Govt. of Tamil Nadu ", tagline: " ", icon: "/images/logo-15.svg", categories: ["Training"] },
    { id: 64, name: "JSW Steel limited ", tagline: " ", icon: "/images/logo-16.svg", categories: ["Training"] },
    { id: 65, name: "KCube Consultancy Services Pvt. Ltd ", tagline: " ", icon: "/images/logo-17.svg", categories: ["Training"] },
    { id: 66, name: "Live Wire ", tagline: " ", icon: "/images/logo-18.svg", categories: ["Training"] },
    { id: 67, name: "Nagoya Institue of Technology, Nagoya, Japan ", tagline: " ", icon: "/images/logo-19.svg", categories: ["Training"] },
    { id: 68, name: "National Cyber Safety and Security Standards ", tagline: " ", icon: "/images/logo-20.svg", categories: ["Training"] },
    { id: 69, name: "National Physical Research Laboratory, New Delhi ", tagline: " ", icon: "/images/logo-21.svg", categories: ["Training"] },
    { id: 70, name: "Nottingham Trent University ", tagline: " ", icon: "/images/logo-22.svg", categories: ["Training"] },
    { id: 71, name: "Prayojana Construction Management Training Institute, Salem ", tagline: " ", icon: "/images/logo-23.svg", categories: ["Training"] },
    { id: 72, name: "Rally Rebar Detailing Services ", tagline: " ", icon: "/images/logo-24.svg", categories: ["Training"] },
    { id: 73, name: "Red Hat ", tagline: " ", icon: "/images/logo-25.svg", categories: ["Training"] },
    { id: 74, name: "SALIEABS ", tagline: " ", icon: "/images/logo-26.svg", categories: ["Training"] },
    { id: 75, name: "Semiconductor Physics Research Centre, Chonbug National University, Jeonju, South Korea ", tagline: " ", icon: "/images/logo-27.svg", categories: ["Training"] },
    { id: 76, name: "Swinburne University of Technology ", tagline: " ", icon: "/images/logo-28.svg", categories: ["Training"] },
    { id: 77, name: "Texas Instruments Innovations Lab ", tagline: " ", icon: "/images/logo-29.svg", categories: ["Training"] },
    { id: 78, name: "Texvalley Market Ltd., Erode ", tagline: " ", icon: "/images/logo-30.svg", categories: ["Training"] },
    { id: 79, name: "UiPath, Bangalore ", tagline: " ", icon: "/images/logo-31.svg", categories: ["Training"] },
    { id: 80, name: "V M Ware ", tagline: " ", icon: "/images/logo-32.svg", categories: ["Training"] },
    
    { id: 81, name: "VARPAS Media Technologies ", tagline: " ", icon: "/images/logo-33.svg", categories: ["Training"] },
    { id: 82, name: "Fibro Foods", tagline: " ", icon: "/images/logo-34.svg", categories: ["Sona School of Business and Management"] },
    { id: 83, name: "Janalakshmi Financial Services", tagline: " ", icon: "/images/logo-35.svg", categories: ["Sona School of Business and Management"] },
    { id: 84, name: "JSW Steel limited", tagline: " ", icon: "/images/logo-36.svg", categories: ["Sona School of Business and Management"] },
    { id: 85, name: "My Play Factory", tagline: " ", icon: "/images/logo-37.svg", categories: ["Sona School of Business and Management"] },
    { id: 86, name: "Sona STAR", tagline: " ", icon: "/images/logo-38.svg", categories: ["Sona School of Business and Management"] },
    { id: 87, name: "Sri Jayashree Food Products", tagline: " ", icon: "/images/logo-39.svg", categories: ["Sona School of Business and Management"] },
    { id: 88, name: "Triveni Cars Private Ltd", tagline: " ", icon: "/images/logo-40.svg", categories: ["Sona School of Business and Management"] },
    { id: 89, name: "Vee Technologies", tagline: " ", icon: "/images/logo-41.svg", categories: ["Sona School of Business and Management"] },
  ];

  const tags = [
    { id: 1, text: "Consultancy", color: "bg-yellow-400 text-black cursor-pointer" },
    { id: 2, text: "Research and Development", color: "bg-yellow-400 text-black cursor-pointer" },
    { id: 3, text: "Training", color: "bg-yellow-400 text-black cursor-pointer" },
    // { id: 4, text: "Sona School of Business and Management", color: "bg-yellow-400 text-black cursor-pointer" },
  ];

  // State for active tab
  const [activeTab, setActiveTab] = useState("Consultancy");

  // Filter partners based on tab
  const filteredPartners = partners.filter((partner) =>
    partner.categories.includes(activeTab)
  );

  return (
    <section className="py-4 md:py-10 bg-gray-50 text-center">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Trusted by <span className="text-yellow-500">Industry Leaders</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
        SCALE’s industry-built model enables strong collaborations with global enterprises and innovation-driven companies.
        </p>

        {/* Logos Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16 transition-all duration-700"
          key={activeTab} // re-render animation on change
        >
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center group"
            >
              <div className="w-20 h-20 relative opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={partner.icon}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800">{partner.name}</h3>
              <p className="text-xs text-gray-500">{partner.tagline}</p>
            </div>
          ))}
        </div>

        {/* Partnership Tabs */}

        <div className="bg-white p-2 md:p-4 rounded-full w-full overflow-hidden">
          <div
            className="
    flex gap-4 items-center overflow-x-auto whitespace-nowrap
    md:grid md:grid-flow-col md:auto-cols-fr md:gap-8
    md:overflow-visible md:whitespace-normal md:flex-none
  "
          >
            <span className="flex-shrink-0 text-gray-700 font-semibold mr-2">
              Partnership Opportunities:
            </span>
            {/* Dynamic pills with functionality */}
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setActiveTab(tag.text)}
                className={`
          flex-shrink-0 snap-start px-4 py-2 rounded-full font-medium transition-all cursor-pointer
          ${activeTab === tag.text
                    ? "bg-yellow-400 text-black"
                    : "bg-red-100 text-gray-700 hover:bg-red-200"
                  }
        `}
              >
                {tag.text}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
