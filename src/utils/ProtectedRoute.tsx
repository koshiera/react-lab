export {}

// import React, { useEffect, useContext, useCallback } from 'react';
// import Cookies from 'universal-cookie';

// import {
// 	Route,
// 	RouteProps,
// 	Redirect,
// 	useHistory,
// 	useLocation
// } from 'react-router-dom';

// import { Account } from '../service';

// const cookies = new Cookies();

// const PAGE_HOME = `/clients`;
// const PAGE_LOGIN = `/signin`;

// type ProtectedRouteProps = React.FC<RouteProps & {
// 	session?: number | number[],
// 	title?: string
// }>

// export const ProtectedRoute: ProtectedRouteProps = ({ session = 0, component, title = '', ...rest }) => {

// 	const { replace } = useHistory();
// 	const { pathname } = useLocation();

// 	const { status, setter, user } = useContext(Account.context);

// 	const leave = useCallback((logout?: boolean, message?: boolean) => {

// 		setter(-1, null, null);

// 		if (logout) {
// 			cookies.remove('session_id');
// 		}

// 		replace({
// 			pathname: PAGE_LOGIN,
// 			state: {
// 				referrer: pathname,
// 				message,
// 			}
// 		});

// 	}, [ setter, replace, pathname ]);

// 	useEffect(() => {

// 		if (!cookies.get('session_id')) {
// 			leave(false);
// 			return () => {};
// 		}

// 		const { promise, cancel } = Account.session();

// 		promise.then(({ account, client_configuration }) => {

// 			// TODO: add equality check
// 			if (!user) {
// 				setter(1, account, client_configuration);
// 			}

// 		}, (e) => {

// 			if (!e.is_aborted) {
// 				leave(true);
// 			}

// 		});

// 		return () => cancel();

// 	// eslint-disable-next-line
// 	}, [ leave, session, setter ]);

// 	if (session === -1 && status === 1) {
// 		return <Redirect to={PAGE_HOME} />
// 	}

// 	if (Array.isArray(session) && status !== 1) {
// 		return null;
// 	}

// 	if (Array.isArray(session) && !session.includes(user?.user_type || 0)) {
// 		return <Redirect to={PAGE_HOME} />
// 	}

// 	return <Route {...rest} component={component} />

// }
