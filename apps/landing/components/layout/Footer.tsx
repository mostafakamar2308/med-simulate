import { Activity, Mail, Heart } from 'lucide-react';
import Link from 'next/link';
import { useFormatMessage } from '@/hooks/intl';

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-b from-background to-muted py-12 border-t border-border/50"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

const FooterBrand = () => {
  const intl = useFormatMessage();
  return (
    <div className="space-y-4 text-right">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg glass">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
          {intl('layout/footer/brand')}
        </h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        {intl('layout/footer/brand-description')}
      </p>
    </div>
  );
};

const FooterLinks = () => {
  const intl = useFormatMessage();
  return (
    <div className="space-y-4 text-right">
      <h4 className="font-semibold text-foreground">
        {intl('layout/footer/quick-links-title')}
      </h4>

      <ul className="space-y-2">
        <li>
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {intl('layout/footer/quick-links-about')}
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {intl('layout/footer/quick-links-features')}
          </Link>
        </li>

        <li>
          <Link
            href="/questionnaire"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {intl('layout/footer/quick-links-start-test')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

const FooterContact = () => {
  const intl = useFormatMessage();
  return (
    <div className="space-y-4 text-right">
      <h4 className="font-semibold text-foreground">
        {intl('layout/footer/contact-title')}
      </h4>

      <a
        href="mailto:mostafakamar.dev@gmail.com"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Mail className="w-4 h-4" />
        <span>{intl('layout/footer/contact-email')}</span>
      </a>
    </div>
  );
};

const FooterBottom = () => {
  const intl = useFormatMessage();
  return (
    <div className="pt-8 border-t border-border/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
        <p className="text-sm text-muted-foreground">
          {intl('layout/footer/bottom-rights')}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Heart className="w-4 h-4 text-destructive fill-destructive" />
          <span>{intl('layout/footer/bottom-made-with-love')}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
