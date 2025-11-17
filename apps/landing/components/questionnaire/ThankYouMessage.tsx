import { CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormatMessage } from '@/hooks/intl';

interface ThankYouMessageProps {
  isNewsletter?: boolean;
}

const ThankYouMessage = ({ isNewsletter = false }: ThankYouMessageProps) => {
  const intl = useFormatMessage();

  return (
    <div
      className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in"
      dir="rtl"
    >
      <div className="glass-strong p-12 md:p-16 rounded-3xl space-y-6 glow-medical">
        <div className="inline-flex p-6 rounded-2xl bg-primary/10 glow-medical">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {isNewsletter
              ? intl('thank-you/header/newsletter')
              : intl('thank-you/header/success')}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {isNewsletter
              ? intl('thank-you/description/newsletter')
              : intl('thank-you/description/success')}
          </p>
        </div>

        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-lg font-semibold text-foreground">
              {intl('thank-you/whatNow/title')}
            </p>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>

          <div className="grid gap-4 text-right max-w-md mx-auto">
            <div className="flex items-start gap-3 p-4 glass rounded-xl">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">١</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  {isNewsletter
                    ? intl('thank-you/steps/newsletter/step1')
                    : intl('thank-you/steps/success/step1')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 glass rounded-xl">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">٢</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  {isNewsletter
                    ? intl('thank-you/steps/newsletter/step2')
                    : intl('thank-you/steps/success/step2')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 glass rounded-xl">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">٣</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  {isNewsletter
                    ? intl('thank-you/steps/newsletter/step3')
                    : intl('thank-you/steps/success/step3')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg"
          >
            {intl('thank-you/backToTop')}
          </Button>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl">
        <p className="text-sm text-muted-foreground">
          {intl('thank-you/socialProof')}
        </p>
      </div>
    </div>
  );
};

export default ThankYouMessage;
