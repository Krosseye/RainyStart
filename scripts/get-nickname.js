function getNickname() {
  var nickname = "";

  // Check if the nickname cookie exists
  if (document.cookie.indexOf("nickname=") == -1) {
    // Prompt the user for their nickname
    nickname = prompt("Please enter your nickname:");

    // Validate and sanitize the nickname input
    if (nickname && nickname.trim().length > 0) {
      // Set the nickname cookie with HttpOnly and Secure flags
      var date = new Date();
      date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
      var expires = "expires=" + date.toUTCString();
      var cookieValue =
        "nickname=" +
        encodeURIComponent(nickname.trim()) +
        ";" +
        expires +
        ";path=/;secure;SameSite=Strict;HttpOnly";
      document.cookie = cookieValue;
    }
  } else {
    // Retrieve the nickname from the cookie
    var cookieArray = document.cookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf("nickname=") == 0) {
        nickname = decodeURIComponent(
          cookie.substring("nickname=".length, cookie.length)
        );
        break;
      }
    }
  }

  // Return the sanitized nickname as a string
  return nickname.trim();
}
