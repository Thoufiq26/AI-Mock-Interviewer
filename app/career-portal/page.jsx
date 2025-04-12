"use client";
import React from "react";
import Header from "../dashboard/_components/Header"; // adjust the path if needed

const companies = [
  { name: "TCS", link: "https://www.tcs.com/careers" },
  { name: "Infosys", link: "https://www.infosys.com/careers/" },
  { name: "Wipro", link: "https://careers.wipro.com/" },
  { name: "Capgemini", link: "https://www.capgemini.com/careers/" },
  { name: "Cognizant", link: "https://careers.cognizant.com/global/en" },
  { name: "Accenture", link: "https://www.accenture.com/in-en/careers" },
  { name: "IBM", link: "https://www.ibm.com/employment/" },
  { name: "Google", link: "https://careers.google.com/" },
  { name: "Amazon", link: "https://www.amazon.jobs/en/" },
  { name: "Microsoft", link: "https://careers.microsoft.com/" },
  { name: "Facebook", link: "https://www.metacareers.com/" },
  { name: "Apple", link: "https://www.apple.com/careers/" },
  { name: "Adobe", link: "https://www.adobe.com/careers.html" },
  { name: "Oracle", link: "https://www.oracle.com/careers/" },
  { name: "Salesforce", link: "https://www.salesforce.com/company/careers/" },
  { name: "HCL", link: "https://www.hcltech.com/careers" },
  { name: "Tech Mahindra", link: "https://careers.techmahindra.com/" },
  { name: "Zoho", link: "https://www.zoho.com/careers.html" },
  { name: "Freshworks", link: "https://www.freshworks.com/company/careers/" },
  { name: "Flipkart", link: "https://www.flipkartcareers.com/" },
  { name: "NVIDIA", link: "https://www.nvidia.com/en-us/about-nvidia/careers/" },
  { name: "Intel", link: "https://www.intel.com/content/www/us/en/jobs/jobs-at-intel.html" },
  { name: "Qualcomm", link: "https://www.qualcomm.com/company/careers" },
  { name: "Siemens", link: "https://jobs.siemens.com/" },
  { name: "Samsung", link: "https://www.samsungcareers.com/global/main" },
  { name: "Toshiba", link: "https://www.toshiba.com/tai/" },
  { name: "Bosch", link: "https://www.bosch.in/careers/" },
  { name: "Mindtree", link: "https://www.ltimindtree.com/careers/" },
  { name: "L&T Infotech", link: "https://www.lntinfotech.com/careers/" },
  { name: "Virtusa", link: "https://www.virtusa.com/careers" },
  { name: "Hexaware", link: "https://www.hexaware.com/careers/" },
  { name: "UST Global", link: "https://www.ust.com/en/careers" },
  { name: "Mu Sigma", link: "https://www.mu-sigma.com/careers" },
  { name: "InMobi", link: "https://www.inmobi.com/company/careers" },
  { name: "Paytm", link: "https://paytm.com/careers" },
  { name: "Ola", link: "https://careers.olacabs.com/" },
  { name: "Swiggy", link: "https://careers.swiggy.com/" },
  { name: "Zomato", link: "https://www.zomato.com/careers" },
  { name: "Razorpay", link: "https://razorpay.com/careers/" },
  { name: "PhonePe", link: "https://www.phonepe.com/careers/" },
  { name: "CRED", link: "https://careers.cred.club/" },
  { name: "Meesho", link: "https://meesho.io/" },
  { name: "Delhivery", link: "https://www.delhivery.com/careers/" },
  { name: "Byjus", link: "https://byjus.com/careers/" },
  { name: "WhiteHat Jr", link: "https://whitehatjr.com/careers" },
  { name: "Unacademy", link: "https://unacademy.com/careers" },
  { name: "Vedantu", link: "https://www.vedantu.com/careers" },
  { name: "Turing", link: "https://www.turing.com/jobs" },
  { name: "Scaler", link: "https://www.scaler.com/careers/" },
  { name: "Naukri", link: "https://careers.infoedge.in/" },
  { name: "Monster India", link: "https://www.monsterindia.com/career-advice/" },
  // Add more to make 100...
];

// repeat dummy entries to reach 51 if needed
while (companies.length < 51) {
  companies.push({
    name: `Company ${companies.length + 1}`,
    link: "https://example.com",
  });
}

const CareerPortals = () => {
  return (
    <div>
         <Header />
         <div className="min-h-screen bg-black py-16 px-6">
         <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 animate-pulse leading-tight">
         Company Career Portals
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {companies.map((company, index) => (
      <div
        key={index}
        className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out transform"
      >
        <h2 className="text-lg font-semibold text-center text-white group-hover:text-purple-400 transition duration-300">
          {company.name}
        </h2>
        <a
          href={company.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-center text-purple-400 hover:text-pink-500 text-sm hover:underline transition-all"
        >
          🔗 Visit Portal →
        </a>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default CareerPortals;
