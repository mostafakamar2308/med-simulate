import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useFormatMessage } from '@/hooks/intl';

const CTA = () => {
  const intl = useFormatMessage();

  const benefits: string[] = [
    intl('home/cta/benefit-1'),
    intl('home/cta/benefit-2'),
    intl('home/cta/benefit-3'),
    intl('home/cta/benefit-4'),
  ];

  return (
    <section className="py-32 relative overflow-hidden" dir="rtl">
      <Background />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <MainCard benefits={benefits} />
          <BottomText />
        </div>
      </div>
    </section>
  );
};

const Background = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" />
    </div>
  </>
);

const MainCard: React.FC<{ benefits: string[] }> = ({ benefits }) => {
  return (
    <div className="glass-strong p-12 md:p-16 rounded-3xl text-center space-y-8 glow-medical-strong">
      <Badge />

      <Headline />

      <Benefits benefits={benefits} />

      <CTAButton />
    </div>
  );
};

const Badge = () => {
  const intl = useFormatMessage();

  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-primary to-secondary rounded-full text-white">
        <Sparkles className="w-5 h-5" />
        <span className="font-bold">{intl('home/cta/badge')}</span>
        <Sparkles className="w-5 h-5" />
      </div>
    </div>
  );
};

const Headline = () => {
  const intl = useFormatMessage();

  return (
    <div className="space-y-4">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        <span className="text-foreground">{intl('home/cta/headline-1')}</span>
        <br />
        <span className="bg-gradient-to-l from-primary via-accent to-secondary bg-clip-text text-transparent">
          {intl('home/cta/headline-2')}
        </span>
      </h2>

      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {intl('home/cta/subtext')}
      </p>
    </div>
  );
};

const Benefits: React.FC<{ benefits: string[] }> = ({ benefits }) => (
  <div className="grid md:grid-cols-2 gap-4 py-8">
    {benefits.map((b, i) => (
      <div
        key={i}
        className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-primary/20 text-right hover:border-primary/50 transition-colors"
      >
        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
        <span className="text-foreground font-medium">{b}</span>
      </div>
    ))}
  </div>
);

const CTAButton = () => {
  const intl = useFormatMessage();

  return (
    <div className="pt-4">
      <div className="flex flex-wrap gap-8 justify-center">
        <Link href="/questionnaire">
          <Button
            variant="hero"
            size="lg"
            className="text-xl px-12 py-8 h-auto group"
          >
            <span>{intl('home/cta/button-1')}</span>
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link href="/register">
          <Button
            variant="glass"
            size="lg"
            className="text-xl px-12 py-8 h-auto group"
          >
            <span>{intl('home/cta/button-2')}</span>
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <div className="hidden lg:flex items-center justify-center gap-2 mt-6 text-muted-foreground">
        <span className="text-sm">⏱️</span>
        <p className="text-sm">{intl('home/cta/time-info')}</p>
      </div>
    </div>
  );
};

const BottomText = () => {
  const intl = useFormatMessage();

  return (
    <div className="text-center mt-12 space-y-4">
      <p className="text-2xl md:text-3xl font-bold text-foreground">
        {intl('home/logo')}
      </p>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {intl('home/cta/bottom-text')}
      </p>
    </div>
  );
};

export default CTA;
