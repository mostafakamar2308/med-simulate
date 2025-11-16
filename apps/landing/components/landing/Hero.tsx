import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-medical.jpg';
import { Activity, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
      dir="rtl"
    >
      {/* Background decorative elements
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div> */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right side - Content (in RTL, this appears on right) */}
          <div className="space-y-8 text-right lg:order-1">
            {/* Logo/Brand */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <h3 className="text-2xl font-bold bg-linear-to-l from-primary to-secondary bg-clip-text text-transparent">
                Med Simulate
              </h3>
              <div className="p-3 rounded-xl glass glow-medical">
                <Activity className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-linear-to-l from-primary via-accent to-secondary bg-clip-text text-transparent">
                  تدرّب على الحالات
                </span>
                <br />
                <span className="text-foreground">قبل أن تواجهها</span>
              </h1>

              <div className="flex items-center justify-end gap-2 text-muted-foreground">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-lg">
                  منصّة تحاكي الواقع الطبي لتقوية تفكيرك السريري
                </span>
              </div>
            </div>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              لن تقف مهزوزاً أمام مريض مرة أخرى.
              <br />
              <span className="text-foreground font-medium">
                تدرّب على حالات واقعية بصوتك، اتخذ القرارات العلاجية خطوة بخطوة،
                وتعلّم كيف تفرّق بين التشخيصات المشابهة بثقة
              </span>
              … قبل أول نبطشية.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/questionnaire">
                <Button
                  variant="hero"
                  size="lg"
                  className="text-lg px-8 py-6 h-auto"
                >
                  ابدأ اختبار الجاهزية
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-3">
                لمعرفة مدى جاهزيتك قبل دخول المستشفى
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary">+100</div>
                <div className="text-sm text-muted-foreground mt-1">
                  طبيب امتياز
                </div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary">٨٧٪</div>
                <div className="text-sm text-muted-foreground mt-1">
                  تحسّن في الثقة
                </div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary">٩٠٪</div>
                <div className="text-sm text-muted-foreground mt-1">
                  يريدون الاستمرار
                </div>
              </div>
            </div>
          </div>

          {/* Left side - Hero Image (in RTL, this appears on left) */}
          <div className="relative lg:order-2">
            <div className="relative rounded-3xl overflow-hidden glass-strong p-4 glow-medical-strong">
              <Image
                src={heroImage}
                alt="Medical simulation interface"
                className="w-full h-auto rounded-2xl"
              />
              {/* Floating UI elements overlay */}
              <div className="absolute top-8 left-8 glass p-4 rounded-xl animate-float">
                <div className="text-xs text-muted-foreground mb-1">
                  Heart Rate
                </div>
                <div className="text-2xl font-bold text-primary">72 bpm</div>
              </div>
              <div
                className="absolute bottom-8 right-8 glass p-4 rounded-xl animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="text-xs text-muted-foreground mb-1">Status</div>
                <div className="text-lg font-semibold text-secondary">
                  Active
                </div>
              </div>
            </div>

            {/* Decorative glow orbs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse"
              style={{ animationDelay: '1.5s' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
