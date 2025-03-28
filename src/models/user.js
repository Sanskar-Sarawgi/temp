'use strict';
import { Model } from 'sequelize'
// import { generatePasswordHash } from '../services/session.js';

class User extends Model {
  static init(sequelize, DataTypes) {
    const user_model = super.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'User'
    });

    user_model.addHook('beforeSave', async (user) => {
      const { generatePasswordHash } = await import('../services/session.js');
      user.password_hash = await generatePasswordHash(user.password_hash)
    })
    
    return user_model
  }

  static associate(models) {
    // define association here
  }
}

export default User