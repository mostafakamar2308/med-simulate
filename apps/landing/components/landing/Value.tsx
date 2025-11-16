import { useFormatMessage } from '@/hooks/intl';
import { AlertCircle, BookOpen, Stethoscope, Target } from 'lucide-react';
import { useMemo } from 'react';

const Value = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-right space-y-12">
          <Title />
          <Challenges />
          <Solution />
        </div>
      </div>
    </section>
  );
};

const Title = () => {
  const intl = useFormatMessage();
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
        <span className="text-sm font-semibold text-primary">
          {intl('home/value/title')}
        </span>
        <Target className="w-4 h-4 text-primary" />
      </div>

      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        <span className="text-foreground">{intl('home/logo')}</span>
        <br />
        <span className="text-primary">{intl('home/value/description')}</span>
      </h2>
    </div>
  );
};

const Challenges = () => {
  const intl = useFormatMessage();

  const challenges = useMemo(
    () => [
      intl('home/value/value-1'),
      intl('home/value/value-2'),
      intl('home/value/value-3'),
      intl('home/value/value-4'),
    ],
    [intl],
  );

  return (
    <div className="glass-strong p-8 md:p-12 rounded-3xl space-y-6">
      <div className="flex items-start gap-4 justify-end">
        <div className="flex-1 space-y-4">
          <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
            {intl('home/value/intro-title')}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {intl('home/value/intro-subtitle')}
            <br />
            {intl('home/value/intro-subtitle-2')}
          </p>
        </div>

        <div className="p-4 bg-destructive/10 rounded-2xl shrink-0">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 pt-4">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-border/50 hover:border-primary/50 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <span className="text-foreground">{challenge}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Solution = () => {
  const intl = useFormatMessage();

  return (
    <div className="glass p-8 md:p-12 rounded-3xl space-y-6 glow-medical">
      <div className="flex items-start gap-4 justify-end">
        <div className="flex-1 space-y-4">
          <p className="text-xl md:text-2xl font-bold text-primary leading-relaxed">
            {intl('home/value/solution-title')}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {intl('home/value/solution-subtitle')}
          </p>
        </div>
        <div className="p-4 bg-primary/10 rounded-2xl shrink-0 glow-medical">
          <Stethoscope className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              {intl('home/value/safe-training/title')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {intl('home/value/safe-training/description')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              {intl('home/value/flexibility/title')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {intl('home/value/flexibility/description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Value;
