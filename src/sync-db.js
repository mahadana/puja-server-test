import { sequelize } from "./lib/db";

(async () => {
  await sequelize.sync({ force: false });
})();
