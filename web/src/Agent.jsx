import React, { Component } from 'react'
import { Grid, Dropdown, Table, Button, Modal, Image, Header, Input, Checkbox, Dimmer, Loader, Icon } from 'semantic-ui-react'
import Axios from 'axios'


const menu=['Balance (e-money)','Set Price','Admin Management','Commision','Fee Management','History','Loan','Repayment','Log Out']
const API_URL='http://localhost:5000'

class AgentSystem extends Component {
    state = { 
        userData:[],
        modal:false,

        editid:-1,
        name:'',
        country:'',
        email:'',
        mobile:'',
        status:false,
        loading:false,

        deleteid:-1,
        deleteloading:false,

        modeadd:false
     }

    componentDidMount=()=>{
        Axios.get(`${API_URL}/agents`)
        .then((res)=>{
            console.log(res.data)
            this.setState({userData:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    addAgentData=()=>{
        this.setState({loading:true})

        var data={
            name:this.state.name,
            country:this.state.country,
            email:this.state.email,
            mobile:this.state.mobile,
            status:this.state.status
        }

        Axios.post(`${API_URL}/agents`,data)
        .then((res)=>{
            console.log(res.data)
            this.setState({userData:res.data})
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            this.setState({loading:false,modal:false,modeadd:false})
        })
    }

    deleteAgentData=()=>{
        this.setState({deleteloading:true})

        var update={
            name:this.state.name,
            country:this.state.country,
            email:this.state.email,
            mobile:this.state.mobile,
            status:this.state.status
        }

        Axios.put(`${API_URL}/agents/delete/${this.state.deleteid}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({userData:res.data})
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            this.setState({deleteloading:false,deleteid:-1})
        })
    }

    updateAgentData=()=>{
        this.setState({loading:true})

        var update={
            name:this.state.name,
            country:this.state.country,
            email:this.state.email,
            mobile:this.state.mobile,
            status:this.state.status
        }

        Axios.put(`${API_URL}/agents/${this.state.editid}`,update)
        .then((res)=>{
            console.log(res.data)
            this.setState({userData:res.data})
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            this.setState({loading:false,modal:false,editid:-1})
        })
    }

    renderData=()=>{
        return this.state.userData.map((val,index)=>{
            return (
                <Table.Row key={index}>
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell>{val.name}</Table.Cell>
                    <Table.Cell>{val.country}</Table.Cell>
                    <Table.Cell>{val.email}</Table.Cell>
                    <Table.Cell>{val.mobile}</Table.Cell>
                    <Table.Cell>{val.status?'Active':'Inactive'}</Table.Cell>
                    <Table.Cell>
                        <Button
                            onClick={()=>{
                                this.setState({
                                    modal:true,
                                    name:val.name,
                                    country:val.country,
                                    email:val.email,
                                    mobile:val.mobile,
                                    status:val.status?true:false,
                                    editid:val.agents_id
                                })
                            }}
                        >
                            Edit
                        </Button>

                        {
                            this.state.deleteid==val.agents_id?
                            <Button
                                color='red'
                                style={{
                                    position:'relative'
                                }}
                                onClick={this.deleteAgentData}
                            >
                                Confirm
                                {
                                    this.state.deleteloading?
                                    <Dimmer active inverted>
                                        <Loader inverted size='tiny'></Loader>
                                    </Dimmer>
                                    : null
                                }
                            </Button>
                            :
                            <Button
                                style={{
                                    width:'94px'
                                }}
                                onClick={()=>{
                                    this.setState({deleteid:val.agents_id})
                                }}
                            >
                                <Icon
                                    name='trash'
                                />
                            </Button>
                        }
                        
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    render() { 
        return ( 

            <div
                style={{
                    backgroundColor:'black',
                    padding:'0 2em',
                    height:'100vh'
                }}
            >
                <Grid>
                    <Grid.Row>
                        <Grid.Column 
                            width={3}
                            style={{
                                padding:'3em'
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor:'white',
                                    borderRadius:'15px'
                                }}
                            >
                                <div
                                    style={{
                                        padding:'2em',
                                        textAlign:'center'
                                    }}
                                >
                                    Agent System
                                </div>
                                {
                                    menu.map((val,index)=>{
                                        return (
                                            <div
                                                key={index}
                                                style={{
                                                    padding:'.7em 1em'
                                                }}
                                            >
                                                {val}
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </Grid.Column>
                        <Grid.Column 
                            width={13}
                            style={{
                                padding:'3em',
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor:'rgba(255,255,255,.1)',
                                    borderRadius:'45px',
                                    // overflow:'hidden',
                                    padding:'1em'
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor:'white',
                                        padding:'1em',
                                        borderRadius:'25px',
                                        display:'inline-block',
                                        cursor:'pointer'
                                    }}
                                    onClick={()=>{
                                        this.setState({
                                            modal:true,
                                            name:'',
                                            country:'',
                                            email:'',
                                            mobile:'',
                                            status:false,

                                            modeadd:true
                                        })
                                    }}
                                >
                                    Add New
                                </div>

                                <div
                                    style={{
                                        display:'inline-block',
                                        marginLeft:'auto',
                                        float:'right',
                                        color:'white',
                                        // padding:'1em'
                                    }}
                                >
                                    {/* <div
                                        style={{
                                            display:'inline-block',
                                            height:'100%'
                                        }}
                                    >
                                        
                                    </div> */}

                                    <div
                                        style={{
                                            display:'inline-block',
                                            width:'50px',
                                            height:'50px',
                                            backgroundImage:'url(https://react.semantic-ui.com/images/avatar/large/matthew.png)',
                                            backgroundSize:'cover',
                                            backgroundPosition:'center',
                                            borderRadius:'30px',
                                            // overflow:'hidden'
                                        }}
                                    />
                                </div>

                                <div
                                    style={{
                                        display:'inline-block',
                                        float:'right',
                                        backgroundColor:'rgba(255,255,255,.1)',
                                        color:'white',
                                        // width:'',
                                        height:'50px',
                                        marginRight:'2em',
                                        borderRadius:'30px'
                                    }}
                                >   
                                    <Dropdown text='English' style={{padding:'1em'}}>
                                        <Dropdown.Menu>
                                        <Dropdown.Item text='Bahasa' />
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </div>


                            </div>


                            <div
                                style={{
                                    marginTop:'2em'
                                }}
                            >
                            <Table striped>
                                <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>#</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Country</Table.HeaderCell>
                                    <Table.HeaderCell>E-mail</Table.HeaderCell>
                                    <Table.HeaderCell>Mobile</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.renderData()}
                                </Table.Body>
                            </Table>
                            </div>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>



                <Modal
                    style={{
                        width:'unset'
                    }}
                    open={this.state.modal}
                    onClose={() => {this.setState({modal:false,editid:-1,modeadd:false})}}
                    onOpen={() => {this.setState({modal:true})}}
                    // trigger={<Button>Edit</Button>}
                >
                    <Modal.Header>Sub Agent</Modal.Header>
                    <Modal.Content>

                        <div
                            style={{marginBottom:'1em'}}
                        >
                            <div
                                style={{
                                    display:'inline-block',
                                    width:'150px'
                                }}
                            >
                                Name
                            </div>
                            <Input
                                placeholder='Name'
                                style={{
                                    marginLeft:'1em',
                                    width:'200px'
                                }}
                                value={this.state.name}
                                onChange={(e)=>{
                                    this.setState({name:e.target.value})
                                }}

                            />
                        </div>

                        <div
                            style={{marginBottom:'1em'}}
                        >
                            <div
                                style={{
                                    display:'inline-block',
                                    width:'150px'
                                }}
                            >
                                Country
                            </div>
                            <Input
                                placeholder='Country'
                                style={{
                                    marginLeft:'1em',
                                    width:'200px'
                                }}
                                value={this.state.country}
                                onChange={(e)=>{
                                    this.setState({country:e.target.value})
                                }}

                            />
                        </div>

                        <div
                            style={{marginBottom:'1em'}}
                        >
                            <div
                                style={{
                                    display:'inline-block',
                                    width:'150px'
                                }}
                            >
                                Email
                            </div>
                            <Input
                                placeholder='E-mail'
                                style={{
                                    marginLeft:'1em',
                                    width:'200px'
                                }}
                                value={this.state.email}
                                onChange={(e)=>{
                                    this.setState({email:e.target.value})
                                }}

                            />
                        </div>

                        <div
                            style={{marginBottom:'1em'}}
                        >
                            <div
                                style={{
                                    display:'inline-block',
                                    width:'150px'
                                }}
                            >
                                Mobile
                            </div>
                            <Input
                                placeholder='Mobile'
                                style={{
                                    marginLeft:'1em',
                                    width:'200px'
                                }}
                                value={this.state.mobile}
                                onChange={(e)=>{
                                    this.setState({mobile:e.target.value})
                                }}

                            />
                        </div>

                        <div
                            style={{marginBottom:'1em'}}
                        >
                            <div
                                style={{
                                    display:'inline-block',
                                    width:'150px'
                                }}
                            >
                                Status
                            </div>
                            <Checkbox 
                                toggle 
                                style={{
                                    marginLeft:'1em',
                                    marginRight:'1em'
                                }}
                                checked={this.state.status}
                                onChange={(e)=>{
                                    this.setState({status:!this.state.status})
                                }}
                                // onClick={(e)=>{
                                //     this.setState({status:e.target.checked})
                                // }}
                            />
                            {
                                this.state.status?
                                'Active'
                                :
                                'Inactive'
                            }
                            {/* <Input
                                type=''
                                placeholder='test'
                                style={{
                                    marginLeft:'1em',
                                    width:'200px'
                                }}
                                value={val.username}
                                onChange={(e)=>{
                                    this.setState({role:e.target.value})
                                }}

                            /> */}
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' >
                            Nope
                        </Button>
                        {
                            this.state.editid>0?
                            <Button
                            // labelPosition='right'
                            // icon='checkmark'
                            onClick={() => {
                                this.updateAgentData()
                            }}
                            // positive
                            >
                                Save
                                {
                                    this.state.loading?
                                    <Dimmer active inverted>
                                        <Loader inverted>Loading</Loader>
                                    </Dimmer>
                                    : null
                                }
                            </Button>
                            : null
                        }
                        {
                            this.state.modeadd?
                            <Button
                            onClick={() => {
                                this.addAgentData()
                            }}
                            >
                                Add
                                {
                                    this.state.loading?
                                    <Dimmer active inverted>
                                        <Loader inverted>Loading</Loader>
                                    </Dimmer>
                                    : null
                                }
                            </Button>
                            : null
                        }
                    </Modal.Actions>
                </Modal>
            </div>
         );
    }
}
 
export default AgentSystem;