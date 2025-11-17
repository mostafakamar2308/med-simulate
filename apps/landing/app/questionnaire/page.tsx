import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import QuestionnaireSection from '@/components/questionnaire/QuestionnaireSection';

const Questionnaire = () => {
  return (
    <div className="min-h-screen" dir="rtl">
      <div className="fixed top-6 right-6 z-50">
        <Link href="/">
          <Button variant="glass" size="sm" className="gap-2">
            <ArrowRight className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Button>
        </Link>
      </div>

      <QuestionnaireSection />
    </div>
  );
};

export default Questionnaire;
