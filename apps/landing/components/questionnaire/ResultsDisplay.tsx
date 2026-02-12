import { QuestionnaireResult } from './types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, TrendingUp, ArrowLeft } from 'lucide-react';
import { useFormatMessage } from '@/hooks/intl';

interface ResultsDisplayProps {
  result: QuestionnaireResult;
  onBetaSignup: () => void;
  onNewsletterSignup: () => void;
}

const ScoreCard = ({ result }: { result: QuestionnaireResult }) => {
  const intl = useFormatMessage();

  const getCategoryColor = () => {
    switch (result.category) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'primary';
    }
  };

  const getCategoryIcon = () => {
    switch (result.category) {
      case 'high':
        return <AlertCircle className="w-8 h-8" />;
      case 'medium':
        return <TrendingUp className="w-8 h-8" />;
      case 'low':
        return <CheckCircle2 className="w-8 h-8" />;
    }
  };

  const getCategoryTitleKey = () => {
    switch (result.category) {
      case 'high':
        return 'resultsDisplay/scoreCard/highTitle';
      case 'medium':
        return 'resultsDisplay/scoreCard/mediumTitle';
      case 'low':
        return 'resultsDisplay/scoreCard/lowTitle';
    }
  };

  return (
    <div className="glass-strong p-10 md:p-12 rounded-3xl text-center space-y-6 glow-medical">
      <div
        className={`inline-flex p-6 rounded-2xl bg-${getCategoryColor()}/10 glow-medical`}
      >
        <div className={`text-${getCategoryColor()}`}>{getCategoryIcon()}</div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          {intl('resultsDisplay/scoreCard/title', {
            totalScore: result.totalScore,
          })}
        </h2>
        <div
          className={`inline-block px-6 py-3 bg-${getCategoryColor()}/10 rounded-full`}
        >
          <span className={`text-lg font-semibold text-${getCategoryColor()}`}>
            {intl(getCategoryTitleKey())}
          </span>
        </div>
      </div>

      <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        {result.feedback}
      </p>
    </div>
  );
};

const ActionCard = ({
  result,
  onBetaSignup,
  onNewsletterSignup,
}: {
  result: QuestionnaireResult;
  onBetaSignup: () => void;
  onNewsletterSignup: () => void;
}) => {
  const intl = useFormatMessage();

  if (result.category === 'high' || result.category === 'medium') {
    return (
      <div className="glass p-8 md:p-10 rounded-3xl space-y-6 border-2 border-primary/20">
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-primary">
            {intl('resultsDisplay/actionCard/high/medium/header')}
          </h3>
          <p className="text-lg text-muted-foreground">{result.action}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            variant="hero"
            size="lg"
            onClick={onBetaSignup}
            className="text-lg px-8 group"
          >
            <span>
              {intl('resultsDisplay/actionCard/high/medium/confirmButton')}
            </span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onNewsletterSignup}
            className="text-lg"
          >
            {intl('resultsDisplay/actionCard/high/medium/cancelButton')}
          </Button>
        </div>

        <div className="text-center pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            {result.category === 'high'
              ? intl('resultsDisplay/actionCard/high/note')
              : intl('resultsDisplay/actionCard/medium/note')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-8 md:p-10 rounded-3xl space-y-6">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-foreground">
          {intl('resultsDisplay/actionCard/low/header')}
        </h3>
        <p className="text-lg text-muted-foreground">
          {intl('resultsDisplay/actionCard/low/description')}
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <Button
          variant="default"
          size="lg"
          onClick={onNewsletterSignup}
          className="text-lg px-8"
        >
          {intl('resultsDisplay/actionCard/low/button')}
        </Button>
      </div>
    </div>
  );
};

const InsightsCard = ({ result }: { result: QuestionnaireResult }) => {
  const intl = useFormatMessage();

  const categoryEmoji =
    result.category === 'high'
      ? '🔥'
      : result.category === 'medium'
        ? '📈'
        : '✅';

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="glass p-6 rounded-2xl text-center">
        <div className="text-3xl font-bold text-primary mb-2">
          {result.totalScore}
        </div>
        <p className="text-sm text-muted-foreground">
          {intl('resultsDisplay/insights/needPoints')}
        </p>
      </div>
      <div className="glass p-6 rounded-2xl text-center">
        <div className="text-3xl font-bold text-secondary mb-2">
          {Math.round((result.totalScore / 18) * 100)}%
        </div>
        <p className="text-sm text-muted-foreground">
          {intl('resultsDisplay/insights/needPercentage')}
        </p>
      </div>
      <div className="glass p-6 rounded-2xl text-center">
        <div className="text-3xl font-bold text-accent mb-2">
          {categoryEmoji}
        </div>
        <p className="text-sm text-muted-foreground">
          {intl('resultsDisplay/insights/category')}
        </p>
      </div>
    </div>
  );
};

const ResultsDisplay = ({
  result,
  onBetaSignup,
  onNewsletterSignup,
}: ResultsDisplayProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in" dir="rtl">
      <ScoreCard result={result} />
      <ActionCard
        result={result}
        onBetaSignup={onBetaSignup}
        onNewsletterSignup={onNewsletterSignup}
      />
      <InsightsCard result={result} />
    </div>
  );
};

export default ResultsDisplay;
