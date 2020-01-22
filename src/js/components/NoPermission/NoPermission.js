import React, {Component} from 'react';
export default class NoPermission extends Component {
    render() {
        return (
            <div className="content-dashboard">
                <div className="container">
                    <div className="content-dashboard-row">
                        <div className="content-dashboard">
                            <h1 className="permission">You don't have permission to see that page.</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
