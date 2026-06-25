function displayTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

module.exports = { displayTime };
