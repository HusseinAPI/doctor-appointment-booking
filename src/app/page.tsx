import doctorImg from '../../public/doctor.png';

export default function Home() {
  return (
    <div className="flex bg-gradient-to-r from-blue-900 to-blue-600 w-full h-[500px]">
      <div className="flex justify-center w-1/2 mt-64 sm:mt-20 md:mt-40 lg:mt-48 xl:mt-14">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs></defs>
          <path
            fill="#FFFFFF"
            d="M46.2,-79.8C60.2,-71.9,72.1,-60.2,79.1,-46.3C86.1,-32.3,88.2,-16.2,88.2,0C88.3,16.2,86.2,32.4,79.4,46.7C72.6,60.9,61,73.4,47,81.6C33,89.9,16.5,94,0.2,93.6C-16.1,93.3,-32.2,88.5,-45.8,80C-59.4,71.5,-70.4,59.3,-78,45.3C-85.6,31.4,-89.7,15.7,-89.9,-0.1C-90,-15.9,-86.2,-31.7,-78.7,-45.8C-71.2,-59.9,-60,-72.3,-46.3,-80.3C-32.6,-88.3,-16.3,-92,-0.1,-91.8C16.1,-91.7,32.2,-87.7,46.2,-79.8Z"
            transform="translate(100 100)"
          />
          <image href={doctorImg.src} x="-15" y="10" width="250" height="250" />
        </svg>
      </div>
      <div className="mt-24 w-1/2  text-teal-50">
        <h1 className="text-6xl font-bold">
          The Best Reliable <br />
          Medical Service
        </h1>
        <span className="text-xl mt-2 block">
          Stay on top of your health by connecting with
          <br /> your doctor and easily schelduling a check-up
        </span>
        <button className="bg-yellow-50 hover:bg-yellow-200 text-blue-700 mt-4 px-5 py-2 rounded-md">
          Make an Appointment
        </button>
      </div>
    </div>
  );
}
