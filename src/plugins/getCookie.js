// get cookie
export function getCookie(cookieName) {
  const strCookie = document.cookie;

  const arrCookie = strCookie.split('; ');

  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');

    if (cookieName == arr[0]) {
      return arr[1];
    }
  }

  return false;
}

// get cookie expires

export function getExpires(cookieName) {
  const strCookie = document.cookie;

  const arrCookie = strCookie.split('; ');

  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');

    if (cookieName == arr[0]) {
      const expires = arr[1].split('%3B')[1];
      const now = (Date.now() / 1000).toFixed();
      if (expires > now) {
        return true;
      }
      return false;
    }
  }

  return false;
}
