import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface CardsHistoryEmptyStateProps {
  onShowAll?: () => void;
}

export default function CardsHistoryEmptyState({
  onShowAll,
}: CardsHistoryEmptyStateProps) {
  return (
    <div className="mx-4 flex w-full max-w-xl flex-col items-center gap-3 px-4 py-8 text-center">
      <h2 className="text-xl font-semibold">
        {onShowAll ? 'No favorites yet' : 'No cards yet'}
      </h2>
      <p className="text-sm text-muted-foreground">
        {onShowAll
          ? 'Star a card to keep it handy for your next game.'
          : 'Cards you generate or open from a shared link will appear here.'}
      </p>
      {onShowAll ? (
        <Button variant="secondary" onClick={onShowAll}>
          Show all cards
        </Button>
      ) : (
        <Button asChild>
          <Link to="/">Go to generator</Link>
        </Button>
      )}
    </div>
  );
}
