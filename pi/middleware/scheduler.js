const cron = require("node-cron");

const scheduler = (timeout, ...args) => {
  return cron.schedule(timeout, () => {
    for (let i = 0; i < args.length; i++) {
      args[i].run();
    }
  });
};

module.exports = scheduler;
