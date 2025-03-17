import { useState, useMemo, useCallback } from 'react';
import { data } from './data';
import { DataItem } from './types';
import Table from './components/Table/Table';
import styles from './App.module.css';

function App() {
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<{ field: keyof DataItem; order: 'asc' | 'desc' } | null>(null);

  const filteredData = useMemo(() => {
    let result = data;
    if (filterActive !== null) {
      result = result.filter(item => item.isActive === filterActive);
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
      <div className={styles.filters}>
        <label>
          <input
            type="checkbox"
            checked={filterActive === true}
            onChange={() => setFilterActive(prev => prev === true ? null : true)}
          />
          Только активные
        </label>
        <label>
          <input
            type="checkbox"
            checked={filterActive === false}
            onChange={() => setFilterActive(prev => prev === false ? null : false)}
          />
          Только неактивные
        </label>
      </div>
      <Table data={sortedData} onSort={handleSort} sortBy={sortBy} />
    </div>
  );
}

export default App
