import * as React from 'react';
import TopbarContainer from '../Topbar/TopbarContainer';
import SidebarContainer from '../Sidebar/SidebarContainer';
import PanelContainer from '../Panel/PanelContainer';
import '../../styles/app.scss';
import '../../styles/common.scss';

export default class MainView extends React.Component {
  render() {
    return(
      <div className={'main flex-col'}>
        <TopbarContainer />
        <div className={'content flex-row'}>
          <SidebarContainer />
          <PanelContainer />
        </div>
      </div>
    );
  }
}
