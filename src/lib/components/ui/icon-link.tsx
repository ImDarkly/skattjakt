import { Link } from 'react-router-dom';
import { Button } from './button';
import type { LucideIcon } from 'lucide-react';

interface IconLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export default function IconLink({ to, icon: Icon, label }: IconLinkProps) {
  return (
    <Button size="icon" variant="secondary" asChild>
      <Link to={to} aria-label={label}>
        <Icon size={20} aria-hidden="true" />
      </Link>
    </Button>
  );
}
