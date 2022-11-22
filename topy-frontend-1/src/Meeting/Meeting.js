import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBTabsLink,
    MDBTabs,
    MDBTabsItem,
  }
  from 'mdb-react-ui-kit';

import {useState} from 'react';
import './Meeting.css';

function Meeting() {

    const [availabelSlots, setAvailableSlots ] = useState([]);
    const [currActivePill, setActivePill] = useState({});
    const [childSelected, setChildSelected] = useState(false);
    const [petSelected, setPetSelected] = useState(false);

    const handleCreateMeeting = () => {
        const parent_id = document.getElementById('parent-id-form').value;
        let parent_child_id = null;
        let parent_pet_id = null;
        if (childSelected) {
            parent_child_id = parent_id;
        }
        if (petSelected) {
            parent_pet_id = parent_id;
        }
        const params = {
            parent_child_id,
            parent_pet_id,
            senior_citizen_id: currActivePill.id,
            start_time: currActivePill.slot 
        };
        const options = { 
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch( 'http://localhost:4000/api/create_meeting', options )
            .then( response => response.json() )
            .then( response => {
                console.log(response)
            });
        
    }

    const handleCheckClick = (type) => {
        if (type === 'child') {
            setChildSelected(!childSelected);
        }
        else {
            setPetSelected(!petSelected);
        }
    }

    const handlePillClick = (name, slot, id) => {
        setActivePill({'name': name, 'slot': slot, 'id': id});
    }

    const handleAvailableSlots = () => {
        let slots = []
        fetch('http://localhost:4000/api/list_available_slots')
        .then(res => {
            return res.json();
        })
        .then((data) => {
            for (const key in data){
                if(data.hasOwnProperty(key)){
                    slots.push({'Name': data[key]['Name'], 'AvailableSlot': data[key]['AvailableSlot'], 'ID': key})
                }
            }
            setAvailableSlots(slots);
        });
    }

    return (
        <MDBContainer className="my-5 gradient-form">
  
        <MDBRow>
  
            <MDBCol col='6' className="mb-5">
                <div className="d-flex flex-column ms-5">
    
                    <div className="text-center">
                        <img src="/toy_station_logo.jpg"
                            style={{width: '185px'}} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">We are the TOPY team</h4>
                    </div>
    
                    <p>Please enter parent details below</p>
                    <MDBInput wrapperClass='mb-4' label='Parent Id' id='parent-id-form'/>
                    <MDBInput wrapperClass='mb-4' label='First Name' id='parent-first-name-form'/>
                    <MDBInput wrapperClass='mb-4' label='Last Name' id='parent-last-name-form'/>
                    <>
                        <MDBCheckbox name='inlineCheck' id='child-checkbox' label='Child' inline onClick={() => {handleCheckClick('child')}}/>
                        <MDBCheckbox name='inlineCheck' id='pet-checkbox' label='Pet' inline onClick={() => {handleCheckClick('pet')}}/>
                    </>
                    <div className="text-center pt-1 mb-5 pb-1">
                        <MDBBtn className="mb-4 w-100 gradient-custom-2"
                            onClick={() => handleAvailableSlots()}
                        >
                            Show available slots
                        </MDBBtn>
                    </div>  
                </div>

                <div className='available-slot-list'>
                    {
                        availabelSlots.map(item => {
                            const id = item['ID']
                            const name = item['Name'];
                            const slots = item['AvailableSlot'];
                            return (
                                <div>
                                    <p>{`Senior Citizen Name: ${name}`}</p>
                                    <MDBTabs className='mb-3'>
                                        {
                                            slots.map(slot => {
                                            const className = Object.keys(currActivePill).length !== 0 && 
                                                currActivePill.name === name && 
                                                currActivePill.slot === slot ? 'active-pill' : 'non-active-pill';
                                            return (
                                                <MDBTabsItem>
                                                    <MDBTabsLink
                                                        onClick={() => handlePillClick(name, slot, id) }
                                                        active={currActivePill && currActivePill.name === name && currActivePill.slot === slot}
                                                        className={className}
                                                    >
                                                        {slot}
                                                    </MDBTabsLink>
                                                </MDBTabsItem>
                                            )})
                                        }
                                    </MDBTabs>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="text-center pt-1 mb-5 pb-1">
                    <MDBBtn className="mb-4 w-100 gradient-custom-2"
                        onClick={() => handleCreateMeeting()}
                    >
                        Create Meeting
                    </MDBBtn>
                </div>  
    
            </MDBCol>
  
        </MDBRow>
  
      </MDBContainer>
    )

}

export default Meeting;