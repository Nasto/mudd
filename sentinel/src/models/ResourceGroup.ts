import Resource from './Resource';
import App from './App';

export default interface ResourceGroup extends Resource {
  apps: App[];
}
