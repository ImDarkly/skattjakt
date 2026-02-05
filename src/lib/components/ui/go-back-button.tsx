import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

export default function GoBackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button onClick={goBack} size="icon" variant="secondary">
      <Icon width={24} icon="heroicons:arrow-left-16-solid" />
    </Button>
  );
}
