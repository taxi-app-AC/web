import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import LinearIndeterminate from '../../components/common/LinearIndeterminateComponent';
import UsersComponent from '../../components/user/UsersComponent';
import SwitchComponent from '../../components/common/SwitchComponent';
import { StyledUserButton, StyledButtonLink } from '../../media/styledComponents/Components';
import {getUsers} from "../../actions";
import { connect } from 'react-redux'

class UsersContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    getUsers() {
        console.log('heee')

        let user = JSON.parse(localStorage.getItem('user'));

        Axios.get(
            'http://localhost:3000/api/user',
            {
                headers: {"Authorization" : `Bearer ${user.token}`}
            }
        ).then( (res) => {

            this.setState({
                isLoaded: true,
            });

            console.log(res);

            this.props.getUsers(res.data);

        })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isLoaded: true,
                    err
                });
            });
    }

    handleClick = async (userId, request) => {

        this.setState({ isLoaded: false });

        let statusRequest = request === 'accept' ? 1 : 0;

        let user = JSON.parse(localStorage.getItem('user'));

        try {

            const response = await
                Axios.get(
                    'http://localhost:3000/api/user/request/' + userId + '/' + statusRequest,
                    {
                        headers: {"Authorization" : `Bearer ${user.token}`}
                    });

            // this.setState({ isLoaded: true });

        } catch (error) {

            // this.setState({ isLoaded: true });
            console.log(error)
        }

    };

    componentDidMount() {
        this.getUsers()
    }

    // componentDidUpdate(prevProps, prevState) {
    //
    //     if (prevState.isLoaded){
    //         console.log('heee')
    //         this.getUsers()
    //     }
    //     console.log(prevState)
    // }

    render() {
        const { err, isLoaded } = this.state;
        if (err) {
            return <div>Error: {err.message}</div>;
        } else if (!isLoaded) {
            return <LinearIndeterminate />;
        } else {

            const columns = [{
                id: 'userName',
                Header: 'User Name',
                accessor: 'name',
                Cell: props => {

                    console.log('column: ',props);
                    return (
                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                                <Link to={'/user/' + props.original._id}>{props.value}</Link>
                            </Grid>
                            {
                                 (!props.original.view && props.original.driver)
                                    ?   <Grid item xs={6}>
                                             <StyledUserButton
                                                 color="primary"
                                                 onClick={() => this.handleClick(props.original._id, 'accept')}
                                             >
                                                 accept
                                             </StyledUserButton>
                                             <StyledUserButton
                                                 color="secondary"
                                                 onClick={() => this.handleClick(props.original._id, 'reject')}
                                             >
                                                 decline
                                             </StyledUserButton>
                                         </Grid>
                                    : ''
                            }
                        </Grid>
                    );
                }
            }, {
                id: 'userPhone',
                Header: 'Phone',
                accessor: 'phone',
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }, {
                id: 'userActive',
                Header: 'Activity',
                accessor: 'active',
                Cell: props => {
                    return <SwitchComponent userId={props.original._id} checked={props.value} />;
                }
            }, {
                id: 'userDriver',
                Header: 'Driver',
                accessor: 'driver',
                Cell: props => (props.value === 1) ? 'driver' : 'user'
            }];

            console.log('render ',this.props.users);
            console.log('render ',Object.keys(this.props.users).length);

            // return <h1>32</h1>;
            if(Object.keys(this.props.users).length) {
                return <UsersComponent data={Object.values(this.props.users)} columns={columns} getTrProps={this.getTrProps}/>;
            }
            else {
                return <h1>loading...</h1>
            }
        }
    }
}

// UsersContainer.propTypes = {
//     data: PropTypes.object.isRequired,
//     columns: PropTypes.object.isRequired
// };

const mapDispathcToProps = (dispatch) => {

    return {
        getUsers: (users) => {
            dispatch(getUsers(users))
        }
    }
}

const mapStateToProps = (state) => {

    console.log(state.users);

    return {
        users: state.users
    }
}

export default connect(mapStateToProps, mapDispathcToProps)(UsersContainer);