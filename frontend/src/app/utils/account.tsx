const NAME = "username";

export function isLoggedIn() {  
  return window.localStorage.getItem(NAME) !== null;
}

export function loggedInAs(username: string) {
  window.localStorage.setItem(NAME, username);
}

export function loggedOut() {
  window.localStorage.removeItem(NAME);
}

export function getUsername() {
  return window.localStorage.getItem(NAME);
}