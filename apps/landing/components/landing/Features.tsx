import {
  MessageSquare,
  Brain,
  TestTube,
  FileText,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { useFormatMessage } from '@/hooks/intl';

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  gradient: string;
};

const Features = () => {
  const intl = useFormatMessage();

  const features = [
    {
      icon: MessageSquare,
      title: intl('home/features/1/title'),
      description: intl('home/features/1/description'),
      details: [
        intl('home/features/1/detail-1'),
        intl('home/features/1/detail-2'),
        intl('home/features/1/detail-3'),
      ],
      gradient: 'from-primary to-accent',
    },
    {
      icon: Brain,
      title: intl('home/features/2/title'),
      description: intl('home/features/2/description'),
      details: [
        intl('home/features/2/detail-1'),
        intl('home/features/2/detail-2'),
        intl('home/features/2/detail-3'),
      ],
      gradient: 'from-secondary to-primary',
    },
    {
      icon: TestTube,
      title: intl('home/features/3/title'),
      description: intl('home/features/3/description'),
      details: [
        intl('home/features/3/detail-1'),
        intl('home/features/3/detail-2'),
        intl('home/features/3/detail-3'),
      ],
      gradient: 'from-accent to-secondary',
    },
    {
      icon: FileText,
      title: intl('home/features/4/title'),
      description: intl('home/features/4/description'),
      details: [
        intl('home/features/4/detail-1'),
        intl('home/features/4/detail-2'),
        intl('home/features/4/detail-3'),
      ],
      gradient: 'from-primary to-secondary',
    },
    {
      icon: Zap,
      title: intl('home/features/5/title'),
      description: intl('home/features/5/description'),
      details: [
        intl('home/features/5/detail-1'),
        intl('home/features/5/detail-2'),
        intl('home/features/5/detail-3'),
      ],
      gradient: 'from-secondary to-accent',
    },
    {
      icon: TrendingUp,
      title: intl('home/features/6/title'),
      description: intl('home/features/6/description'),
      details: [
        intl('home/features/6/detail-1'),
        intl('home/features/6/detail-2'),
        intl('home/features/6/detail-3'),
      ],
      gradient: 'from-accent to-primary',
    },
  ];

  return (
    <section
      id="features"
      className="py-24 max-w-5xl mx-auto relative overflow-hidden"
      dir="rtl"
    >
      <BackgroundDecor />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader />
        <FeaturesGrid features={features} />
      </div>
    </section>
  );
};

const BackgroundDecor = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
);

const SectionHeader = () => {
  const intl = useFormatMessage();

  return (
    <div className="text-right mb-16 space-y-4 max-w-3xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
        <span className="text-sm font-semibold text-primary">
          {intl('home/features/section-tag')}
        </span>
        <Zap className="w-4 h-4 text-primary" />
      </div>

      <h2 className="text-4xl md:text-5xl font-bold">
        <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
          {intl('home/features/section-title-1')}
        </span>
        <br />
        <span className="text-foreground">
          {intl('home/features/section-title-2')}
        </span>
      </h2>

      <p className="text-xl text-muted-foreground">
        {intl('home/features/section-subtitle')}
      </p>
    </div>
  );
};

const FeaturesGrid: React.FC<{
  features: Feature[];
}> = ({ features }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {features.map((feature, index) => (
      <FeatureCard key={index} feature={feature} />
    ))}
  </div>
);

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <div className="group glass-strong p-8 rounded-3xl hover:glow-medical transition-all duration-500 hover:scale-[1.02]">
    <FeatureIcon icon={feature.icon} gradient={feature.gradient} />

    <FeatureTitle title={feature.title} description={feature.description} />

    <FeatureDetails details={feature.details} />

    <HoverLine gradient={feature.gradient} />
  </div>
);

const FeatureIcon: React.FC<{ icon: React.ElementType; gradient: string }> = ({
  icon: Icon,
  gradient,
}) => (
  <div
    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} mb-6 glow-medical`}
  >
    <Icon className="w-7 h-7 text-white" />
  </div>
);

const FeatureTitle: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="space-y-3 mb-6">
    <h3 className="text-xl font-bold text-foreground leading-tight">{title}</h3>
    <p className="text-sm text-primary font-medium">{description}</p>
  </div>
);

const FeatureDetails: React.FC<{ details: string[] }> = ({ details }) => (
  <ul className="space-y-3">
    {details.map((detail, idx) => (
      <li key={idx} className="flex items-start gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
        <span className="text-sm text-muted-foreground leading-relaxed">
          {detail}
        </span>
      </li>
    ))}
  </ul>
);

const HoverLine: React.FC<{ gradient: string }> = ({ gradient }) => (
  <div
    className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-l ${gradient} rounded-full mt-6`}
  />
);

export default Features;
