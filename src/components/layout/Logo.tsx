
import Link from 'next/link';
import { Gem } from 'lucide-react';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary hover:text-primary/90 transition-colors" aria-label="Gleam Marketplace Home">
      <Gem className="h-7 w-7 md:h-8 md:w-8" />
      <span className="whitespace-nowrap">Gleam Marketplace</span>
    </Link>
  );
};

export default Logo;
