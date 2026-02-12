'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useFormatMessage } from '@/hooks/intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signupSchema = z.object({
  name: z.string().trim().min(2, { message: 'register2/errors/name-min' }),
  university: z
    .string()
    .trim()
    .min(3, { message: 'register2/errors/university-min' })
    .max(150, { message: 'register2/errors/university-max' }),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[+]?[0-9]{10,15}$/, {
      message: 'register2/errors/whatsapp-invalid',
    }),
});

interface BetaSignupFormProps {
  onSuccess: () => void;
  category: 'high' | 'medium' | 'low';
  totalScore: number;
}

const BetaSignupForm = ({ onSuccess, category }: BetaSignupFormProps) => {
  const intl = useFormatMessage();

  const [formData, setFormData] = useState({
    name: '',
    university: '',
    whatsapp: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) {
      setErrors((p) => {
        const copy = { ...p };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      signupSchema.parse(formData);

      await new Promise((r) => setTimeout(r, 1500));

      toast(intl('register2/success/toast-title'), {
        description: intl('register2/success/toast-description'),
      });

      onSuccess();
    } catch {
      toast(intl('register2/errors/title'), {
        description: intl('register2/errors/fallback'),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in" dir="rtl">
      <SignupHeader category={category} />

      <div className="glass-strong p-8 md:p-10 rounded-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <SignupField
            id="name"
            label={intl('register2/form/name')}
            placeholder={intl('register2/form/name-placeholder')}
            value={formData.name}
            onChange={(val) => handleChange('name', val)}
            error={errors.name}
            disabled={submitting}
          />

          <SignupField
            id="university"
            label={intl('register2/form/university')}
            placeholder={intl('register2/form/university-placeholder')}
            value={formData.university}
            onChange={(val) => handleChange('university', val)}
            error={errors.university}
            disabled={submitting}
          />

          <SignupField
            id="whatsapp"
            label={intl('register2/form/whatsapp')}
            placeholder={intl('register2/form/whatsapp-placeholder')}
            value={formData.whatsapp}
            onChange={(val) => handleChange('whatsapp', val)}
            error={errors.whatsapp}
            disabled={submitting}
            dir="ltr"
          />

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full text-lg h-14"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{intl('register2/form/submitting')}</span>
              </>
            ) : (
              <>
                <span>{intl('register2/form/submit')}</span>
                <CheckCircle2 className="w-5 h-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center pt-4">
            {intl('register2/form/privacy')}
          </p>
        </form>
      </div>

      <SignupInfo category={category} />
    </div>
  );
};

const SignupHeader = ({ category }: { category: string }) => {
  const intl = useFormatMessage();

  return (
    <div className="text-center space-y-4">
      <div className="inline-flex p-4 rounded-2xl bg-primary/10 glow-medical">
        <CheckCircle2 className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {category === 'high'
          ? intl('register2/header/title-high')
          : intl('register2/header/title-low')}
      </h2>

      <p className="text-lg text-muted-foreground">
        {intl('register2/header/description')}
      </p>
    </div>
  );
};

type FieldProps = Omit<React.ComponentProps<'input'>, 'onChange'> & {
  label: string;
  error: string;
  onChange: (value: string) => void;
};

const SignupField: React.FC<FieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  dir = 'rtl',
}) => (
  <div className="space-y-2 text-right">
    <Label htmlFor={id} className="text-base font-semibold">
      {label}
    </Label>
    <Input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      className="text-lg h-12"
      dir={dir}
      disabled={disabled}
    />
    {error && <p className="text-sm text-destructive">{error}</p>}
  </div>
);

const SignupInfo = ({ category }: { category: string }) => {
  const intl = useFormatMessage();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="glass p-6 rounded-2xl text-right">
        <h4 className="font-semibold text-foreground mb-2">
          {intl('register2/info/access-title')}
        </h4>
        <p className="text-sm text-muted-foreground">
          {category === 'high'
            ? intl('register2/info/access-high')
            : intl('register2/info/access-low')}
        </p>
      </div>

      <div className="glass p-6 rounded-2xl text-right">
        <h4 className="font-semibold text-foreground mb-2">
          {intl('register2/info/next-title')}
        </h4>
        <p className="text-sm text-muted-foreground">
          {intl('register2/info/next-description')}
        </p>
      </div>
    </div>
  );
};

export default BetaSignupForm;
