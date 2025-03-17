import { useState, useMemo, useCallback } from 'react';
import { data } from './data';
import { DataItem } from './types';
import Table from './components/Table/Table';
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
      <h1>Таблица данных</h1>
      <div className={styles.filterButtons}>
        <button
          className={filterActive === 'all' ? styles.activeButton : styles.button}
          onClick={() => setFilterActive('all')}
        >
          All
        </button>
        <button
          className={filterActive === 'active' ? styles.activeButton : styles.button}
          onClick={() => setFilterActive('active')}
        >
          Active
        </button>
        <button
          className={filterActive === 'inactive' ? styles.activeButton : styles.button}
          onClick={() => setFilterActive('inactive')}
        >
          Inactive
        </button>
      </div>
      <Table data={sortedData} onSort={handleSort} sortBy={sortBy} />
    </div>
  );
}

export default App
