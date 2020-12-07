const cron = require("node-cron");

const scheduler = (...args) => {
  return cron.schedule("20 * * * * *", () => {
    for (let i = 0; i < args.length; i++) {
      args[i].run();
    }
  });
};

module.exports = scheduler;
