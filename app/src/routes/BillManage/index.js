import React from 'react';
import { connect } from 'dva';
import Page  from '../../components/Page/Page'


import Filter from './Filter';
import List from './List';

const BillManage = () => {
  return (
    <Page>
      <Filter />
      <List />
    </Page>
  );
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(BillManage);
