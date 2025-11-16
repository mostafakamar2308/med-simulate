'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
    .max(100, { message: 'الاسم يجب أن يكون أقل من 100 حرف' }),
  university: z
    .string()
    .trim()
    .min(3, { message: 'اسم الجامعة يجب أن يكون 3 أحرف على الأقل' })
    .max(150, { message: 'اسم الجامعة يجب أن يكون أقل من 150 حرف' }),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[+]?[0-9]{10,15}$/, {
      message: 'رقم واتساب غير صحيح (مثال: +201234567890)',
    }),
});

interface BetaSignupFormProps {
  onSuccess: () => void;
  category: 'high' | 'medium' | 'low';
  totalScore: number;
}

const BetaSignupForm = ({
  onSuccess,
  category,
  totalScore,
}: BetaSignupFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    whatsapp: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = signupSchema.parse(formData);

      // Here you would normally send to backend
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast('تم التسجيل بنجاح! 🎉', {
        description: 'سنتواصل معك قريباً عبر الواتساب',
      });

      onSuccess();
    } catch (error) {
      toast('حدث خطأ', {
        description: 'الرجاء المحاولة مرة أخرى',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in" dir="rtl">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-2xl bg-primary/10 glow-medical">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          {category === 'high'
            ? 'أكمل التسجيل للنسخة التجريبية'
            : 'سجّل اهتمامك'}
        </h2>
        <p className="text-lg text-muted-foreground">
          أدخل بياناتك وسنتواصل معك قريباً لترتيب وصولك
        </p>
      </div>

      <div className="glass-strong p-8 md:p-10 rounded-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2 text-right">
            <Label htmlFor="name" className="text-base font-semibold">
              الاسم الكامل *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="text-lg h-12"
              dir="rtl"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* University Field */}
          <div className="space-y-2 text-right">
            <Label htmlFor="university" className="text-base font-semibold">
              الجامعة *
            </Label>
            <Input
              id="university"
              type="text"
              value={formData.university}
              onChange={(e) => handleChange('university', e.target.value)}
              placeholder="مثال: جامعة القاهرة"
              className="text-lg h-12"
              dir="rtl"
              disabled={isSubmitting}
            />
            {errors.university && (
              <p className="text-sm text-destructive">{errors.university}</p>
            )}
          </div>

          {/* WhatsApp Field */}
          <div className="space-y-2 text-right">
            <Label htmlFor="whatsapp" className="text-base font-semibold">
              رقم الواتساب *
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="+201234567890"
              className="text-lg h-12"
              dir="ltr"
              disabled={isSubmitting}
            />
            {errors.whatsapp && (
              <p className="text-sm text-destructive">{errors.whatsapp}</p>
            )}
            <p className="text-xs text-muted-foreground">
              سنتواصل معك عبر الواتساب لترتيب الوصول للمنصة
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full text-lg h-14"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جارٍ التسجيل...</span>
              </>
            ) : (
              <>
                <span>أكمل التسجيل</span>
                <CheckCircle2 className="w-5 h-5" />
              </>
            )}
          </Button>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground text-center pt-4">
            بإتمام التسجيل، أنت توافق على استخدام بياناتك للتواصل معك بخصوص Med
            Simulate فقط
          </p>
        </form>
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass p-6 rounded-2xl text-right">
          <h4 className="font-semibold text-foreground mb-2">
            📅 متى سأحصل على الوصول؟
          </h4>
          <p className="text-sm text-muted-foreground">
            {category === 'high'
              ? 'خلال 3-5 أيام عمل (أولوية عالية)'
              : 'خلال 1-2 أسبوع (الموجة التالية)'}
          </p>
        </div>
        <div className="glass p-6 rounded-2xl text-right">
          <h4 className="font-semibold text-foreground mb-2">🎯 ماذا بعد؟</h4>
          <p className="text-sm text-muted-foreground">
            سنرسل لك رابط الوصول + دليل البداية السريعة عبر الواتساب
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetaSignupForm;
