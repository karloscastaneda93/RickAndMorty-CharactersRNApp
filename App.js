import AppNavigation from './navigation/appNavigation';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
	return (
		<Provider store={store}>
			<AppNavigation />
		</Provider>
	);
}