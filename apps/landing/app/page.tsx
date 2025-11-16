import CTA from '@/components/landing/CTA';
import Features from '@/components/landing/Features';
import Hero from '@/components/landing/Hero';
import Story from '@/components/landing/Story';
import Value from '@/components/landing/Value';

const Page = () => {
  return (
    <div className="min-h-screen" dir="rtl">
      <Hero />
      <Value />
      <Features />
      <Story />
      <CTA />
    </div>
  );
};

export default Page;
