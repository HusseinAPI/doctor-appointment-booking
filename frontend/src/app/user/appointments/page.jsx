import DoctorsPageClient from '@/app/Components/DoctorsPageClient/DoctorsPageClient';
import { getDoctorsFromAPI } from '@/app/lib/api/getDoctors';

const Page = async () => {
  const doctors = await getDoctorsFromAPI();
  return <DoctorsPageClient doctors={doctors} />;
};

export default Page;
