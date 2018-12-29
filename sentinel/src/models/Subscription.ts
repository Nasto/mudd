import Resource from './Resource';
import ResourceGroup from './ResourceGroup';

export default interface Subscription extends Resource {
  groups: ResourceGroup[];
}
