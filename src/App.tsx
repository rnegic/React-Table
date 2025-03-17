import { useState, useMemo, useCallback } from 'react';
import { data } from './data';
import { DataItem } from './types';
import Table from './components/Table/Table';
import FilterButton from './components/FilterButton/FilterButton';
import styles from './App.module.css';

function App() {
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<{ field: keyof DataItem; order: 'asc' | 'desc' } | null>(null);

  const filteredData = useMemo(() => {
    let result = data;
    if (filterActive === 'active') {
      result = result.filter(item => item.isActive === true);
    } else if (filterActive === 'inactive') {
      result = result.filter(item => item.isActive === false);
    }
    return result;
  }, [filterActive, data]);

  const sortedData = useMemo(() => {
    if (!sortBy) {
      return filteredData;
    }
    const sorted = [...filteredData].sort((a, b) => {
      const valueA = a[sortBy.field];
      const valueB = b[sortBy.field];

      if (valueA === null || valueB === null) {
        return 0;
      }

      let comparison = 0;
      if (sortBy.field === 'balance') {
        const numA = parseFloat(String(valueA).replace(/[^0-9.-]+/g, ""));
        const numB = parseFloat(String(valueB).replace(/[^0-9.-]+/g, ""));
        comparison = numA - numB;
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB);
      }

      return sortBy.order === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [filteredData, sortBy]);


  const handleSort = useCallback((field: keyof DataItem) => {
    setSortBy(prevSort => {
      if (prevSort && prevSort.field === field) {
        return { field, order: prevSort.order === 'asc' ? 'desc' : 'asc' };
      }
      return { field, order: 'asc' };
    });
  }, []);


  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <div className={styles.panel}>
          <h1>Таблица данных</h1>
          <div className={styles.filterButtons}>
            <FilterButton
              isActive={filterActive === 'all'}
              onClick={() => setFilterActive('all')}
            >
              Все
            </FilterButton>
            <FilterButton
              isActive={filterActive === 'active'}
              onClick={() => setFilterActive('active')}
            >
              Активные
            </FilterButton>
            <FilterButton
              isActive={filterActive === 'inactive'}
              onClick={() => setFilterActive('inactive')}
            >
              Неактивные
            </FilterButton>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <Table data={sortedData} onSort={handleSort} sortBy={sortBy} />
        </div>
      </div>
    </div>
  );
}

export default App
