import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

export default function GoBackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Button
      onClick={goBack}
      size="icon"
      variant="secondary"
      aria-label="Go back"
    >
      <Icon width={24} icon="heroicons:arrow-left-16-solid" />
    </Button>
  );
}
