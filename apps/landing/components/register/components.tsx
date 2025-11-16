'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useFormatMessage } from '@/hooks/intl';
import { toast } from 'sonner';

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'register/errors/name-min' })
    .max(100, { message: 'register/errors/name-max' }),
  university: z
    .string()
    .trim()
    .min(3, { message: 'register/errors/university-min' })
    .max(150, { message: 'register/errors/university-max' }),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[+]?[0-9]{10,15}$/, {
      message: 'register/errors/whatsapp-invalid',
    }),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const BetaSignupForm = () => {
  const intl = useFormatMessage();
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    university: '',
    whatsapp: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const response = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(intl('register/errors/submit'));
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      toast("intl('register/success/title')", {
        description: intl('register/success/description'),
      });
    },
    onError: (error: Error) => {
      toast(intl('register/errors/title'), {
        description: error.message || intl('register/errors/fallback'),
      });
    },
  });

  const handleChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const validated = signupSchema.parse(formData);
      mutation.mutate(validated);
    } catch {
      toast(intl('register/errors/title'));
    }
  };

  if (showSuccess) return <BetaSignupSuccess />;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      dir="rtl"
    >
      <BackButton />
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <SignupHeader />
        <div className="glass-strong p-8 md:p-10 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="name"
              label={intl('register/form/name')}
              placeholder={intl('register/form/name-placeholder')}
              value={formData.name}
              error={errors.name}
              onChange={(val) => handleChange('name', val)}
              disabled={mutation.isPending}
            />
            <InputField
              id="university"
              label={intl('register/form/university')}
              placeholder={intl('register/form/university-placeholder')}
              value={formData.university}
              error={errors.university}
              onChange={(val) => handleChange('university', val)}
              disabled={mutation.isPending}
            />
            <InputField
              id="whatsapp"
              label={intl('register/form/whatsapp')}
              placeholder="+201234567890"
              value={formData.whatsapp}
              error={errors.whatsapp}
              onChange={(val) => handleChange('whatsapp', val)}
              disabled={mutation.isPending}
              dir="ltr"
            />
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full text-lg h-14"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{intl('register/form/submitting')}</span>
                </>
              ) : (
                <>
                  <span>{intl('register/form/submit')}</span>
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center pt-4">
              {intl('register/form/privacy')}
            </p>
          </form>
        </div>
        <BenefitsSection />
      </div>
    </div>
  );
};

export const SignupHeader = () => {
  const intl = useFormatMessage();
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex p-4 rounded-2xl bg-primary/10 glow-medical">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        {intl('register/header/title')}
      </h1>
      <p className="text-lg text-muted-foreground">
        {intl('register/header/description')}
      </p>
    </div>
  );
};

export const InputField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  dir,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  disabled?: boolean;
  dir?: 'rtl' | 'ltr';
}) => {
  return (
    <div className="space-y-2 text-right">
      <Label htmlFor={id} className="text-base font-semibold">
        {label}
      </Label>
      <Input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-lg h-12"
        dir={dir || 'rtl'}
        disabled={disabled}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export const BackButton = () => {
  const intl = useFormatMessage();
  return (
    <div className="fixed top-6 right-6 z-50">
      <Link href="/">
        <Button variant="glass" size="sm" className="gap-2">
          <ArrowRight className="w-4 h-4" />
          <span>{intl('register/back')}</span>
        </Button>
      </Link>
    </div>
  );
};

export const BenefitsSection = () => {
  const intl = useFormatMessage();

  const benefits = [
    {
      key: 'fast',
      title: intl('register/benefits/fast/title'),
      description: intl('register/benefits/fast/description'),
    },
    {
      key: 'practical',
      title: intl('register/benefits/practical/title'),
      description: intl('register/benefits/practical/description'),
    },
    {
      key: 'support',
      title: intl('register/benefits/support/title'),
      description: intl('register/benefits/support/description'),
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {benefits.map((key, idx) => (
        <div key={idx} className="glass p-6 rounded-2xl text-right">
          <h4 className="font-semibold text-foreground mb-2">{key.title}</h4>
          <p className="text-sm text-muted-foreground">{key.description}</p>
        </div>
      ))}
    </div>
  );
};

export const BetaSignupSuccess = () => {
  const intl = useFormatMessage();
  const benefits = [
    intl('register/success/next-steps/step-1'),
    intl('register/success/next-steps/step-2'),
    intl('register/success/next-steps/step-3'),
  ];
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      dir="rtl"
    >
      <div className="max-w-2xl w-full space-y-8 animate-fade-in text-center">
        <div className="inline-flex p-6 rounded-3xl bg-primary/10 glow-medical mx-auto">
          <CheckCircle2 className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          {intl('register/success/title')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {intl('register/success/description')}
        </p>

        <div className="glass-strong p-8 rounded-3xl space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">
            {intl('register/success/next-steps/title')}
          </h3>
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {i}
              </div>
              <p className="text-muted-foreground">{benefit}</p>
            </div>
          ))}
        </div>

        <Link href="/">
          <Button variant="glass" size="lg" className="gap-2">
            <ArrowRight className="w-5 h-5" />
            <span>{intl('register/back')}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
