module.exports = (sequelize, DataTypes, Model) => {

    class Meeting extends Model {}

    Meeting.init({
        // Model attributes are defined here
        ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        parent_child_id: {
          type: DataTypes.INTEGER
          // allowNull defaults to true
        },
        parent_pet_id: {
            type: DataTypes.INTEGER
            // allowNull defaults to true
        },
        senior_citizen_id: {
            type: DataTypes.INTEGER
        },
        start_time: {
          type: DataTypes.INTEGER
          // allowNull defaults to true
        }
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'parent', // We need to choose the model name
        freezeTableName: true,
        timestamps: false
      });
      
      return Meeting;
}