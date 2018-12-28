import * as AzureRest from 'ms-rest-azure';

function loginClick() {
  const username = (document.getElementById('usernameInput') as HTMLInputElement).value;
  const password = (document.getElementById('passwordInput') as HTMLInputElement).value;
  AzureRest.loginWithUsernamePassword(username, password, (error, _credentials, subscriptions) => {
    if (error) {
      throw error;
    }
    const subList = document.createElement('ul');
    subscriptions.forEach(subscription => {
      const el = document.createElement('li');
      el.innerHTML = `${subscription.name} (${subscription.id} | ${subscription.tenantId})`;
      subList.appendChild(el);
    });
    document.getElementById('app')!.appendChild(subList);
  });
}

function createLoginForm() {
  const usernameInput = document.createElement('input');
  usernameInput.id = 'usernameInput';
  usernameInput.type = 'text';
  const passwordInput = document.createElement('input');
  passwordInput.id = 'passwordInput';
  passwordInput.type = 'password';
  const loginButton = document.createElement('button');
  loginButton.innerHTML = 'Login';
  loginButton.addEventListener('click', loginClick);
  const login = document.createElement('div');
  login.appendChild(usernameInput);
  login.appendChild(passwordInput);
  login.appendChild(loginButton);
  document.getElementById('app')!.appendChild(login);
}

document.addEventListener('DOMContentLoaded', _ => {
  document.getElementById('app')!.innerHTML = 'Hello World from the client side!';
  createLoginForm();
});
