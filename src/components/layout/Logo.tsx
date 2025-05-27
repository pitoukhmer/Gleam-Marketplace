
import { Gem } from 'lucide-react';
import type { ReactNode } from 'react';

// This component now returns only the visual content of the logo.
// Styling and link behavior are handled by the parent component.
const Logo = (): ReactNode => {
  return (
    <>
      <Gem className="h-7 w-7 md:h-8 md:w-8" />
      <span className="whitespace-nowrap">Gleam Marketplace</span>
    </>
  );
};

export default Logo;
