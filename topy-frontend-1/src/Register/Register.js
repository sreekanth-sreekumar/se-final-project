import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
  }
  from 'mdb-react-ui-kit';


  const input_map = {
    'parent': ['First Name', 'Last Name'],
    'senior_citizen': ['First Name', 'Last Name', 'Start Time', 'End Time']
  }
  
  function Register(props) {

    const handleRegister = () => {
      if (props.type === 'parent') {
        const first_name = document.getElementById('First-Name').value;
        const last_name = document.getElementById('Last-Name').value;
        const params = {
          last_name,
          first_name 
        };
        const options = { 
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch( 'http://localhost:4000/api/create_parent', options )
            .then( response => response.json() )
            .then( response => {
                console.log(response)
            });
      }
      else {
        const first_name = document.getElementById('First-Name').value;
        const last_name = document.getElementById('Last-Name').value;
        const start_time = document.getElementById('Start-Time').value;
        const end_time = document.getElementById('End-Time').value;
        const params = {
          last_name,
          first_name ,
          start_time,
          end_time
        };
        const options = { 
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch( 'http://localhost:4000/api/create_senior_citizen', options )
            .then( response => response.json() )
            .then( response => {
                console.log(response)
            });
      }
    }

    const inputs = props.type ? input_map[props.type] : [];
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
  
                <p>Please register by filling up the below</p>

                {
                    inputs.map(input => {
                      const id = input.split(" ").join('-') 
                      return (
                        <MDBInput wrapperClass='mb-4' label={`${input}`} id={id}/>
                      )
                    })
                }

                <div className="text-center pt-1 mb-5 pb-1">
                  <MDBBtn className="mb-4 w-100 gradient-custom-2"
                    onClick={() => handleRegister(props.type)}
                  >
                    Register
                  </MDBBtn>
                </div>  
            </div>
  
          </MDBCol>
  
        </MDBRow>
  
      </MDBContainer>
    );
  }
  
  export default Register;