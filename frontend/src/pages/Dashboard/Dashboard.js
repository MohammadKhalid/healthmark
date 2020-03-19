import React, { Component } from 'react';

import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';

import * as Utilities from '../../helper/Utilities';
import history from '../../History';
import Storage from '../../helper/Storage';


const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const bar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const doughnut = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

const radar = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const pie = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

const polar = {
  datasets: [
    {
      data: [
        11,
        16,
        7,
        3,
        14,
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB',
      ],
      label: 'My dataset' // for legend
    }],
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue',
  ],
};
const options = {
  tooltips: {
    enabled: false,
  },
  maintainAspectRatio: false
}
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: '/Login'
    }
    this.UserSession();
  }
  UserSession = () => {
    Utilities.localStorage_GetKey("userObject")
      .then(response => {
        if (response != null) {
          Storage.userObject = JSON.parse(response);
          history.push("/")
        }
        else {

          history.push("/Login")
        }
      })

  }
  render() {

    return (
      <div id="App">
        <div className="row tile_count bg-white m-2" >
          <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
            <span className="count_top"><i className="fa fa-user"></i> Total Users</span>
            <div className="count">2500</div>
            <span className="count_bottom"><i className="green">4% </i> From last Week</span>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
            <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
            <div className="count">123.50</div>
            <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>3% </i> From last Week</span>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
            <span className="count_top"><i className="fa fa-user"></i> Total Males</span>
            <div className="count green">2,500</div>
            <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>34% </i> From last Week</span>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
            <span className="count_top"><i className="fa fa-user"></i> Total Females</span>
            <div className="count">4,567</div>
            <span className="count_bottom"><i className="red"><i className="fa fa-sort-desc"></i>12% </i> From last Week</span>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
            <span className="count_top"><i className="fa fa-user"></i> Total Collections</span>
            <div className="count">2,315</div>
            <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>34% </i> From last Week</span>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
            <span className="count_top"><i className="fa fa-user"></i> Total Connections</span>
            <div className="count">7,325</div>
            <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>34% </i> From last Week</span>
          </div>
        </div>
        {/* /top tiles  */}



        <CardColumns className="cols-2 m-4">
          <Card>
            <CardHeader className="bg-chart text-white">
              Radar Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-white">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Radar data={radar} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="bg-chart text-white">
              Bar Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-white">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="bg-chart text-white">
              Doughnut Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-white">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Doughnut data={doughnut} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="bg-chart text-white">
              Line Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-white">docs</small>
                </a>
              </div>
            </CardHeader >
            <CardBody>
              <div className="chart-wrapper">
                <Line data={line} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="bg-chart text-white">
              Pie Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-white">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="bg-chart text-white">
              Polar Area Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-white">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Polar data={polar} options={options} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>

      </div>
    );
  }
}

