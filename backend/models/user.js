'use strict';
import { Model } from 'sequelize';

const defineuserModel = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // علاقات مع نماذج أخرى إذا لزم
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};

export default defineuserModel;
