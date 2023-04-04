function sanitizeNickname(nickname) {
  // Replace any special characters with an empty string
  return nickname.replace(/[^\w\s]/gi, "");
}

function getNickname() {
  var nickname = "";

  // Check if the nickname is stored in localStorage and is not expired
  var storedNickname = localStorage.getItem("nickname");
  var storedTimestamp = localStorage.getItem("nickname_timestamp");
  if (
    !storedNickname ||
    !storedTimestamp ||
    Date.now() - storedTimestamp > 30 * 24 * 60 * 60 * 1000
  ) {
    // Prompt the user for their nickname
    nickname = prompt("Please enter your nickname:");

    // Validate and sanitize the nickname input
    if (nickname && nickname.trim().length > 0) {
      nickname = sanitizeNickname(nickname.trim());
      // Store the nickname in localStorage with timestamp
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("nickname_timestamp", Date.now());
    }
  } else {
    // Retrieve the nickname from localStorage
    nickname = storedNickname;
  }

  // Return the sanitized nickname as a string
  return nickname.trim();
}
