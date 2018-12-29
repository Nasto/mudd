import * as React from 'react';

import '../../styles/sidebar.scss';
import Subscription from '../../models/Subscription';

interface SidebarViewProps {
  subscriptions: Subscription[];
}

export default class SidebarView extends React.Component<SidebarViewProps, {}> {
  render() {
    const subscriptions = this.props.subscriptions.map((sub, i) => {
      const groups = sub.groups.map((group, j) => {
        const apps = group.apps.map((app, k) => {
          return <li key={k}>{app.name}</li>;
        });
        return <li key={j}>{group.name}<ul>{apps}</ul></li>;
      });
      return <li key={i}>{sub.name}<ul>{groups}</ul></li>;
    });
    return (<div className={'sidebar'}>{subscriptions}</div>);
  }
}
