import * as React from 'react';
import { connect } from 'dva';
const Welcome = () => {
  return (
    <div>
      <h2>欢迎</h2>
    </div>
  );
};

export default connect()(Welcome);

