import { useEffect } from 'react';

import { GetUserList } from './services';
import { useRequest } from './hooks';
import './App.css'


function App() {
  const {
    data,
    pagination,
    loading,
    reset,
    run 
  } = useRequest(GetUserList, {
      loadingText: false,
      onSuccess: () => {
        console.log('获取用户成功')
      },
    });

   useEffect(() => {
    run();
   }, []) 

  return (
    <div className="App">
      <ul className="list">
        {data&&data.map((item: any, index: number) => {
          return (
            <li className="item item-hairline" key={item.id}>
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default App
