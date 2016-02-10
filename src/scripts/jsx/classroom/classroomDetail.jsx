var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Button } from 'antd';

var ClassroomDetail = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function() {
		return {
			
		}
	},
	componentDidMount: function() {

	},
	crumb: {
		current: '教室详情',
		items:[{
			href: '#/classroom/list',
			title: '教室管理'
		}]
	},
	render: function() {
		return (
			<div className="app-content userdetail animate">
				<AppContentHeader crumb={this.crumb} />
				<div className="app-content-body">
					<div className="ui-panel last">
						<div className="ui-panel-header">
							<h1>教室信息</h1>
						</div>
						<div className="ui-panel-body">
							<table className="classroom-detail">
								<tbody>
									<tr>
										<td className="tar">教室名称</td>
										<td><input className="ui-input" name="name" type="text" value="" /></td>
									</tr>
									<tr>
										<td className="tar">所在城市</td>
										<td>
											<select className="ui-select" value="1">
					              <option value="1">深圳市</option>
					            </select>
										</td>
									</tr>
									<tr>
										<td className="tar">所在区域</td>
										<td>
											<select className="ui-select" value="1">
					              <option value="1">南山区</option>
					            </select>
										</td>
									</tr>
									<tr>
										<td className="tar">详细地址</td>
										<td>
											<input className="ui-input" name="name" type="text" value="" />
										</td>
									</tr>
									<tr>
										<td className="tar">联系人姓名(1)</td>
										<td>
											<input className="ui-input" name="name" type="text" value="" />
										</td>
									</tr>
									<tr>
										<td className="tar">联系人电话(1)</td>
										<td>
											<input className="ui-input" name="name" type="text" value="" />
										</td>
									</tr>
									<tr>
										<td className="tar">联系人职位(1)</td>
										<td>
											<input className="ui-input" name="name" type="text" value="" />
										</td>
									</tr>
									<tr>
										<td className="tar">联系人姓名(2)</td>
										<td>
											<input className="ui-input" name="name" type="text" value="" />
										</td>
									</tr>
									<tr>
										<td className="tar">联系人电话(2)</td>
										<td>
											<input className="ui-input" name="name" type="text" value="" />
										</td>
									</tr>
									<tr>
										<td className="tar">联系人职位(2)</td>
										<td>
											<input className="ui-input" name="name" type="text" value="" />
										</td>
									</tr>
									<tr>
										<td className="tar">提供设备</td>
										<td>
											<input className="ui-input" name="name" type="text" value="" />
										</td>
									</tr>
									<tr>
										<td className="tar">百度关键字</td>
										<td>
											<input className="ui-input" name="name" type="text" value="" />
										</td>
									</tr>
									<tr>
										<td className="tar"></td>
										<td>
											<Button type="primary" onClick={function(){}}>保 存</Button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}

});
// "id": 1,
// "name": "形象力",
// "supplier": "深圳英盟欣科技有限公司",
// "maxseats": 50,
// "province": "广东省",
// "city": "深圳市",
// "area": "南山区",
// "address": "农林路69号深国投广场一号写字楼402",
// "contactHuman1":"oliver",
// "contactNumber1":"18902461234",
// "contactHuman2":"oliver",
// "contactNumber2":"18902461234",
// "contactJobTitle1":"master",
// "contactJobTitle2":"master",
// "devices":"投影、音响、白板",
// "baiduKeywords":"清华大学研究院"
module.exports = ClassroomDetail;