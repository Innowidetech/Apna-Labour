import React from "react";
import { Search, ChevronRight, Star, Users, UserCog } from "lucide-react";
import heroBg from "../assets/heroBg.png";
import { Link } from "react-router-dom";


// Demo service images (replace with your real assets)
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";

// ✅ Updated section service images
import appliance from "../assets/img1.png";
import pest from "../assets/img2.png";
import electrician from "../assets/img3.png";
import carpenter from "../assets/img4.png";
import painting from "../assets/img5.png";
import womenSalon from "../assets/img6.png";
import menSalon from "../assets/img7.png";
import labor from "../assets/img8.png";

const Home = () => {
  const services = [
    { img: service1, title: "Home Cleaning" },
    { img: service2, title: "Plumbing" },
    { img: service3, title: "Electrical" },
  ];

  // ✅ Your final services section (8 cards)
 const allServices = [
  { id: 1, title: "Appliance Repair", icon: appliance, path: "/appliance-repair" },
  { id: 2, title: "Cleaning & Pest Control", icon: pest, path: "/cleaning-pest" },
  { id: 3, title: "Electrician", icon: electrician, path: "/electrician" },
  { id: 4, title: "Plumber & Carpenter", icon: carpenter, path: "/plumcarpenter" },
  { id: 5, title: "Painting & Waterproofing", icon: painting, path: "/painting-waterproofing" },
  { id: 6, title: "Women Salon", icon: womenSalon, path: "/women-salon" },
  { id: 7, title: "Men Salon", icon: menSalon, path: "/men-salon" },
  { id: 8, title: "Casual Laborer", icon: labor, path: "/casual-labour" },
];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden mx-4 md:mx-9 mt-6 min-h-[70vh] sm:min-h-[80vh]"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Overlay */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 sm:py-16 md:py-32 flex flex-col md:flex-row items-center bg-black/40 rounded-3xl h-full">
          {/* Left Content */}
          <div className="flex-1 text-white text-center md:text-start">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
              Your Home, Our Work{" "}
              <br className="hidden md:block" /> Just a Click Away.
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
              Book trusted help for home services
            </p>

            {/* Search Bar */}
            <div className="mt-5 sm:mt-6 flex justify-center md:justify-start w-full">
              <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm sm:max-w-md">
                <input
                  type="text"
                  placeholder="Search for a home service"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 outline-none text-gray-600 text-sm md:text-base"
                />
                <button className="bg-blue-900 text-white px-4 sm:px-5 py-2 sm:py-3">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right-Bottom Services Card */}
          <div
            className="rounded-2xl p-4 sm:p-5 w-full xs:max-w-sm sm:w-[320px]
              mt-6 sm:mt-8 md:mt-0
              md:absolute md:-bottom-6 md:right-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                Most Demanding Services
              </h3>
              <button className="p-1.5 sm:p-2 rounded-full border bg-gray-100 hover:bg-gray-200">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Services Row */}
            <div className="flex justify-between gap-2 sm:gap-4">
              {services.map((service, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-600 text-center">
                    {service.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-full sm:max-w-2xl ml-auto mt-6 px-4 sm:px-8 md:px-12">
        <div className="bg-white border rounded-xl sm:rounded-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 py-3 sm:py-2 px-4 sm:px-6 text-gray-600">
          {/* Rating */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
            <Star className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">4.8 Service Rating</span>
          </div>

          <span className="hidden sm:block mx-4 text-gray-300">|</span>

          {/* Customers */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">1M+ Customers</span>
          </div>

          <span className="hidden sm:block mx-4 text-gray-300">|</span>

          {/* Helpers */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
            <UserCog className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">120+ Helpers</span>
          </div>
        </div>
      </section>

      {/* ✅ Complete Services Section */}
      <section className="bg-[#F2FAFF] py-12 mt-10">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Complete Home Care Under One Roof!
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center">
  {allServices.map((service) => (
    <Link 
      key={service.id} 
      to={service.path} 
      className="flex flex-col items-center p-4 hover:scale-105 transition-transform duration-300"
    >
      <img
        src={service.icon}
        alt={service.title}
        className="w-28 h-28 mb-4"
      />
      <h3 className="text-base md:text-lg font-medium text-gray-800">
        {service.title}
      </h3>
    </Link>
  ))}
</div>

        </div>
      </section>
    </div>
  );
};

export default Home;
