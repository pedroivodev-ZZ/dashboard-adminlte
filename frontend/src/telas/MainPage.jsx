import React, { Component } from 'react'

import Header from '../componentes/base_layout/Header'
import MainSidebar from '../componentes/base_layout/MainSidebar'
//import ControlSidebar from '../componentes/base_layout/ControlSidebar'
import Footer from '../componentes/base_layout/Footer'

import $ from 'jquery'
import '../fixes/jquery-fix'

class MainPage extends Component {
    componentDidMount() {
        $('body').prop('class', 'skin-blue sidebar-mini')
    }

    render() {
        return (
            <div className="wrapper">
                <MainSidebar />
                <Header history={this.props.history} />
                {this.props.children}
                <Footer />
                {/* <ControlSidebar /> */}

                {/* Add the sidebar's background. This div must be placed
                    immediately after the control sidebar */}
                <div className="control-sidebar-bg"></div>
            </div>
        )
    }
}

export default MainPage