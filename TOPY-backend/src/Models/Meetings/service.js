const { connect } = require('../../db.config');

class MeetingService {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        // this.db.sequelize.sync({ alter: true }).then(() => {
        // //     console.log("Drop and re-sync db.");
        // // });
    }

    async getMeetings() {
        
        try {
            const meetings = await this.db.meeting.findAll();
            return meetings;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async getMeetingById(id) {
        try {
            const meeting = await this.db.meeting.findAll({
                where: {
                    ID: id
                }
            });
            return meeting;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async getMeetingBySeniorCitizen(id) {
        try {
            const meeting = await this.db.meeting.findAll({
                where: {
                    senior_citizen_id: id
                }
            })
            return meeting;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async createMeeting(parent_child_id, parent_pet_id, senior_citizen_id, start_time) {
        try {
            await this.db.meeting.create({
                parent_child_id: parent_child_id,
                parent_pet_id: parent_pet_id,
                senior_citizen_id: senior_citizen_id,
                start_time: start_time
            })
            return true
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async deleteMeetingById(id) {
        try {
            await this.db.meeting.destroy({
                where: {
                    ID: id
                }
            })
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updateMeetingById(id, parent_child_id, parent_pet_id, senior_citizen_id, start_time) {
        try {
            await this.db.meeting.update({
                parent_child_id: parent_child_id,
                parent_pet_id: parent_pet_id,
                senior_citizen_id: senior_citizen_id,
                start_time: start_time
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

module.exports = new MeetingService();