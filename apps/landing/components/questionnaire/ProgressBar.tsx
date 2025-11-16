import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
}

const ProgressBar = ({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
}: ProgressBarProps) => {
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="glass-strong p-6 rounded-2xl space-y-4" dir="rtl">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">
            {answeredQuestions} من {totalQuestions} إجابة
          </span>
        </div>
        <span className="font-semibold text-primary">
          {Math.round(progress)}%
        </span>
      </div>

      <Progress value={progress} className="h-3" />

      <p className="text-xs text-muted-foreground text-center">
        {answeredQuestions === totalQuestions
          ? 'رائع! أكملت جميع الأسئلة'
          : `باقي ${totalQuestions - answeredQuestions} ${totalQuestions - answeredQuestions === 1 ? 'سؤال' : 'أسئلة'}`}
      </p>
    </div>
  );
};

export default ProgressBar;
