module.exports = (sequelize, DataTypes, Model) => {

    class Parent extends Model {}

    Parent.init({
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
        }
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'parent', // We need to choose the model name
        freezeTableName: true,
        timestamps: false
      });
      
      return Parent;
}