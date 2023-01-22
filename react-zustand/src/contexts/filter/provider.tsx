import { useCallback, useMemo } from 'react';
import { createZustandContext, stateSetterHandler } from '@/store/utils';
import { StateSetter } from '@/store/types';

type FilterItem = {
  id: number;
  title: string;
  field: string;
};
type FiltersState = {
    filters: any[];
};
type FiltersActions = {
  setFilters: StateSetter<any[]>;
  addFilter: (filter: FilterItem) => void;
  deleteFilter: (field: string) => void;
  editFilter: (filter: FilterItem) => void;
};
const [Provider, useFilters] = createZustandContext<FiltersState, FiltersActions>();

export { useFilters };

export const FiltersProvider: React.FC<React.PropsWithChildren<{ name: string }>> = ({ name, children }) => (
  <Provider
    actions={useCallback(
      (set, get) => ({
        setFilters: stateSetterHandler(set, 'filters'),
        addFilter: (filter) => {
          if (get().filters.findIndex((f) => f.field === filter.field) !== -1) return;
          get().setFilters((v) => [...v, filter]);
        },
        deleteFilter: (field) => {
          get().setFilters((v) => v.filter((el) => el.field !== field));
        },
        editFilter: (filter) => {
          get().setFilters((e) => e.map((el) => (el.field === filter.field ? filter : el)));
        },
      }),
      []
    )}
    initialState={useMemo(() => ({ filters: [], panel: false }), [])}
    name={useMemo(() => `table-builder-filter - ${name}`, [name])}
    persist
  >
    {children}
  </Provider>
);
