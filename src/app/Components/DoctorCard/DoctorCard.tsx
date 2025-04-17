import Image from 'next/image';
import doctor from '../../../../public/doctor104.jpg';

export default function DoctorCard() {
  return (
    <div className="flex bg-white rounded-2xl shadow-md p-6 w-1/2">
      <div className="flex items-center w-9/12">
        <Image
          src={doctor.src}
          alt="doctor"
          className="rounded-xl w-96 h-80"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-wrap p-2">
        <div className="w-full">
          <h2 className="text-lg font-semibold">Dr. Alexander Kimon</h2>
          <span className="text-sm text-gray-500">General Dentist</span>
        </div>
        <span className="text-sm italic text-gray-600">
          Best dental appointment I have had in years, seriously. I would
          highly...
        </span>
      </div>
    </div>
  );
}
