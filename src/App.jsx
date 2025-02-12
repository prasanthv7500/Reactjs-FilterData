import React from 'react';
import useFetchApiData from './getData';
import { useState, useEffect } from 'react';

const App = () => {
  const { data, loading, error } = useFetchApiData(
    'https://dummyjson.com/users'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data) {
      setTableData(data?.users);
    } else {
      setTableData('');
    }
  }, [data]);

  const filterData = () => {
    const fData = data?.users?.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTableData(fData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={filterData}>Filter Data</button>
      {tableData?.length > 0 ? (
        <div>
          <table border="1">
            <thead>
              <th>ID</th>
              <th>first Name</th>
              <th>last Name</th>
              <th>userName</th>
            </thead>
            <tbody>
              {tableData?.map((response, index) => (
                <tr key={index}>
                  <td>{response.id}</td>
                  <td>{response.firstName}</td>
                  <td>{response.lastName}</td>
                  <td>{response.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No records found</p>
      )}
    </div>
  );
}
export default App;