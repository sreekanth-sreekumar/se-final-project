module.exports = (sequelize, DataTypes, Model) => {

    class SeniorCitizen extends Model {}

    SeniorCitizen.init({
        // Model attributes are defined here
        ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        first_name: {
          type: DataTypes.STRING
          // allowNull defaults to true
        },
        last_name: {
          type: DataTypes.STRING
          // allowNull defaults to true
        },
        start_time: {
            type: DataTypes.INTEGER
        },
        end_time: {
            type: DataTypes.INTEGER
        },
        avg_rating: {
            type: DataTypes.DOUBLE
        }
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'senior_citizen', // We need to choose the model name
        freezeTableName: true,
        timestamps: false
      });
      
      return SeniorCitizen;
}