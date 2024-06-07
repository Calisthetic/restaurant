import { useTranslations } from 'next-intl';
import Image from 'next/image';
import gallery1 from '../../../assets/gallery1.jpg'
import gallery2 from '../../../assets/gallery2.jpg'
import gallery3 from '../../../assets/gallery3.jpg'
import gallery4 from '../../../assets/gallery4.jpg'
import Footer from '@/components/footer';
import Header from '@/components/header/header';

export default function Gallery() {
  const t = useTranslations('gallery');

  return (
    <>
    <Header></Header>
    <main className='flex flex-col items-center'>
      <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full'>
        <h1 className='text-center my-16 text-xl sm:text-3xl lg:text-4xl font-bold italic font-minion'>{t("title")}</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20 px-4'>
          <div className='relative'>
            <Image src={gallery1} alt={t("image-1")} className='aspect-video'></Image>
            <div className='absolute top-full -translate-y-8 lg:-translate-y-10 bg-black/50 h-8 lg:h-10 
            text-white flex items-center justify-center font-medium w-full uppercase'>{t("image-1")}</div>
          </div>
          <div className='relative'>
            <Image src={gallery2} alt={t("image-2")} className='aspect-video'></Image>
            <div className='absolute top-full -translate-y-8 lg:-translate-y-10 bg-black/50 h-8 lg:h-10 
            text-white flex items-center justify-center font-medium w-full uppercase'>{t("image-2")}</div>
          </div>
          <div className='relative'>
            <Image src={gallery3} alt={t("image-3")} className='aspect-video'></Image>
            <div className='absolute top-full -translate-y-8 lg:-translate-y-10 bg-black/50 h-8 lg:h-10 
            text-white flex items-center justify-center font-medium w-full uppercase'>{t("image-3")}</div>
          </div>
          <div className='relative'>
            <Image src={gallery4} alt={t("image-4")} className='aspect-video'></Image>
            <div className='absolute top-full -translate-y-8 lg:-translate-y-10 bg-black/50 h-8 lg:h-10 
            text-white flex items-center justify-center font-medium w-full uppercase'>{t("image-4")}</div>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
    </>
  );
}