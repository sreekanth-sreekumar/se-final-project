const { connect } = require('../../db.config');

class ParentService {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        // this.db.sequelize.sync({ alter: true }).then(() => {
        //     console.log("Drop and re-sync db.");
        // });
    }

    async getParents() {
        
        try {
            const parents = await this.db.parent.findAll();
            return parents;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async getParentById(id) {
        try {
            const parent = await this.db.parent.findAll({
                where: {
                    ID: id
                }
            });
            return parent;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async createParent(first_name, last_name) {
        try {
            await this.db.parent.create({
                first_name: first_name,
                last_name: last_name 
            })
            return true
        } catch (err) {
            console.log(err);
            return false
        }
    }

    async deleteParentById(id) {
        try {
            await this.db.parent.destroy({
                where: {
                    ID: id
                }
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updateParentById(id, first_name, last_name) {
        try {
            await this.db.parent.update({first_name: first_name, last_name: last_name}, {
                where: {ID: id}
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = new ParentService();