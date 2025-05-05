import { motion } from "motion/react";
const images = [
  "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1668383207771-dcf6e2d520f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1663076211121-36754a46de8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1517456215183-9a2c3a748d0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1hcnJpYWdlfGVufDB8fDB8fHww",
];

const Carousel = () => {
  return (
    <div className="overflow-hidden w-[90%] py-5 h-96 my-10 flex justify-center items-center mx-auto relative">
      <div className="absolute h-full w-10 bg-linear-to-r from-[#fceeec] to-transparent z-20 start-0"></div>
      <div className="absolute h-full w-10 bg-linear-to-l from-[#fceeec] to-transparent z-20 end-0"></div>

      <motion.div
        className="whitespace-nowrap flex gap-6 items-center justify-items-center p-2 "
        animate={{
          x: [0, -800],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 5,
            ease: "linear",
          },
        }}
      >
        {[...images, ...images].concat(images).map((src, idx) => (
          <motion.div
            key={idx}
            className={
              "flex-shrink-0 w-64 h-96 flex items-center overflow-hidden"
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <img
              src={src}
              alt={`Image ${idx}`}
              className={`w-full ${
                idx % 2 === 0 ? "h-full" : "h-[64%]"
              } object-cover rounded-sm`}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;
