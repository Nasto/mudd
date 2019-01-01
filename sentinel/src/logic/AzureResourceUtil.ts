import * as AzureRest from 'ms-rest-azure';
import * as AzureApps from 'azure-arm-website';

export default class AzureResourceUtil {
  public initApplications(): void {
    // ToDo: get the username and password from the ui
    // Note: this is all plaintext, that's bad
    AzureRest.loginWithUsernamePassword('user', 'pass', (_error, credentials, subscriptions) => {
      // ToDo: list all subscriptions
      const client = new AzureApps.WebSiteManagementClient(credentials, subscriptions[0].id);
      client.webApps.list().then(apps => {
        apps.map((app, index) => {
          // ToDo: list all webApps
          console.log(`${app.name} | ${app.id}`);
        });
      });
    });
  }
}
