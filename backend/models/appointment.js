const defineAppointmentModel = (Sequelize, DataTypes) => {
  const Appointement = Sequelize.define(
    'Appointement',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name',
      },
      dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'date_of_birth',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfAppointment: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'date_of_appointment',
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
      tableName: 'appointments',
      timestamps: true,
    }
  );

  return Appointement;
};

export default defineAppointmentModel;
