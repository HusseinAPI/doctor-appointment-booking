import Image from 'next/image';

export default function DoctorCard({
  doctorSelected,
}: {
  doctorSelected: [] | null;
}) {
  return (
    <div className="flex bg-white rounded-2xl shadow-md p-6 w-1/2">
      <div className="flex items-center w-9/12">
        <Image
          src={doctorSelected?.imageUrl}
          alt="doctor"
          className="rounded-xl w-96 h-80"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-wrap p-2">
        <div className="w-full">
          <h2 className="text-lg font-semibold">{doctorSelected?.name}</h2>
          <span className="text-sm text-gray-500">
            {doctorSelected?.specialization}
          </span>
        </div>
        <span className="text-sm italic text-gray-600">
          {doctorSelected?.bio}
        </span>
      </div>
    </div>
  );
}
