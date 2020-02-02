import React, { Component } from 'react'
import ImagePost from '../../common/image-post/ImagePost'
export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileData: ""
		}
		this.getSelfData = this.getSelfData.bind(this);
	}

	componentDidMount() {
		this.getSelfData();
		this.getSelefMediaData();
	}

	getSelfData() {
		const sessionStorageData = JSON.parse(sessionStorage.getItem("selfData"));
		if (sessionStorageData === null) {
			fetch("https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784")
				.then((res) => res.json())
				.then(res => {
					sessionStorage.setItem("selfData", JSON.stringify(res))
					window.location.reload();
				})
		}
		
	}

	getSelefMediaData() {
		fetch("https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784")
			.then((res) => res.json())
			.then(res => this.setState({profileData: res}))
	}

	render() {
		console.log(this.state.profileData);
		return (
				<div>
					{this.state.profileData && this.state.profileData.data.map((insta, index) => {
						return  <ImagePost userData={insta} key={index}/>
					})}
				</div>
		)
	}
}

export default Home