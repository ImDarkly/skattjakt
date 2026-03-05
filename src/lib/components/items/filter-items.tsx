import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useBoundStore } from '@/lib/zustand/store';
import { useQueryState } from 'nuqs';

export default function FilterItems() {
  const [, setActiveCategory] = useQueryState('category');
  const items = useBoundStore((state) => state.items);
  const categories = Array.from(new Set(items.map((item) => item.category)));

  function capitalize(str: string) {
    return !str
      ? ''
      : str
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  }

  function handleCategoryCLick(category: string | null) {
    setActiveCategory(category);
  }

  return (
    <ToggleGroup
      className="justify-start"
      type="single"
      size="sm"
      defaultValue="all"
      variant="outline"
    >
      <ToggleGroupItem
        value="all"
        key={'all'}
        onClick={() => handleCategoryCLick(null)}
      >
        All
      </ToggleGroupItem>
      {categories.map((category) => {
        return (
          <ToggleGroupItem
            className="whitespace-nowrap"
            onClick={() => handleCategoryCLick(category)}
            value={category}
            key={category}
          >
            {capitalize(category)}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
