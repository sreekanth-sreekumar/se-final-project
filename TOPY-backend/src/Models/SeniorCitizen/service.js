const { connect } = require('../../db.config');

class SeniorCitizenService {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        // this.db.sequelize.sync({ force: true }).then(() => {
        //     console.log("Drop and re-sync db.");
        // });
    }

    async getSeniorCitizens() {
        
        try {
            const result = await this.db.senior_citizen.findAll();
            const senior_citizens = result.map(item => item.dataValues);
            return senior_citizens;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async getSeniorCitizenById(id) {
        try {
            const senior_citizen = await this.db.senior_citizen.findAll({
                where: {
                    ID: id
                }
            });
            return senior_citizen;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async createSeniorCitizen(first_name, last_name, start_time, end_time, avg_rating) {
        try {
            await this.db.senior_citizen.create({
                first_name: first_name,
                last_name: last_name,
                start_time: start_time,
                end_time: end_time,
                avg_rating: avg_rating
            })
            return true

        } catch (err) {
            console.log(err);
            return false
        }
    }

    async deleteSeniorCitizenById(id) {
        try {
            await this.db.senior_citizen.destroy({
                where: {
                    ID: id
                }
            })
            return true
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updateSeniorCitizenById(id, first_name, last_name,  start_time, end_time, avg_rating) {
        try {
            await this.db.senior_citizen.update({
                first_name: first_name,
                last_name: last_name,
                start_time: start_time,
                end_time: end_time,
                avg_rating: avg_rating
            }, {
                where: {ID: id}
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = new SeniorCitizenService();