function getCookie(name: string) {
  const match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + name + "=([^;]*)")
  );
  return match ? match[1] : null;
}

// copied from https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname: string, cvalue: string, exdays: number) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export { getCookie, setCookie };
