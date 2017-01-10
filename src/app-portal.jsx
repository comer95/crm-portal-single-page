import React, {Component} from 'react';
import ReactDOM from 'react-dom';
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.min.js');
require('./sb-admin-2.css');
import store from './store.jsx';
import NavBar from './Components/Navbars.jsx';
import MainContent from './Components/Maincontent.jsx';
import Datatable from './Containers/datatable.jsx';
import FAQ from './Containers/FAQ.jsx';
import AddTicket from './Containers/addticket.jsx';
import TicketDetail from './Containers/ticketdetail.jsx';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, Link, hashHistory } from 'react-router';


class App extends Component  {
	render() {
		return (
		<div id="wrapper">
			<NavBar/>
			{this.props.children}
		</div>
		);
	}
};

class Test extends Component  {
	render() {
		return (
		<div id="page-wrapper">
			<a onClick={() => console.log(store.getState())}><h1>something wrong</h1></a>
		</div>
		);
	}
};

window.onload = () => {
  ReactDOM.render((
  		<Provider store={store}>
  			<Router history={hashHistory}>
        		<Route path="/" component={App}>
        			<IndexRedirect to="/HelpDesk" />
        			<Route path="HelpDesk" component={MainContent} title="Help Desk">
        				<IndexRedirect to="/HelpDesk/main" />
        				<Route path="/HelpDesk/main" component={Datatable} tablename="HelpDesk"/>
        				<Route path="/HelpDesk/add" component={AddTicket}/>
                <Route path="/HelpDesk/ticket/:ticketId" component={TicketDetail}/>
        			</Route>
        			<Route path="Faq" component={MainContent} title="FAQ"> 
        				<IndexRedirect to="/Faq/main" />
        				<Route path="/Faq/main" component={FAQ}/>
        			</Route>
              <Route path="Contacts" component={MainContent} title="Contacts"> 
                <IndexRedirect to="/Contacts/main"/>
                <Route path ="/Contacts/main" />
              </Route>
        		</Route>
        	</Router>
  		</Provider>
  		)
  		
  	, document.getElementById('body'));
};