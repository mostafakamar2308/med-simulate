'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { questions } from '@/components/questionnaire/questions';
import {
  QuestionnaireResponse,
  QuestionnaireResult,
} from '@/components/questionnaire/types';
import QuestionCard from '@/components/questionnaire/QuestionCard';
import ProgressBar from '@/components/questionnaire/ProgressBar';
import ResultsDisplay from '@/components/questionnaire/ResultsDisplay';
import BetaSignupForm from '@/components/questionnaire/BetaSignupForm';
import ThankYouMessage from '@/components/questionnaire/ThankYouMessage';

const QuestionnaireSection = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionnaireResponse[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showBetaForm, setShowBetaForm] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [result, setResult] = useState<QuestionnaireResult | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const currentResponse = responses.find(
    (r) => r.questionId === currentQuestion.id,
  );
  const canProceed = currentResponse !== undefined;
  const answeredCount = responses.length;

  const handleSelectOption = (score: number) => {
    setResponses((prev) => {
      const existing = prev.findIndex(
        (r) => r.questionId === currentQuestion.id,
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = {
          questionId: currentQuestion.id,
          selectedScore: score,
        };
        return updated;
      }
      return [
        ...prev,
        { questionId: currentQuestion.id, selectedScore: score },
      ];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateResult = (): QuestionnaireResult => {
    const totalScore = responses.reduce((sum, r) => sum + r.selectedScore, 0);

    let category: 'high' | 'medium' | 'low';
    let feedback: string;
    let action: string;

    if (totalScore >= 14) {
      category = 'high';
      feedback =
        'نتيجتك تشير إلى أنك في الفئة التي ستستفيد بشكل كبير من Med Simulate! التفكير السريري يحتاج تطوير منهجي، ونحن هنا لمساعدتك.';
      action =
        'ستحصل على أولوية في القبول للنسخة التجريبية المغلقة. ابدأ التدريب وطوّر ثقتك قبل أول نبطشية.';
    } else if (totalScore >= 10) {
      category = 'medium';
      feedback =
        'لديك أساس جيد، لكن هناك مجال للتحسين في بعض جوانب التفكير السريري. Med Simulate سيساعدك على سد هذه الفجوات.';
      action =
        'سنخبرك عند فتح المقاعد في الموجة التالية. استعد لتطوير مهاراتك بشكل منهجي.';
    } else {
      category = 'low';
      feedback =
        'رائع! لديك أساس قوي في التفكير السريري. Med Simulate يمكن أن يساعدك على صقل مهاراتك وزيادة ثقتك أكثر.';
      action =
        'يمكنك الاستفادة من المنصة لتعزيز مهاراتك الحالية والوصول لمستوى متقدم.';
    }

    return { totalScore, category, feedback, action };
  };

  const handleSubmit = () => {
    const calculatedResult = calculateResult();
    setResult(calculatedResult);
    setShowResults(true);
  };

  const handleBetaSignup = () => {
    setShowBetaForm(true);
    setShowResults(false);
  };

  const handleNewsletterSignup = () => {
    setShowNewsletter(true);
    setShowResults(false);
  };

  const handleSignupSuccess = () => {
    setShowBetaForm(false);
    setShowNewsletter(false);
    setShowThankYou(true);
  };

  // Thank you screen
  if (showThankYou) {
    return (
      <section
        className="py-24 min-h-screen flex items-center relative overflow-hidden"
        dir="rtl"
      >
        <div className="absolute inset-0 bg-gradient-medical" />
        <div className="container mx-auto px-4 relative z-10">
          <ThankYouMessage isNewsletter={showNewsletter} />
        </div>
      </section>
    );
  }

  // Beta signup form
  if (showBetaForm && result) {
    return (
      <section
        className="py-24 min-h-screen flex items-center relative overflow-hidden"
        dir="rtl"
      >
        <div className="absolute inset-0 bg-gradient-medical" />
        <div className="container mx-auto px-4 relative z-10">
          <BetaSignupForm
            onSuccess={handleSignupSuccess}
            category={result.category}
            totalScore={result.totalScore}
          />
        </div>
      </section>
    );
  }

  // Newsletter signup (reuse beta form with different messaging)
  if (showNewsletter && result) {
    return (
      <section
        className="py-24 min-h-screen flex items-center relative overflow-hidden"
        dir="rtl"
      >
        <div className="absolute inset-0 bg-gradient-medical" />
        <div className="container mx-auto px-4 relative z-10">
          <BetaSignupForm
            onSuccess={handleSignupSuccess}
            category={result.category}
            totalScore={result.totalScore}
          />
        </div>
      </section>
    );
  }

  // Results display
  if (showResults && result) {
    return (
      <section
        className="py-24 min-h-screen flex items-center relative overflow-hidden"
        dir="rtl"
      >
        <div className="absolute inset-0 bg-gradient-medical" />
        <div className="container mx-auto px-4 relative z-10">
          <ResultsDisplay
            result={result}
            onBetaSignup={handleBetaSignup}
            onNewsletterSignup={handleNewsletterSignup}
          />
        </div>
      </section>
    );
  }

  // Questionnaire
  return (
    <section className="py-24 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-medical" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              اختبار الجاهزية السريرية
            </h2>
            <p className="text-lg text-muted-foreground">
              ٦ أسئلة فقط لتقييم مستوى استعدادك • ٥-٧ دقائق
            </p>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            answeredQuestions={answeredCount}
          />

          {/* Question Card */}
          <QuestionCard
            question={currentQuestion}
            selectedScore={currentResponse?.selectedScore ?? null}
            onSelect={handleSelectOption}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="text-lg"
            >
              <ChevronRight className="w-5 h-5" />
              <span>السابق</span>
            </Button>

            {isLastQuestion ? (
              <Button
                variant="hero"
                size="lg"
                onClick={handleSubmit}
                disabled={!canProceed || answeredCount !== questions.length}
                className="text-lg px-8 group"
              >
                <span>احصل على النتيجة</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                onClick={handleNext}
                disabled={!canProceed}
                className="text-lg"
              >
                <span>التالي</span>
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Helper Text */}
          {!canProceed && (
            <p className="text-center text-sm text-muted-foreground">
              اختر إجابة للمتابعة
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionnaireSection;
