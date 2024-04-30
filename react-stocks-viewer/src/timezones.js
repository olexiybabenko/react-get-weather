// Array of timezones objects
const TIMEZONES = [
  {
    timezone: -43200,
    diffHours: -12,
    diffMinutes: 0,
  },
  {
    timezone: -39600,
    diffHours: -11,
    diffMinutes: 0,
  },
  {
    timezone: -36000,
    diffHours: -10,
    diffMinutes: 0,
  },
  {
    timezone: -34200,
    diffHours: -9,
    diffMinutes: -30,
  },
  {
    timezone: -32400,
    diffHours: -9,
    diffMinutes: 0,
  },
  {
    timezone: -28800,
    diffHours: -8,
    diffMinutes: 0,
  },
  {
    timezone: -25200,
    diffHours: -7,
    diffMinutes: 0,
  },
  {
    timezone: -21600,
    diffHours: -6,
    diffMinutes: 0,
  },
  {
    timezone: -18000,
    diffHours: -5,
    diffMinutes: 0,
  },
  {
    timezone: -16200,
    diffHours: -4,
    diffMinutes: -30,
  },
  {
    timezone: -14400,
    diffHours: -4,
    diffMinutes: 0,
  },
  {
    timezone: -12600,
    diffHours: -3,
    diffMinutes: -30,
  },
  {
    timezone: -10800,
    diffHours: -3,
    diffMinutes: 0,
  },
  {
    timezone: -7200,
    diffHours: -2,
    diffMinutes: 0,
  },
  {
    timezone: -3600,
    diffHours: -1,
    diffMinutes: 0,
  },
  {
    timezone: 0,
    diffHours: 0,
    diffMinutes: 0,
  },
  {
    timezone: 3600,
    diffHours: 1,
    diffMinutes: 0,
  },
  {
    timezone: 7200,
    diffHours: 2,
    diffMinutes: 0,
  },
  {
    timezone: 10800,
    diffHours: 3,
    diffMinutes: 0,
  },
  {
    timezone: 12600,
    diffHours: 3,
    diffMinutes: 30,
  },
  {
    timezone: 14400,
    diffHours: 4,
    diffMinutes: 0,
  },
  {
    timezone: 16200,
    diffHours: 4,
    diffMinutes: 30,
  },
  {
    timezone: 18000,
    diffHours: 5,
    diffMinutes: 0,
  },
  {
    timezone: 19800,
    diffHours: 5,
    diffMinutes: 30,
  },
  {
    timezone: 20700,
    diffHours: 5,
    diffMinutes: 45,
  },
  {
    timezone: 21600,
    diffHours: 6,
    diffMinutes: 0,
  },
  {
    timezone: 23400,
    diffHours: 6,
    diffMinutes: 30,
  },
  {
    timezone: 25200,
    diffHours: 7,
    diffMinutes: 0,
  },
  {
    timezone: 28800,
    diffHours: 8,
    diffMinutes: 0,
  },
  {
    timezone: 32400,
    diffHours: 9,
    diffMinutes: 0,
  },
  {
    timezone: 34200,
    diffHours: 9,
    diffMinutes: 30,
  },
  {
    timezone: 36000,
    diffHours: 10,
    diffMinutes: 0,
  },
  {
    timezone: 37800,
    diffHours: 10,
    diffMinutes: 30,
  },
  {
    timezone: 39600,
    diffHours: 11,
    diffMinutes: 0,
  },
  {
    timezone: 41400,
    diffHours: 11,
    diffMinutes: 30,
  },
  {
    timezone: 43200,
    diffHours: 12,
    diffMinutes: 0,
  },
  {
    timezone: 45900,
    diffHours: 12,
    diffMinutes: 45,
  },
  {
    timezone: 46800,
    diffHours: 13,
    diffMinutes: 0,
  },
  {
    timezone: 50400,
    diffHours: 14,
    diffMinutes: 0,
  },
];

// Get current time function
function getCurrentTime(weatherData) {
  // Define new Date object
  let now = new Date();
  // Calculate time difference based on timezone
  // difference in hours
  let diffHours = TIMEZONES.find(
    (obj) => obj.timezone === weatherData.timezone
  ).diffHours;
  // difference in minutes
  let diffMinutes = TIMEZONES.find(
    (obj) => obj.timezone === weatherData.timezone
  ).diffMinutes;
  // Define hours and minutes variables
  let minutes = now.getUTCMinutes() + diffMinutes;
  let hours = now.getUTCHours() + diffHours;
  // check if minutes change the hour
  if (minutes < 0) {
    // if minutes are negative
    hours = hours - 1;
    minutes = 60 + minutes;
  } else if (minutes > 60) {
    // if minutes are more than 60
    hours = hours + 1;
    minutes = minutes - 60;
  }
  // Change if hours change the day
  if (hours < 0) {
    // if hours are negative
    hours = 24 - hours;
  } else if (hours > 23) {
    // if hours are greater than 23
    hours = hours - 24;
  }
  // Define currentTime object
  let currentTime = { hours: hours, minutes: minutes };
  // Return
  return currentTime;
}

export { TIMEZONES, getCurrentTime };
