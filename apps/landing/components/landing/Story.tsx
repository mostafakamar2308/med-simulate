import { AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import { useFormatMessage } from '@/hooks/intl';

type Benefit = {
  title: string;
  description: string;
  color: string;
};

type Reality = string;

const Story = () => {
  const intl = useFormatMessage();

  const realities: Reality[] = [
    intl('home/story/reality-1'),
    intl('home/story/reality-2'),
    intl('home/story/reality-3'),
    intl('home/story/reality-4'),
  ];

  const benefits: Benefit[] = [
    {
      title: intl('home/story/benefit-1/title'),
      description: intl('home/story/benefit-1/description'),
      color: 'primary',
    },
    {
      title: intl('home/story/benefit-2/title'),
      description: intl('home/story/benefit-2/description'),
      color: 'secondary',
    },
    {
      title: intl('home/story/benefit-3/title'),
      description: intl('home/story/benefit-3/description'),
      color: 'accent',
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-medical relative overflow-hidden"
      dir="rtl"
    >
      <BackgroundDecor />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Header />
          <RealityCheck realities={realities} />
          <SolutionStatement benefits={benefits} />
        </div>
      </div>
    </section>
  );
};

const BackgroundDecor = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/4 right-0 w-96 h-96 bg-destructive/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
  </div>
);

const Header = () => {
  const intl = useFormatMessage();

  return (
    <div className="text-right mb-12 space-y-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
        <span className="text-sm font-semibold text-destructive">
          {intl('home/story/header-tag')}
        </span>
        <Lightbulb className="w-4 h-4 text-destructive" />
      </div>

      <h2 className="text-2xl md:text-5xl font-bold leading-tight">
        <span className="text-foreground">
          {intl('home/story/header-title-1')}
        </span>
        <br />
        <span className="text-destructive">
          {intl('home/story/header-title-2')}
        </span>
      </h2>
    </div>
  );
};

const RealityCheck: React.FC<{ realities: Reality[] }> = ({ realities }) => {
  const intl = useFormatMessage();

  return (
    <div className="glass-strong p-8 md:p-12 rounded-3xl mb-8 border-2 border-destructive/20">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-destructive/10 rounded-xl">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {intl('home/story/reality-title')}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {realities.map((reality, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-5 bg-destructive/5 rounded-xl border border-destructive/10"
          >
            <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-destructive">
                {index + 1}
              </span>
            </div>
            <p className="text-foreground leading-relaxed">{reality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SolutionStatement: React.FC<{ benefits: Benefit[] }> = ({ benefits }) => {
  const intl = useFormatMessage();

  return (
    <div className="glass p-8 md:p-12 rounded-3xl glow-medical border-2 border-primary/20">
      <div className="flex items-start gap-4 justify-end mb-6">
        <div className="flex-1 space-y-4">
          <h3 className="text-xl md:text-3xl font-bold text-primary leading-tight">
            {intl('home/story/solution-title')}
          </h3>
          <p className="text-xl text-foreground font-semibold">
            {intl('home/story/solution-subtitle')}
          </p>
        </div>
        <div className="p-4 bg-primary/10 rounded-2xl shrink-0 glow-medical">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-primary/20">
        {benefits.map((b, idx) => (
          <div key={idx} className="text-center p-4">
            <div className={`text-3xl font-bold text-${b.color} mb-2`}>
              {b.title}
            </div>
            <p className="text-sm text-muted-foreground">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Story;
