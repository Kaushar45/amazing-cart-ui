// Function to set a cookie
export function setCookie(name, value, days = 3600) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
export function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

// Function to check login status
function checkLogin() {
  const user = getCookie("username");
  if (user) {
    alert("Welcome back, " + user + "!");
  } else {
    alert("Please log in.");
  }
}

export function login(username) {
  setCookie("username", username, 7);
  alert("Login successful! Welcome, " + username);
}
