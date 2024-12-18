import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { useRouter } from '@/router';

import 'antd/dist/reset.css';
import '@/assets/styles/app.scss';

const App: React.FC = () => {
  const element = useRouter();
  return (
    <Suspense
      fallback={
        <div className="loading">
          <Spin tip="Loading..." size="large" />
        </div>
      }
    >
      {element}
    </Suspense>
  );
};

export default App;
