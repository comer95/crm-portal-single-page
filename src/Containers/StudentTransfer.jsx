import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../Actions/TransferActions.js';
import {bindActionCreators} from 'redux';
import Loader from 'halogen/PulseLoader';
import jQuery from 'jquery';
import UserInfoModal from './userinfo_modal.jsx';

class StudentTransfer extends Component {
	constructor(props) {
		super(props);
		if (this.props.route.formname=="TransferCourse") {
			this.state = {ATickConProdId: this.props.params.ATickConProdId};
			this.props.getContentOfATCP(this.state.ATickConProdId);
		} else if (this.props.route.formname=="TransferVoucher") {
			this.state = {AVouchersId: this.props.params.AVouchersId};
			this.props.getContentOfVoucher(this.state.AVouchersId);
		}
		this.renderProductInfo=this.renderProductInfo.bind(this);
		this.renderVoucherInfo=this.renderVoucherInfo.bind(this);
		this.keyDown = this.keyDown.bind(this);
	}
	componentWillReceiveProps(nextProps){
		if (this.props.route.formname=="TransferCourse") {
			if (this.state.ATickConProdId != nextProps.params.ATickConProdId)
				this.setState({
	      			ATickConProdId: nextProps.params.ATickConProdId
	    		}, () => {
	    			nextProps.getContentOfATCP(this.state.ATickConProdId);
	    		});
		} else if (this.props.route.formname=="TransferVoucher") {
			if (this.state.AVouchersId != nextProps.params.AVouchersId)
				this.setState({
	      			AVouchersId: nextProps.params.AVouchersId
	    		}, () => {
	    			nextProps.getContentOfVoucher(this.state.AVouchersId);
	    		});
		}
	}
	keyDown(event) {
		if (event.keyCode === 13) {
            this.props.getContentByParam("checkStudentEmail",event.target.value.trim());
            event.preventDefault();
        } 
	}
	
	renderProductInfo() {
		let data = this.props.fetchedData.data;
		if (!data) return "";
		let info_arr = [];
		info_arr.push(<tr><td><b>Tên Khóa học: </b></td><td>{data.productname}</td></tr>);
		info_arr.push(<tr><td><b>Mã vé: </b></td><td>{data.atickets_code}</td></tr>);
		info_arr.push(
			<tr>
				<td>
					<b>Email người đi học: </b>
				</td>
				<td> 
					<form id="changeStudentForm">
						<div className="form-group">
							<input type="hidden" className="form-control" name="atickcontprodid" value={data.atickcontprodid}/>
		  					<input id="email" type="text" className="form-control" name="email"/>
							</div>
					</form>
					<UserInfoModal formname={this.props.route.formname} email={jQuery('#email').val()}/>
				</td>
			</tr>);
		info_arr.push(<tr><td><b>Tình trạng: </b></td><td>{data.atcp_statusatcp_status}</td></tr>);
		return info_arr;
	}
	renderVoucherInfo() {
		let data = this.props.fetchedData.data;
		if (!data) return "";
		let info_arr = [];
		info_arr.push(<tr><td><b>Mã voucher: </b></td><td>{data.avouchers_code}</td></tr>);
		info_arr.push(<tr><td><b>Loại voucher: </b></td><td>{data.avouchers_type} VND</td></tr>);
		info_arr.push(
			<tr>
				<td>
					<b>Email người nhận: </b>
				</td>
				<td> 
					<form id="changeStudentForm">
						<div className="form-group">
							<input type="hidden" className="form-control" name="voucherid" value={data.avouchersid}/>
		  					<input id="email" type="text" className="form-control" name="email"/>
							</div>
					</form>
					<UserInfoModal formname={this.props.route.formname} email={jQuery('#email').val()}/>
				</td>
			</tr>);
		return info_arr;
	}
	render() {
		return (
		   <div>
		   { this.props.fetchedData.loading === true && <Loader color="#26A65B" size="16px" margin="4px"/> }
	        { this.props.fetchedData.loading === false && 
	        <div className="row">
	          <div className="col-lg-6">
	            <div className="panel panel-default">
	              <div className="panel-heading">Thông tin cơ bản: </div>
	              <table className="table">
	                <tbody>{this.props.route.formname=="TransferCourse"? (this.props.fetchedData.data? this.renderProductInfo() : ""):""}
	                {this.props.route.formname=="TransferVoucher"? (this.props.fetchedData.data? this.renderVoucherInfo() : ""):""}
	                </tbody>
	               </table>
	            </div>
	          </div> 
	        </div>}
	        <div className="row">
	        </div>
	      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		fetchedData: state.StudentTransfer
	};
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({getContentOfATCP: actions.fetchATCPDetail, getContentOfVoucher: actions.fetchVoucherDetail}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentTransfer);