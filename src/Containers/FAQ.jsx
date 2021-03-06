import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../Actions/FAQActions.js';
import {bindActionCreators} from 'redux';
import Loader from 'halogen/PulseLoader';

class FAQ extends Component {
	constructor(props) {
		super(props);
		this.props.refreshContent("Faq");
		this.renderCategories=this.renderCategories.bind(this);
		this.renderFaq=this.renderFaq.bind(this);
	}
	renderCategories() {
		let faq = this.props.faqdata.data;
		let categories = [];
		faq.faqcategory.map((category, index) => {
			categories.push(<li className={index==0? "list-group-item active" : "list-group-item"}><a href={"#p"+index} role="tab" data-toggle="tab">{category}</a></li>);
		});
		
		return categories;
	}
	renderFaq() {
		let faq = this.props.faqdata.data;
		let QaA = [];
		let QuesTab =[];
		faq.faqcategory.map((category, index) => {
			let arrcate = [];
			faq.faq.map((faqa) => {
				if (faqa.category == category) {
					arrcate.push(faqa);
				}
			});
			QaA[index] = arrcate;
		});
		QaA.map((Ques, index) => {
			let children = [];
			Ques.map((eachtab) => {
				children.push(
					<div className="panel panel-default">
					   <div className="panel-heading">
					      <h4 className="panel-title">
					         <a data-toggle="collapse" data-parent="#accordion" data-target={'#'+eachtab.faqno} dangerouslySetInnerHTML={{__html: eachtab.faqno + " - " + eachtab.question}} />
					      </h4>
					   </div>
					   <div id={eachtab.faqno} className="panel-collapse collapse in">
					      <div className="panel-body">
					         <h4>Answer: </h4>
					         <p dangerouslySetInnerHTML={{__html: eachtab.answer}} />
					         <br/>
					         <h4>Related Product: {faq.product.map((product)=>{ return eachtab.product_id == product.productid ? product.productname : "" })}</h4>
					         <div className="row"> </div>
					      </div>
					   </div>
					</div>);
			});
			QuesTab.push(<div id={'p'+index} className={index==0? "tab-pane active" : "tab-pane"}>
					<div id="accordion">
						{children}
					</div>
					</div>);
		});
		return QuesTab;
	}
	render() {
		return (
			
			<div className="row">
				<div className="col-lg-12">
					<h3>Categories</h3>
				</div>
				<div className="col-lg-3">
					<ul className="list-group" role="tablist">
						{ this.props.faqdata.loading === true && <Loader color="#26A65B" size="16px" margin="4px"/> }
						{ this.props.faqdata.loading === false && this.renderCategories() }
					</ul>
				</div>
				<div className="col-lg-9">
					<div className="tab-content">
						{ this.props.faqdata.loading === false && this.renderFaq() }
					</div>
				</div>
			</div>
			);
	}
}

function mapStateToProps(state) {
	return {
		faqdata: state.faq
	};
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({refreshContent: actions.refreshFAQ}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);