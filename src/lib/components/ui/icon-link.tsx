import { Link } from 'react-router-dom';
import { Button } from './button';
import { Icon } from '@iconify/react/dist/iconify.js';

interface IconLinkProps {
  to: string;
  icon: string;
}

export default function IconLink({ to, icon }: IconLinkProps) {
  return (
    <Button size="icon" variant="secondary" asChild>
      <Link to={to}>
        <Icon width={24} icon={icon} />
      </Link>
    </Button>
  );
}
