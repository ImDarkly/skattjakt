import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useBoundStore } from '@/lib/zustand/store';
import { useQueryState } from 'nuqs';

export default function FilterItems() {
  const [, setActiveCategory] = useQueryState('category');
  const items = useBoundStore((state) => state.items);
  const categories = Array.from(new Set(items.map((item) => item.category)));

  function capitalize(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
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
      <ToggleGroupItem value="all" onClick={() => handleCategoryCLick(null)}>
        All
      </ToggleGroupItem>
      {categories.map((category) => {
        return (
          <ToggleGroupItem
            onClick={() => handleCategoryCLick(category)}
            value={category}
          >
            {capitalize(category)}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
