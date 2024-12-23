import React, { Suspense } from 'react';
import { useRouter } from '@/router';

import 'antd/dist/reset.css';
import '@/assets/styles/app.scss';


const App: React.FC = () => {
  const element = useRouter();
  return (
    <Suspense
      fallback={
        <div className="loading">
          加载中...
        </div>
      }
    >
      {element}
    </Suspense>
  );
};

export default App;
