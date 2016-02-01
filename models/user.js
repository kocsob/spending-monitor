/**
 * User model
 */
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    } ,{
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Spending, {
                    foreignKey: 'owner',
                    allowNull: false
                });
            }
        }
    });

    return User;
};
