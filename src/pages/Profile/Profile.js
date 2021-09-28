import './Profile.css';
import React, { Component } from 'react';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import EditProfile from '../../components/EditProfile/EditProfile';
import { getCurrentUser } from '../../helpers/auth';



class Profile extends Component {
  render () {
    return (
      <div className="profileContainer">
        <EditProfile />
        <ActivityCard userId={ getCurrentUser().uid }/>
      </div>
    )
  }
}
export default Profile;
