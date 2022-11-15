const ParentService = require('./Models/Parents/service');
const SeniorCitizenService = require('./Models/SeniorCitizen/service');
const MeetingService = require('./Models/Meetings/service');

class Controller {

    async createParent(first_name, last_name) {
        const result = await ParentService.createParent(first_name, last_name);
        
        if (!result || result.length == 0) {
            return false
        }
        return true
    }

    async createSeniorCitizen(first_name, last_name, start_time, end_time) {
        const result = await SeniorCitizenService.createSeniorCitizen(first_name, last_name, start_time, end_time, 0.0);
        if (!result || result.length == 0) {
            return false
        }
        return true
    }

    async getAvailableSlots() {
        let availableSlots = {}
        const seniorCitizens = await SeniorCitizenService.getSeniorCitizens();
        if (seniorCitizens.length !== 0) {
            for (let i =0; i < seniorCitizens.length; i++) {
                const citizen = seniorCitizens[i]
                let availableMeetings = Array.from({length: (citizen.end_time - citizen.start_time)/2}, 
                    (_, i) => citizen.start_time + (i * 2));
                const meetings = await MeetingService.getMeetingBySeniorCitizen(citizen.ID);
                if (meetings) {
                    const unavailableMeetings = meetings.map(meeting => meeting.start_time);

                    unavailableMeetings.forEach(item => {
                        availableMeetings = availableMeetings.filter(it => it !== item)
                    })
                }
                availableSlots[citizen.ID] = {'Name': citizen.first_name + citizen.last_name, 'AvailableSlot':  availableMeetings};
            }
        }
        return availableSlots
    }

    async createMeeting(parent_child_id, parent_pet_id, senior_citizen_id, start_time) {
        const result = await MeetingService.createMeeting(parent_child_id, parent_pet_id, senior_citizen_id, start_time);
        if (!result || result.length == 0) {
            return false
        }
        return true
    }

}

module.exports = new Controller()