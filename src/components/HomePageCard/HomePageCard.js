import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fsDb } from "../../services/firebase";
import { Card } from 'antd';
import moment from 'moment';
import './HomePageCard.css';

const { Meta } = Card;

class HomePageCard extends Component {

  state = {
    user: ''
  }

  componentDidMount(){
    this.fetchUserInfo()
  }

  fetchUserInfo = () => {
    const userActivityInfo = this.props.activity.user_id
    const nameAndAge = fsDb
      .collection("user_profiles")
      .where("user_id", "==", userActivityInfo).get().then((info) => {
        this.setState({user: info.docs[0] ? info.docs[0].data() : null });
      });

  }

  renderCard = () => {
    const activity = this.props.activity;
    if(!this.state.user?.user_id) return null;
    const dob = this.state?.user?.DOB;

    return(
      <Link
        to={{
          pathname: "/PublicProfile",
          state: {
            userId: this.state.user?.user_id ,
            name: this.state.user?.name,
            aboutme: this.state.user?.aboutme,
            DOB: this.state.user?.DOB,
            userImage: this.state.user?.userImage
          }
        }}
      >
        <Card 
          hoverable
          title= {
            this.state.user.name +
            ' | ' +
            moment(this.state.user?.DOB?.toDate()).toNow('Y')
          }
          className="homepage-card"
          cover= {
            <img className='card-image' alt="example" src={this.state.user?.userImage || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}/>
          }
        >
          <Meta title={activity.title} description="" /> <br/>
            <h5>
              {
                activity.location.street_number +
                ', ' +
                activity.location.street +
                ', ' +
                activity.location.suburb
              }
            </h5>
            <h5>
              {
                moment(activity.time?.toDate()).format('MMMM Do YYYY')
              }
            </h5>
        </Card>
      </Link>
    )
  }

  render() {
    if (!this.state.user?.user_id) return null;
      return(
        <div className='card-container-div'>
          {this.renderCard()}
        </div>
      )
  }
}
export default HomePageCard;
