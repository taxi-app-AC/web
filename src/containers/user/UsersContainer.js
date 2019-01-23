import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import LinearIndeterminate from '../../components/common/LinearIndeterminateComponent';
import UsersComponent from '../../components/user/UsersComponent';
import SwitchComponent from '../../components/common/SwitchComponent';
import { StyledUserButton } from '../../media/styledComponents/Components';
import {getUsers} from "../../actions/user";
import { connect } from 'react-redux';

class UsersContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClickFab = this.handleClickFab.bind(this);
    }

    getUsers() {

        let user = JSON.parse(localStorage.getItem('user'));
        let query = `query{
                        users{
                            id
                            name
                            phone
                            active
                            driver
                            view
                        }
                     }`;

        Axios.post(
            'http://localhost:3000/graphql',
            {
                query: query,
                headers: {"Authorization" : `Bearer ${user.token}`}
            }
        ).then( (res) => {

            this.setState({
                isLoaded: true,
            });

            this.props.getUsers(res.data.data.users);

        }).catch((err) => {
            console.log(err);
            this.setState({
                isLoaded: true,
                err
            });
        });
    }

    handleClickFab = () => {
        this.props.history.push("/user/create");
    };

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

            this.setState({ isLoaded: true });

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

            if(Object.keys(this.props.users).length) {
                return <UsersComponent
                            data={Object.values(this.props.users)}
                            columns={columns}
                            handleClickFab={this.handleClickFab}
                       />;
            }
            else {
                return <h1>loading...</h1>
            }
        }
    }
}

const mapDispathcToProps = (dispatch) => {

    return {
        getUsers: (users) => {
            dispatch(getUsers(users))
        }
    }
};

const mapStateToProps = (state) => {

    console.log(state)

    return {
        users: state.users
    }
};

export default connect(mapStateToProps, mapDispathcToProps)(UsersContainer);
