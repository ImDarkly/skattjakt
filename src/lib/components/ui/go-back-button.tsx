import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

export default function GoBackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={goBack}
      size="icon"
      variant="secondary"
      aria-label="Go back"
    >
      <ArrowLeft size={20} aria-hidden="true" />
    </Button>
  );
}
