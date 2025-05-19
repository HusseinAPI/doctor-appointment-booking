const defineDoctorModel = (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    'Doctor',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buttonColor: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'button_color',
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'image_url',
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      tableName: 'doctors',
      timestamps: true,
    }
  );

  return Doctor;
};

export default defineDoctorModel;
