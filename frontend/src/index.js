// Bootstrap 3.3.7
import 'admin-lte/bower_components/bootstrap/dist/css/bootstrap.min.css'
// Font Awesome
import 'admin-lte/bower_components/font-awesome/css/font-awesome.min.css'
// Ionicons
import 'admin-lte/bower_components/Ionicons/css/ionicons.min.css'
// Theme style
import 'admin-lte/dist/css/AdminLTE.min.css'
// AdminLTE Skins. Choose a skin from the css/skins
//    folder instead of downloading all of them to reduce the load.
import 'admin-lte/dist/css/skins/_all-skins.min.css'
// Morris chart
import 'admin-lte/bower_components/morris.js/morris.css'
// jvectormap
import 'admin-lte/bower_components/jvectormap/jquery-jvectormap.css'
// Date Picker
import 'admin-lte/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
// Daterange picker
import 'admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker.css'
// bootstrap wysihtml5 - text editor
import 'admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css'
import './css/geral.css'

import 'jquery/src/jquery'
// jQuery UI 1.11.4
import 'admin-lte/bower_components/jquery-ui/jquery-ui.min'

import './fixes/confict-adminlte-fix'

// Bootstrap 3.3.7
import 'admin-lte/bower_components/bootstrap/dist/js/bootstrap.min'
// Morris.js charts
import 'admin-lte/bower_components/raphael/raphael.min'
import 'admin-lte/bower_components/morris.js/morris.min'
// Sparkline
import 'admin-lte/bower_components/jquery-sparkline/dist/jquery.sparkline.min'
// jvectormap
import 'admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.min'
import 'admin-lte/plugins/jvectormap/jquery-jvectormap-world-mill-en'
// jQuery Knob Chart
import 'admin-lte/bower_components/jquery-knob/dist/jquery.knob.min'
// daterangepicker
import 'admin-lte/bower_components/moment/min/moment.min'
import 'admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker'
// datepicker
import 'admin-lte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min'
// Bootstrap WYSIHTML5
//import 'admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js'
// Slimscroll
import 'admin-lte/bower_components/jquery-slimscroll/jquery.slimscroll.min'
// FastClick
import 'admin-lte/bower_components/fastclick/lib/fastclick'
// AdminLTE App
//import 'admin-lte/dist/js/adminlte.min'
//import 'admin-lte/dist/js/adminlte'
import './fixes/adminlte-fix'

import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'

import Login from './telas/Login'
import MainPage from './telas/MainPage'

import Home from './telas/Home'
import Tela1 from './telas/Tela1'
import Tela2 from './telas/Tela2'

import Telas from './telas/Telas'
import ControleAcessos from './telas/ControleAcessos'
import ControleUsuarios from './telas/ControleUsuarios'

import registerServiceWorker from './registerServiceWorker'

const Main = () => (
    <BrowserRouter>
        <MainPage>
            <Route exact path='/main/home' component={Home} />
            <Route path='/main/tela1' component={Tela1} />
            <Route path='/main/tela2' component={Tela2} />
            <Route path='/main/controle_acessos' component={ControleAcessos} />
            <Route path='/main/controle_usuarios' component={ControleUsuarios} />
            <Route path='/main/telas' component={Telas} />
        </MainPage>
    </BrowserRouter>
)

const Inicial = () => (
    <Switch>
        <Route exact path='/login' component={Login} />
        <Route path='/main' component={Main} />
    </Switch>
)

ReactDOM.render(
    <BrowserRouter>
        <Inicial />
    </BrowserRouter>,
    document.getElementById('root'))

registerServiceWorker()
