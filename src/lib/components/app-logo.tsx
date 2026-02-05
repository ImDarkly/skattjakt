import { Link } from 'react-router-dom';
import SkattjaktLogo from '@/lib/components/assets/skattjakt-logo.svg?react';

export default function AppLogo() {
  return (
    <Link to="/" className="w-full">
      <div className="w-full rounded-md p-2 hover:bg-secondary">
        <SkattjaktLogo />
      </div>
    </Link>
  );
}
