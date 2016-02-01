/**
 * Spending model
 */
module.exports = function(sequelize, DataTypes) {
    var Spending = sequelize.define("Spending", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        date: DataTypes.DATE,
        item: DataTypes.STRING,
        category: DataTypes.STRING,
        amount: DataTypes.INTEGER
    }/* ,{
        classMethods: {
            associate: function(models) {
                Spending.hasOne(models.User, {
                    foreignKey: 'id',
                    allowNull: false
                });
            }
        }
    }*/);

    return Spending;
};
