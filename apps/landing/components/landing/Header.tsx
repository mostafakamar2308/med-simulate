import { useFormatMessage } from '@/hooks/intl';
import { Activity } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const Header: React.FC = () => {
  const intl = useFormatMessage();

  return (
    <header className="p-4 flex items-center w-full justify-center lg:justify-between">
      <Link href="/" className="flex items-center gap-3">
        <div className="p-3 rounded-xl glass glow-medical">
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-l from-primary to-secondary bg-clip-text text-primary">
          {intl('home/logo')}
        </h3>
      </Link>
      <nav className="hidden lg:flex gap-4 items-center">
        <Link className="text-xl font-semibold" href={'/#about'}>
          {intl('home/nav/about')}
        </Link>
        <Link className="text-xl font-semibold" href={'/#features'}>
          {intl('home/nav/features')}
        </Link>
        <Link href={'/register'}>
          <Button size={'lg'}>{intl('home/nav/get-started')}</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
