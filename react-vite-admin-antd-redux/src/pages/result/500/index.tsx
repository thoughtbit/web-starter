import React from 'react';
import Result from '@/components/Result';

const ServerError = () => <Result code={500} />;

export default React.memo(ServerError);
