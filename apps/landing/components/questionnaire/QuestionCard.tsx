import { Question } from './types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedScore: number | null;
  onSelect: (score: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question,
  selectedScore,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) => {
  return (
    <div
      className="glass-strong p-8 md:p-10 rounded-3xl space-y-6 animate-fade-in"
      dir="rtl"
    >
      {/* Question Header */}
      <div className="flex items-start gap-4 justify-between">
        <div className="flex-1 text-right">
          <div className="flex items-center gap-3 justify-end mb-4">
            <span className="text-sm text-muted-foreground">
              {questionNumber} من {totalQuestions}
            </span>
            <div className="px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-semibold text-primary">
                السؤال {questionNumber}
              </span>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
            {question.question}
          </h3>
        </div>
      </div>

      {/* Options */}
      <RadioGroup
        value={selectedScore?.toString()}
        onValueChange={(value) => onSelect(parseInt(value))}
        className="space-y-3 pt-4"
      >
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`
              relative flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer
              ${
                selectedScore === option.score
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-border/50 hover:border-primary/50 bg-background/50'
              }
            `}
          >
            <Label
              htmlFor={`q${question.id}-option${index}`}
              className="flex items-center gap-4 flex-1 cursor-pointer"
            >
              <RadioGroupItem
                value={option.score.toString()}
                id={`q${question.id}-option${index}`}
                className="shrink-0"
              />
              <span className="text-foreground leading-relaxed flex-1 text-right">
                {option.text}
              </span>
              {selectedScore === option.score && (
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 animate-scale-in" />
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default QuestionCard;
