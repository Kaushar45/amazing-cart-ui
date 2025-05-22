// Function to set a cookie
export function setCookie(name, value, days = 3600) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  if (typeof window !== "undefined") {
    // browser code
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }
}

// Function to get a cookie by name
export function getCookie(name) {
  const nameEQ = name + "=";
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; path=/; Max-Age=-99999999;";
}

export { setCookie, getCookie, deleteCookie };
