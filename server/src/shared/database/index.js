import { DataTypes, Sequelize } from 'sequelize';
import { forEach, invoke } from 'lodash';

import CategoryModel from '@/category/category.model';
import RoleModel from '@/role/role.model';
import UserModel from '@/user/user.model';

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || ' ',
  process.env.POSTGRES_USER || ' ',
  process.env.POSTGRES_PASSWORD || ' ',
  {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
  },
);

const models = {
  Category: defineModel(CategoryModel),
  Role: defineModel(RoleModel),
  User: defineModel(UserModel),
};

function defineModel(Model) {
  const fields = invoke(Model, 'fields', DataTypes, sequelize) || {};
  const dbOptions = invoke(Model, 'dbOptions', sequelize) || {};
  Object.assign(dbOptions, { sequelize });
  return Model.init(fields, dbOptions);
}

forEach(models, model => {
  invoke(model, 'associate', models);
  addHooks(model, models);
  addScopes(model, models);
});

function addHooks(model, models) {
  const hooks = invoke(model, 'hooks', models);
  forEach(hooks, (hook, type) => model.addHook(type, hook));
}

function addScopes(model, models) {
  const scopes = invoke(model, 'scopes', models);
  forEach(scopes, (scope, name) => model.addScope(name, scope, { override: true }));
}

const { Category, Role, User } = models;
export { Category, Role, User };

export default sequelize;
