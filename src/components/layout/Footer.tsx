
import Link from 'next/link';
import { Gem } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary/90 mb-2">
              <Gem className="h-7 w-7" />
              <span>Gleam Marketplace</span>
            </Link>
            <p className="text-sm">Exquisite gold jewelry for every occasion.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary-foreground">Shop</h3>
            <ul className="space-y-1">
              <li><Link href="/category/rings" className="hover:text-primary transition-colors">Rings</Link></li>
              <li><Link href="/category/necklaces" className="hover:text-primary transition-colors">Necklaces</Link></li>
              <li><Link href="/category/earrings" className="hover:text-primary transition-colors">Earrings</Link></li>
              <li><Link href="/category/bracelets" className="hover:text-primary transition-colors">Bracelets</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary-foreground">Customer Service</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary-foreground">Legal</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Authenticity Guarantee</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Gleam Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
