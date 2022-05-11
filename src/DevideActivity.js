import React, {Component} from "react";

class DevideActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      error: "",
    };
  }

  decideActivity(lat) {
    const currentMonth = new Date().getMonth();
    const summer = {
      text: 'Yüzmeye Gidebilirsin',
      iconName: 'sun'
    }
    const winter = {
      text: 'Spor Salonuna Gidebilirsin',
      iconName: 'snowflake'
    }

    if (lat < 0) {
      if (currentMonth > 3 && currentMonth < 9) {
        return winter;
      } else {
        return summer;
      }
    } else {
      if (currentMonth > 9 && currentMonth < 4) {
        return winter;
      } else {
        return summer;
      }
    }
  }

  render() {
    const {latitude, error} = this.state;
    console.log(this.decideActivity(latitude));

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
        latitude:position.coords.latitude
        });
      },
      (err) => {
        console.log(err);
        this.setState({
        error:err.message
        });
      }
    );

    if (latitude != 0 && !error) {
      const activity = this.decideActivity(latitude);
      return (
        <h2 className="ui header">
        <i className={`${activity.iconName} outline icon`}></i>
        <div className="content">{activity.text}</div>
        </h2>

      );
    } else if (latitude === 0 && error) {
      return <div>Hata : {error}</div>;
    }
    return <div>Loading...</div>;
  }
}

export default DevideActivity;
