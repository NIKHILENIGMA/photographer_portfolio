import { FC, MouseEvent } from "react";
import { Carousel } from "../../components";
import { services, features } from "../../app/constants";

const HomePage: FC = () => {
  return (
    <div className="font-MonaSans">
      <section className="relative min-h-screen bg-gradient-to-br justify-center from-[#fef1ec] via-[#fbeeed] to-[#fdeeea] pb-10 text-black">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 relative">
          <span className="uppercase tracking-widest text-sm mb-4">
            The Best Photographer
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl z-10">
            THE BEST WAY TO <br /> CREATE YOUR <br /> PERSONAL PORTFOLIO
          </h1>

          {/* Background circle */}
          <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-[#f6d2ce] opacity-40 rounded-full -z-0"></div>
        </div>

        <Carousel />
      </section>
      <section className="bg-white py-20 px-6 md:px-16">
        {/* Top Heading */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-sm text-gray-500 mb-2">
            About Us
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-snug">
            I SEEK AUTHENTIC CONNECTION
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left Image */}
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1516961642265-531546e84af2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww"
              alt="Polaroid wall"
              className="w-full h-auto rounded-md object-cover shadow-sm"
            />
          </div>

          {/* Text Content */}
          <div className="text-gray-800 text-base md:text-lg leading-relaxed space-y-6">
            <p>
              Hey, We are Lype! We are full time destination wedding, elopement,
              couples photographer & business educator based in New York.
            </p>
            <p>
              I'm so excited to help capture all the moments you're always going
              to want to remember. My style is all about documenting your love
              in a natural and nostalgic way. I truly care to get to know you
              before we even start shooting. My hope is that you'll forget about
              the camera, leave with a new friend & beautiful effortless photos.
              Most importantly, I want to document your love for exactly the way
              it looks and feels so your memories can live on forever and ever.
            </p>
            <p>
              Hey, We are Lype! We are full time destination wedding, elopement,
              couples photographer & business educator based in New York.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1554080353-a576cf803bda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww"
              alt="Studio setup"
              className="w-full h-auto rounded-md object-cover shadow-sm"
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-20 px-6 md:px-16">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="uppercase text-sm text-gray-500 mb-2 tracking-widest">
            Service
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-snug">
            SERVICE WE PROVIDE
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-md shadow-md"
            >
              <img
                src={service.src}
                alt={service.alt}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              {service.label && (
                <div className="absolute inset-0 bg-black/40 bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl md:text-2xl font-semibold">
                    {service.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-20 px-6 md:px-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="uppercase text-sm text-gray-500 mb-2 tracking-widest">
            Features Work
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-snug">
            MY LATEST FEATURE WORK
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-none overflow-hidden shadow-lg group transition-transform duration-300 relative"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="bg-white p-2 md:p-5 absolute bottom-10 m-2">
                <div className="flex justify-between items-center text-sm font-semibold mb-2 text-gray-700">
                  <span>{item.title}</span>
                  <span>{item.date}</span>
                </div>
                <p className="text-sm text-gray-600/70 leading-snug">
                  {item.description}{" "}
                  <span
                    className="text-black font-medium cursor-pointer hover:underline"
                    onClick={(e: MouseEvent) => e.preventDefault()}
                  >
                    Show More
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
