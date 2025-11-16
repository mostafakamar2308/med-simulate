import { CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThankYouMessageProps {
  isNewsletter?: boolean;
}

const ThankYouMessage = ({ isNewsletter = false }: ThankYouMessageProps) => {
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
            {isNewsletter ? 'شكراً لاهتمامك!' : 'تم التسجيل بنجاح! 🎉'}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {isNewsletter
              ? 'سنبقيك على اطلاع بآخر التطورات والمميزات الجديدة'
              : 'سنتواصل معك قريباً عبر الواتساب لترتيب الوصول للنسخة التجريبية'}
          </p>
        </div>

        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-lg font-semibold text-foreground">
              ماذا يحدث الآن؟
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
                    ? 'تحقق من بريدك الإلكتروني للتأكيد'
                    : 'سنراجع طلبك ونرتب الأولويات'}
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
                    ? 'سنخبرك فوراً عند إطلاق مميزات جديدة'
                    : 'سنرسل لك رابط الوصول + دليل البداية'}
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
                    ? 'ابقَ متابعاً لآخر التحديثات'
                    : 'ابدأ التدريب وطوّر مهاراتك السريرية'}
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
            العودة للأعلى
          </Button>
        </div>
      </div>

      {/* Social Proof */}
      <div className="glass p-6 rounded-2xl">
        <p className="text-sm text-muted-foreground">
          💙 انضممت لأكثر من 100 طبيب امتياز يستعدون لمستقبلهم المهني
        </p>
      </div>
    </div>
  );
};

export default ThankYouMessage;
