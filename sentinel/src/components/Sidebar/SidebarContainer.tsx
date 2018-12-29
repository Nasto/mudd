import * as React from 'react';
import SidebarView from './SidebarView';
import Subscription from '../../models/Subscription';

export default class SidebarContainer extends React.Component {

  private sampleSubs: Subscription[] = [
    {
      name: 'sub1',
      guid: 's1',
      groups: [
        {
          name: 'group1',
          guid: 'g1',
          apps: [
            {
              name: 'app1',
              guid: 'a1'
            },
            {
              name: 'app2',
              guid: 'a2'
            },
            {
              name: 'app3',
              guid: 'a3'
            }
          ]
        },
        {
          name: 'group2',
          guid: 'g2',
          apps: [
            {
              name: 'app1',
              guid: 'a1'
            },
            {
              name: 'app2',
              guid: 'a2'
            },
            {
              name: 'app3',
              guid: 'a3'
            }
          ]
        }
      ]
    },
    {
      name: 'sub2',
      guid: 's2',
      groups: [
        {
          name: 'group1',
          guid: 'g1',
          apps: [
            {
              name: 'app1',
              guid: 'a1'
            },
            {
              name: 'app2',
              guid: 'a2'
            },
            {
              name: 'app3',
              guid: 'a3'
            }
          ]
        },
        {
          name: 'group2',
          guid: 'g2',
          apps: [
            {
              name: 'app1',
              guid: 'a1'
            },
            {
              name: 'app2',
              guid: 'a2'
            },
            {
              name: 'app3',
              guid: 'a3'
            }
          ]
        }
      ]
    }
  ];

  render() {
    return <SidebarView subscriptions={this.sampleSubs} />;
  }
}
