import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useBoundStore } from '@/lib/zustand/store';
import { useQueryState } from 'nuqs';

export default function FilterItems() {
  const [activeCategory, setActiveCategory] = useQueryState('category');
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
      className="justify-start py-1"
      type="single"
      value={activeCategory ?? 'all'}
      onValueChange={(value) => {
        if (value) handleCategoryCLick(value === 'all' ? null : value);
      }}
    >
      <ToggleGroupItem
        className="whitespace-nowrap p-2"
        value="all"
        key={'all'}
      >
        All
      </ToggleGroupItem>
      {categories.map((category) => {
        return (
          <ToggleGroupItem
            className="whitespace-nowrap p-2"
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
