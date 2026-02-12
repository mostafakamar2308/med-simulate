import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-medical.jpg';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/landing/Header';
import { useFormatMessage } from '@/hooks/intl';

const Hero = () => {
  const intl = useFormatMessage();
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="grid px-4 py-20 relative z-10 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-right lg:order-1">
          <Heading />
          <p className="text-xl text-center lg:text-right md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            {intl('home/hero/description_part1')} <br />
            <span className="text-foreground font-medium">
              {intl('home/hero/description_part2')}
            </span>
          </p>
          <HeroCTA />
        </div>

        <div className="relative lg:order-2">
          <div className="relative rounded-3xl overflow-hidden glass-strong p-4 glow-medical-strong">
            <Image
              src={heroImage}
              alt="Medical simulation interface"
              className="w-full h-auto rounded-2xl"
            />
            <HeroOverlay className="top-8 left-8" title="HR" value="72 bpm" />
            <HeroOverlay
              className="bottom-8 right-8"
              title="Hb"
              delay={true}
              value="12.5 g/dl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Heading = () => {
  const intl = useFormatMessage();
  return (
    <div className="space-y-6">
      <h1 className="text-4xl text-center lg:text-right md:text-6xl lg:text-7xl font-bold flex flex-col gap-4">
        <span className="text-primary">{intl('home/hero/headline_part1')}</span>
        <span className="text-foreground">
          {intl('home/hero/headline_part2')}
        </span>
      </h1>

      <div className="flex items-center justify-center text-center lg:justify-end gap-2 text-muted-foreground">
        <Sparkles className="w-5 h-5 hidden lg:block text-primary" />
        <span className="text-lg">{intl('home/hero/tagline')}</span>
      </div>
    </div>
  );
};

const HeroOverlay: React.FC<{
  title: string;
  value: string;
  className: string;
  delay?: boolean;
}> = ({ title, value, className, delay }) => {
  return (
    <div
      dir="ltr"
      style={{ animationDelay: delay ? '1s' : '0s' }}
      className={`absolute ${className} bg-white p-2 lg:p-4 rounded-xl animate-float`}
    >
      <div className="text-xs text-muted-foreground mb-1">{title}</div>
      <div className="text-lg lg:text-2xl font-bold text-primary">{value}</div>
    </div>
  );
};

const HeroCTA = () => {
  const intl = useFormatMessage();

  return (
    <div className="pt-4 flex items-center lg:items-start flex-col">
      <Link href="/questionnaire">
        <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
          {intl('home/hero/get-started')}
        </Button>
      </Link>
      <p className="text-sm text-muted-foreground mt-3">
        {intl('home/hero/get-started/description')}
      </p>
    </div>
  );
};
export default Hero;
