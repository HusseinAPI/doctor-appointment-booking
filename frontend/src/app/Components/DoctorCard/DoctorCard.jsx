import Image from 'next/image';

export default function DoctorCard({ doctorSelected }) {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md p-4 sm:w-11/12 md:w-10/12 lg:w-1/2">
      {/* Image Section */}
      <div className="flex justify-center md:justify-start items-center md:w-1/2 mb-4 md:mb-0">
        <Image
          src={doctorSelected?.imageUrl || '/default-doctor.png'}
          alt="doctor"
          className="rounded-xl w-64 h-64 object-cover"
          width={256}
          height={256}
        />
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 flex flex-col justify-center gap-2 px-2">
        <h2 className="text-lg font-semibold">{doctorSelected?.name}</h2>
        <span className="text-sm text-gray-500">
          {doctorSelected?.specialization}
        </span>
        <span className="text-sm italic text-gray-600">
          {doctorSelected?.bio}
        </span>
      </div>
    </div>
  );
}
