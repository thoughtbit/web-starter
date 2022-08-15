import React from 'react';
import Result from '@@/components/Result';

const UnAuthorized = () => <Result code={403} />;

export default React.memo(UnAuthorized);
