import React from "react";

const imageData = [
  "https://plus.unsplash.com/premium_photo-1681426327290-1ec5fb4d3dd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1681483433432-6ecefcb15daf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvb2wlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://media.istockphoto.com/id/1342849839/photo/beautiful-afro-woman-with-pigtails-and-stylish-clothes.jpg?s=2048x2048&w=is&k=20&c=Q6Getq3lXBjWgIkANBgk4bipDj2IsjjlUGwKnI4X0YA=",
  "https://plus.unsplash.com/premium_photo-1673288399224-5d0ddc581fd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNvb2wlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
];

const AboutPage: React.FC = () => {
  return (
    <section className="w-full px-6 md:px-16 py-20 bg-gray-50 font-MonaSans"> 
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Left Text Content */}
      <div className="text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-8">
        We’re changing <br /> the way people <br /> connect
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
        At Clickofy Studio, we're passionate about capturing life's precious moments. Our team of skilled photographers brings creativity and technical expertise to every shoot. Whether it's weddings, portraits, or commercial work, we strive to tell your unique story through stunning imagery that will be treasured for generations to come.
        </p>
      </div>

      {/* Right Image Grid */}
      <div className="grid grid-cols-2 gap-8">
        {imageData.map((src, index) => (
        <div key={index} className="rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
          <img
          src={src}
          alt={`People connect ${index + 1}`}
          className="w-full h-full object-cover"
          />
        </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default AboutPage;
