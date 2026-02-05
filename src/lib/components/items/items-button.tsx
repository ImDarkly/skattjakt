import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ItemsButton() {
  return (
    <Button size="icon" variant="secondary" asChild>
      <Link to={'/items'}>
        <Icon width={24} icon="heroicons:list-bullet-16-solid" />
      </Link>
    </Button>
  );
}
