import { createHashHistory } from 'history';

const history = createHashHistory();

history.listen(() => {
	setTimeout(() => {
		window.scrollTo(0, 0);
	}, 0);
});

export default history;
