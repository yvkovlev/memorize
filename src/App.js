import React from 'react';
import connectVK from '@vkontakte/vkui-connect';
import { connect } from 'react-redux';
import { setActivePanel } from './actions';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from "./panels/Persik";

class App extends React.Component {

	// componentDidMount() {
	// 	connectVK.subscribe((e) => {
	// 		switch (e.detail.type) {
	// 			case 'VKWebAppGetUserInfoResult':
	// 				this.setState({ fetchedUser: e.detail.data });
	// 				break;
	// 			default:
	// 				console.log(e.detail.type);
	// 		}
	// 	});
	// 	connectVK.send('VKWebAppGetUserInfo', {});
	// }

	render() {
		const { activePanel, setActivePanel } = this.props;

		const switchPanel = panel => setActivePanel(panel);

		return (
			<View activePanel={activePanel}>
				<Home id="home" go={switchPanel}/>
				<Persik id="persik" go={switchPanel}/>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	activePanel: state.activePanel,
});

const mapDispatchToProps = dispatch => ({
	setActivePanel: activePanel => dispatch(setActivePanel(activePanel)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
