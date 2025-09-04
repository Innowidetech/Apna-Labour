import React from "react";
import { Search, ChevronRight, Star, Users, UserCog } from "lucide-react";
import heroBg from "../assets/heroBg.png";



import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
// Demo service images (replace with your real assets)
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";


// New section service images (replace with actual assets)
import appliance from "../assets/Appliance1.png";
import pest from "../assets/Appliance2.png";
import electrician from "../assets/Appliance3.png";
import plumber from "../assets/Appliance4.png";
import painting from "../assets/Appliance5.png";
import womenSalon from "../assets/Appliance6.png";
import menSalon from "../assets/Appliance7.png";
import casuallabarer from "../assets/Appliance8.png";
import massageService from "../assets/massageService.png"
import plant from "../assets/plant.png"
// Slider services (replace images with your actual assets if needed)
import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";
import slider4 from "../assets/slider4.png";
//

import hygiene1 from "../assets/hygiene1.png";
import hygiene2 from "../assets/hygiene2.png";
import hygiene3 from "../assets/hygiene3.png";


import cleaning1 from "../assets/cleaning1.png";
import cleaning2 from "../assets/cleaning2.png";
import cleaning3 from "../assets/cleaning3.png";

import repair1 from "../assets/repair1.png";
import repair2 from "../assets/repair2.png";
import repair3 from "../assets/repair3.png";
import repair4 from "../assets/repair4.png";
import homeRight from "../assets/homeRight.png";
import homeLeft from "../assets/homeLeft.png";

import garden1 from "../assets/garden1.png";
import garden2 from "../assets/garden2.png";
import garden3 from "../assets/garden3.png";
import booking1 from "../assets/booking1.png";
import booking2 from "../assets/booking2.png";
import booking3 from "../assets/booking3.png";
import installation1 from "../assets/installation1.png";
import installation2 from "../assets/installation2.png";
import installation3 from "../assets/installation3.png";
import installation4 from "../assets/installation4.png";
import trust from "../assets/trust.png";
import contact from "../assets/contact.png";

const Home = () => {
  const services = [
    { img: service1, title: "Home Cleaning" },
    { img: service2, title: "Plumbing" },
    { img: service3, title: "Electrical" },
  ];


  const allServices = [
    { img: appliance, title: "Appliance Repair", path: "/appliance-repair" },

    { img: pest, title: "Cleaning & Pest Control", path: "/cleaning-pest" },
    { img: electrician, title: "Electrician", path: "/electrician" },
    { img: plumber, title: "Plumber & Carpenter", path: "/plumber-carpenter" },
    { img: painting, title: "Painting & Waterproofing", path: "/painting-waterproofing" },
    { img: womenSalon, title: "Women Salon", path: "/women-salon" },
    { img: menSalon, title: "Men Salon", path: "/men-salon" },
    { img: casuallabarer, title: "Casual Labourer", path: "/casual-labourer" },
  ];


  // Updated slider with different details
  const sliderServices = [
    {
      img: slider1,
      title: "Intense Cleaning (2 Bathrooms)",
      rating: 4.8,
      price: 1500,
    },
    {
      img: slider2,
      title: "Water Tank Cleaning (10Ltr)",
      rating: 4.6,
      price: 2500,
    },
    {
      img: slider3,
      title: "Bedroom Cleaning",
      rating: 4.7,
      price: 1800,
    },
    {
      img: slider4,
      title: "Plumbing Services",
      rating: 4.9,
      price: 2000,
    },
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



          {/* Divider */}

          <span className="hidden sm:block mx-4 text-gray-300">|</span>

          {/* Customers */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">1M+ Customers</span>
          </div>
          {/* Divider */}
          <span className="hidden sm:block mx-4 text-gray-300">|</span>

          {/* Helpers */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
            <UserCog className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">120+ Helpers</span>
          </div>
        </div>
      </section>


      {/* Complete Services Section */}
      <section className="bg-blue-50 mt-10 py-10 px-6 md:px-12">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Complete Home Care Under One Roof!
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {allServices.map((service, i) => (
            <Link
              key={i}
              to={service.path}
              className="flex flex-col items-center text-center p-4 hover:shadow-md transition"
            >
              <div className="w-20 h-20 flex items-center justify-center mb-3">
                <img
                  src={service.img}
                  alt={service.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-sm sm:text-base font-medium text-gray-700">
                {service.title}
              </p>
            </Link>
          ))}
        </div>

      </section>

      {/* Image Slider Section */}
      <section className="py-10 px-6 md:px-12">
        <h2 className="text-left text-base sm:text-2xl md:text-xl font-bold text-gray-800 mb-8">
          Top Services Demanded by Customer
        </h2>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {sliderServices.map((service, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-2xl overflow-hidden hover:shadow-xl transition">
                {/* Image container */}
                <div className="relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Rating badge */}
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-yellow-500"
                    >
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.172L12 18.896l-7.335 3.873 1.401-8.172L.132 9.21l8.2-1.192z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-700">
                      {service.rating}
                    </span>
                  </div>
                </div>

                {/* Text below image */}
                <div className="p-3 text-start">
                  <h3 className="text-base font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                  <p className="text-sm font-medium text-blue-600 mt-1">
                    ₹{service.price} INR
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* Services Promo Section */}

      <section className="py-12 px-6 md:px-12 bg-[#EDE0D4] rounded-2xl mx-4 md:mx-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">

          {/* Left side - Text */}
          <div className="relative space-y-4 pb-5 md:pb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-[#774936]">
              Relieve body pain & relax
              <span className="text-2xl md:text-3xl font-bold text-[#774936]">with Ayurveda massage  </span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg">

            </p>
            <div className="flex justify-center mt-10">
              <button className="bg-[#252525] text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition">
                Book Now
              </button>
            </div>


            {/* Plant Image (responsive size, stays bottom) */}
            <div className="absolute -left-1/5  mb-8">
              <img
                src={plant}
                alt="Decorative Plant"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-48 md:h-48 object-contain "
              />
            </div>
          </div>

          {/* Right side - Main Image */}
          <div className="w-full flex justify-center md:justify-end">
            <img
              src={massageService}
              alt="Deep Cleaning Service"
              className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto object-cover "
            />
          </div>
        </div>
      </section>
      {/* Services Boxes Section */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-left mb-10">
          <h2 className="text-xl md:text-xl font-bold text-[#252525]">
            for your Hygiene
          </h2>

        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Box 1 */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={hygiene1}
              alt="Service 1"
              className="w-full h-64 object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
              <h3 className="text-white text-lg font-bold">Your Kitchen Deserves a <br /> Deep Clean Shine</h3>
              <p className="text-white">-by our experts</p>
              <button className="bg-[#FFFFFF] text-black font-semibold w-28 py-2 rounded-xl shadow-md transition hover:bg-[#333]">
                Book Now
              </button>

            </div>
          </div>

          {/* Box 2 */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={hygiene2}
              alt="Service 2"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
              <h3 className="text-white text-lg font-bold">Kick Odors & Germs <br />Out for Good!</h3>
              <p className="text-white">-by our experts</p>
              <button className="bg-[#FFFFFF] text-black font-semibold w-28 py-2 rounded-xl shadow-md transition hover:bg-[#333]">
                Book Now
              </button>

            </div>
          </div>

          {/* Box 3 */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={hygiene3}
              alt="Service 3"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
              <h3 className="text-white text-lg font-bold">Full Home Cleaning,<br /> Handled by Pros.</h3>
              <p className="text-white">By Trained Cleaning Ninjas</p>
              <button className="bg-[#FFFFFF] text-black font-semibold w-28 py-2 rounded-xl shadow-md transition hover:bg-[#333]">
                Book Now
              </button>

            </div>
          </div>

        </div>
      </section>
      <section className="py-12 px-6 md:px-12">
        <h2 className="text-2xl md:text-xl font-bold text-left mb-8">Cleaning and pest control</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Box 1 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={cleaning1}
              alt="Service 1"
              className="w-full h-80 object-cover"  // h-72 makes it tall
            />
            <div className="absolute inset-0  items-center justify-center">

            </div>
          </div>

          {/* Box 2 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={cleaning1}
              alt="Service 2"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">

            </div>
          </div>

          {/* Box 3 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={cleaning3}
              alt="Service 3"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">

            </div>
          </div>

          {/* Box 4 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={cleaning3}
              alt="Service 4"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0  flex items-center justify-center">

            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-6 md:px-12">
        <h2 className="text-2xl md:text-xl font-bold text-left mb-8">Appliance Repair</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Box 1 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={repair1}
              alt="Service 1"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0  flex items-center justify-center">

            </div>
          </div>

          {/* Box 2 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={repair2}
              alt="Service 2"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 items-center justify-center">

            </div>
          </div>

          {/* Box 3 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={repair3}
              alt="Service 3"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">

            </div>
          </div>

          {/* Box 4 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={repair4}
              alt="Service 4"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <span className="text-white text-xl font-semibold">Service 4</span> */}
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-40 px-6 md:px-12 bg-[#F1F1E6] rounded-2xl">
        {/* Center Text */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="text-gray-600 text-xl font-semibold">
            From Sparkling Kitchens to sanitized bathrooms, deep-cleaned sofas to spotless floors — we do it all, so you don’t have to!
          </p>
        </div>

        {/* Bottom Images */}
        <div className="absolute bottom-0 left-0 w-24 sm:w-32 md:w-40 lg:w-56">
          <img
            src={homeLeft}
            alt="Left Decoration"
            className="w-full h-auto"
          />
        </div>

        <div className="absolute bottom-0 right-0 w-24 sm:w-32 md:w-40 lg:w-56">
          <img
            src={homeRight}
            alt="Right Decoration"
            className="w-full h-auto"
          />
        </div>
      </section>
      <section className="py-12 px-6 md:px-12">
        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-bold mb-8">New on Apna Labour</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white  overflow-hidden">
            <div className="relative">
              <img
                src={garden1}
                alt="Lawn Care"
                className="w-full h-72 object-cover"
              />
              <button className="absolute -bottom-5  left-1/2 -translate-x-1/2 bg-[#003049] text-white font-semibold px-2 py-2 rounded-md shadow-md hover:bg-[#002233] transition">
                Start From ₹200
              </button>
            </div>
            <div className="p-7 text-center">
              <h3 className="text-gray-800 font-medium">Lawn Care</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white  overflow-hidden">
            <div className="relative">
              <img
                src={garden2}
                alt="Gardening & Plant Care Services"
                className="w-full h-72  object-cover"
              />
              <button className="absolute -bottom-5  left-1/2 -translate-x-1/2 bg-[#003049] text-white font-semibold px-2 py-2 rounded-md shadow-md hover:bg-[#002233] transition">
                Start From ₹300
              </button>
            </div>
            <div className="p-7 text-center">
              <h3 className="text-gray-800 font-medium">Gardening & Plant Care Services</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white  overflow-hidden">
            <div className="relative">
              <img
                src={garden3}
                alt="Ayurveda Massage for Men & Women"
                className="w-full h-72  object-cover"
              />
              <button className="absolute -bottom-5  left-1/2 -translate-x-1/2 bg-[#003049] text-white font-semibold px-2 py-2 rounded-md shadow-md hover:bg-[#002233] transition">
                Start From ₹500
              </button>
            </div>
            <div className="p-7 text-center">
              <h3 className="text-gray-800 font-medium">Ayurveda Massage for Men & Women</h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white  overflow-hidden">
            <div className="relative">
              <img
                src={cleaning2}
                alt="Home Cleaning"
                className="w-full h-72  object-cover"
              />
              <button className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#003049] text-white font-semibold px-2 py-2 rounded-md shadow-md hover:bg-[#002233] transition">
                Start From ₹400
              </button>
            </div>
            <div className="p-7 text-center">
              <h3 className="text-gray-800 font-medium">Home Cleaning</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 md:px-12 bg-[#86A8E71A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">

          {/* Left Side - Text */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#024A6F]">
              Booking Your Service In 3 Steps.
            </h2>
            <ul className="space-y-4 text-[#024A6F] text-lg font-medium">
              <li className="flex items-start gap-3">
                <span className="bg-[#86A8E780] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">1</span>
                <p>Check the fixed  price before booking</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-[#86A8E780] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">2</span>
                <p>Pick a time ot get a helper in 30 minutes.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-[#86A8E780] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">3</span>
                <p>Track your helper in real time on the map.</p>
              </li>
            </ul>
            <button className="bg-[#003049] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#002233] transition">
              Get the App
            </button>
          </div>

          {/* Right Side - Images */}
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* Box 1 */}
            <div className="flex flex-col items-center">
              <img
                src={booking1}
                alt="Living Room Cleaning"
                className="w-56 h-80 object-cover rounded-2xl shadow" // smaller size
              />

            </div>

            {/* Box 2 (lifted up & smaller) */}
            <div className="flex flex-col items-center -mt-10"> {/* 🔥 moved upwards */}
              <img
                src={booking2}
                alt="Repair Sink Leak"
                className="w-52 h-72 object-cover rounded-2xl shadow" // a bit smaller
              />

            </div>

            {/* Box 3 */}
            <div className="flex flex-col items-center">
              <img
                src={booking3}
                alt="Repair Switch board"
                className="w-56 h-80 object-cover rounded-2xl shadow" // smaller size
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-6 md:px-12">
        <h2 className="text-2xl md:text-xl font-bold text-left mb-8">Home Repair & Installation</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Box 1 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={installation1}
              alt="Service 1"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0  flex items-center justify-center">

            </div>
          </div>

          {/* Box 2 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={installation2}
              alt="Service 2"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 items-center justify-center">

            </div>
          </div>

          {/* Box 3 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={installation3}
              alt="Service 3"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">

            </div>
          </div>

          {/* Box 4 */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <img
              src={installation4}
              alt="Service 4"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <span className="text-white text-xl font-semibold">Service 4</span> */}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#FFF3F0] py-12 px-6 md:px-16 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 relative z-10">
          {/* Left Content */}
          <div className="md:w-2/2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#024A6F] mb-6">
              Trusted Local Professionals
            </h2>

            {/* Point 1 */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-6 h-6 flex items-center justify-center bg-[#FF789180] text-white rounded-full font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#024A6F]">
                  Fully Verified Professionals
                </h3>
                <p className="text-[#024A6F]">
                  Interview, background checks and ongoing quality control—every pro goes
                  through a rigorous selection process.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-6 h-6 flex items-center justify-center bg-[#FF789180] text-white rounded-full font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#024A6F]">
                  Real and Verified Reviews
                </h3>
                <p className="text-[#024A6F]">
                  Our algorithms select the highest-rated, most experienced professionals
                  near you to ensure top-quality service every time.
                </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-6 h-6 flex items-center justify-center bg-[#FF789180] text-white rounded-full font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#024A6F]">
                  Human Support, In Real Time
                </h3>
                <p className="text-[#024A6F]">
                  Our team monitors every job in real time and is available 24/7 to help
                  with any issue or question.
                </p>
              </div>
            </div>

            {/* Button */}
            <button className="bg-[#003049] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#002233] transition">
              Get the App
            </button>
          </div>
        </div>

        {/* Bottom Image */}
        <div className="absolute bottom-0 right-6 md:right-16">
          <img
            src={trust}
            alt="Trusted Professional"
            className="w-[500px] h-auto object-contain"
          />
        </div>
      </section>
      <section className="relative bg-gradient-to-r from-[#282D45] to-[#203043] text-white py-16 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between relative z-10">

          {/* Left Content */}
          <div className="md:w-1/1 text-center md:text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Instant Recommendations, <br className="hidden md:block" />
              Powered by AI & Our Expert Advisors.
            </h2>

            <p className="text-lg text-gray-300">
              Get the best personalized support with our AI-powered system and expert
              human advisors available 24/7 to guide you.
            </p>
            <button className="bg-[#252525] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-200 transition border border-gray-50">
              Chat Now
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/3 flex justify-center relative">
            <img
              src={contact} // 👉 replace with your image import
              alt="Advisor"
              className="relative top-15 right-6 md:right-16 "
            />
          </div>
        </div>
      </section>
      <section className="bg-[#1a1446] py-6 px-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Newsletter */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-orange-400 to-pink-500">
            <FaEnvelope className="text-white w-6 h-6" />
          </div>

          {/* Text + Input */}
          <div className="flex flex-col gap-2">
            <p className="text-white text-sm md:text-base">
              Get Instant Offers & Deals On Your Inbox
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email ex:abc@yahoo.com"
                className="px-4 py-2 rounded-l-lg border border-gray-400 bg-transparent text-white text-sm outline-none placeholder-gray-400 w-64"
              />
              <button className="px-4 py-2 rounded-r-lg border border-gray-400 text-white text-sm font-semibold hover:bg-pink-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Social Links */}
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <span className="text-white text-sm">Social Links</span>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-pink-500">
              < FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-pink-500">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-pink-500">
              <FaWhatsapp className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-pink-500">
              <FaLinkedinIn className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
