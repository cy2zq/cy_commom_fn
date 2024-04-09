/*
 * @Description: 描述
 * @Author: cy
 * @Date: 2024/4/9
 */
export function setCookie(name, value, daysToLive) {
  let cookie = name + "=" + encodeURIComponent(value);
  if (typeof daysToLive === "number") {
    cookie += "; max-age=" + daysToLive * 24 * 60 * 60; // max-age单位是秒
  }
  document.cookie = cookie + ";path=/";
}

// 使用例子：创建一个名为"username"的cookie，保存值"John Doe"，有效期为7天
// setCookie("username", "John Doe", 7);
export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (name === cookieName) {
      return decodeURIComponent(cookieValue);
    }
  }
  return "";
}

// 使用例子：读取名为"username"的cookie的值
// console.log(getCookie("username")); // 输出：John Doe
export function deleteCookie(name) {
  setCookie(name, "", -1); // 设置为过去的时间即可删除
}

// 使用例子：删除名为"username"的cookie
// deleteCookie("username");
