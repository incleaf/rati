const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const getNextDisplayAt = memorizationLevel => {
  let defferedTime = 0;
  switch (memorizationLevel) {
    case 1:
      defferedTime = 2 * HOUR;
      break;
    case 2:
      defferedTime = 1 * DAY;
      break;
    case 3:
      defferedTime = 3 * DAY;
      break;
    case 4:
      defferedTime = 7 * DAY;
      break;
    case 5:
      defferedTime = 14 * DAY;
      break;
    case 6:
      defferedTime = 30 * DAY;
    default:
      defferedTime = 0;
  }

  return Date.now() + defferedTime;
};
