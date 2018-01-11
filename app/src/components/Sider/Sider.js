import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Menu ,} from 'antd'
import config  from '../../utils/config'
import styles from './Sider.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Sider extends React.Component{
  handleClick = (e) => {
    console.log('click ', e);
  };
  render () {
    return (
      <div>
        <div className={styles.logo}>
          {/*<img alt={'logo'} src={config.logo} />*/}
          <span>{config.name}</span>
        </div>
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={['5']}
          defaultOpenKeys={['sub2']}
          mode="inline"
        >
          <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>导航</span></span>}>
            <Menu.Item key="5">
              <Link to="/billManage">
                发票管理
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting"/><span>系统</span></span>}>
            <Menu.Item key="9">需求管理</Menu.Item>
            <Menu.Item key="10">进度报表</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
export default Sider
