'use strict';
module.exports = (sequelize, DataTypes) => {
  const Absensi = sequelize.define('Absensi', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    waktu: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tipe: {
      type: DataTypes.ENUM('masuk', 'pulang'),
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'absensis',
    underscored: true,
    timestamps: false
  });

  Absensi.associate = function(models) {
    Absensi.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Absensi;
};