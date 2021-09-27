/* eslint-disable no-console */
const getTimeStamp = () => new Date().toISOString();

export default {
  info: (message, ...data) => {
    console.info(`[${getTimeStamp()}]: [INFO]: ${message}`, ...data);
  },
  error: (message, ...data) => {
    console.error(`[${getTimeStamp()}]: [ERROR]: ${message}`, ...data);
  },
};
