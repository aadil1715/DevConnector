// import React,{Fragment, useEffect} from 'react';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import {getCurrentProfile} from '../../actions/profile';
// import Spinner from '../layout/Spinner';

// const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading}}) => {

        

//         useEffect(()=>{
//             getCurrentProfile();
//         },[getCurrentProfile]);

//         console.log(getCurrentProfile,user);
//         return profile && loading === null ? <Spinner/> : <Fragment>
//             <h1 className="large text-primary">Dashboard</h1>
//             <p className="lead">
//             <i className="fas fa-user"></i> Welcome {user && user.name}</p>
//         </Fragment>
// }

// Dashboard.propTypes = {
//     getCurrentProfile: PropTypes.func.isRequired,
//     auth:PropTypes.object.isRequired,
//     profile:PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth,
//     profile: state.profile
// })

// export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);




import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
            <h1>HELLO IN FIRST</h1>
          </Fragment>
      ) : (
        <Fragment>
          <h1>HELLO IN SECOND</h1>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile})(
  Dashboard
);

