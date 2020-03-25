import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Label } from 'reactstrap';
import {AvForm, AvField } from 'availity-reactstrap-validation';
//import { BrowserRouter, Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import * as DeliveryZoneService from '../../service/DeliveryZone';
import * as EnterpriseAddressService from '../../service/EnterpriseAddress';
import * as Utilities from '../../helpers/Utilities';
//import Constants from '../../helpers/Constants';
import Config from '../../helpers/Config';
import SweetAlert from 'sweetalert-react';
import Loader from 'react-loader-spinner';
import 'sweetalert/dist/sweetalert.css';
import Map from '../../helpers/Map';
import GlobalData from '../../helpers/GlobalData';

//const AnyReactComponent = ({ text }) => <div>{text}</div>;
const collapsibleClass = ["collapsibleHeaderOne","collapsibleHeaderTwo","collapsibleHeaderThree","collapsibleHeaderFour","collapsibleHeaderFive"]
const Days = [{dayId: 7, dayName: "Sunday" , shortName: "Sun", IsChecked: false},{dayId: 1, dayName: "Monday",shortName: "Mon", IsChecked: false},{dayId: 2, dayName: "Tuesday",shortName: "Tue", IsChecked: false},{dayId: 3, dayName: "Wednesday",shortName: "Wed", IsChecked: false},{dayId: 4, dayName: "Thursday",shortName: "Thu", IsChecked: false},{dayId: 5, dayName: "Friday",shortName: "Fri", IsChecked: false},{dayId: 6, dayName: "Saturday",shortName: "Sat", IsChecked: false}];

class DeliveryZones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddZone: false,
            modalDeleteZone: false,
            DeliveryZones: [],
            Name: "",
            Radius: "",
            MinimumDeliveryOrder: "",
            DeliveryCharges: "",
            DeliveryTime: "",
            Days: [{dayId: 7, dayName: "Sunday" , shortName: "Sun", IsChecked: false},{dayId: 1, dayName: "Monday",shortName: "Mon", IsChecked: false},{dayId: 2, dayName: "Tuesday",shortName: "Tue", IsChecked: false},{dayId: 3, dayName: "Wednesday",shortName: "Wed", IsChecked: false},{dayId: 4, dayName: "Thursday",shortName: "Thu", IsChecked: false},{dayId: 5, dayName: "Friday",shortName: "Fri", IsChecked: false},{dayId: 6, dayName: "Saturday",shortName: "Sat", IsChecked: false}],
            IsZoneLimited: true,
            SelectedZone: {},
            show: false,
            alertModelText: '',
            alertModelTitle:'',
            deleteConfirmationModelText : '',
            showDeleteConfirmation: false,
            deleteComfirmationModelType : '',
            DeliveryZoneToBeRemovedID: 0,
            SelectedZoneName: "",
            SelectedZoneID: 0,
            IsUpdate: false,
            Latitude: 0,
            Longitude: 0,
            PrimaryEnterpriseAddress: {},
            ShowLoader: true,
            MapData: [],
            CheckAll: false,
            ValidateDaysCsv: true,
        }
        this.addZoneModaltoggle = this.addZoneModaltoggle.bind(this);
        this.deleteZoneModaltoggle = this.deleteZoneModaltoggle.bind(this);
        this.SaveDeliveryZone = this.SaveDeliveryZone.bind(this);
    }


    loading = () =>   <div className="res-loader-wraper"><div className="loader-menu-inner"> 
    <Loader type="Oval" color="#ed0000" height={50} width={50}/>  
    <div className="loading-label">Loading.....</div>
    </div>
    </div>


//#region  Confirmation Model Generation

DeleteZoneConfirmation(name,id){

    this.setState({DeliveryZoneToBeRemovedID: id, SelectedZoneName: name,  showDeleteConfirmation:true, deleteConfirmationModelText: 'You want to delete "'+name+'".'})
  
  }

//#endregion 


//#region Models and alerts Html 

GenerateSweetConfirmationWithCancel(){
    return( 
       <SweetAlert
         show={this.state.showDeleteConfirmation}
         title="Are you sure?"
         text={this.state.deleteConfirmationModelText}
         showCancelButton
         onConfirm={() => {this.DeleteZone()}}
         onCancel={() => { this.setState({ showDeleteConfirmation: false });
         }}
         onEscapeKey={() => this.setState({ showDeleteConfirmation: false })}
         onOutsideClick={() => this.setState({ showDeleteConfirmation: false })}
       />
     )
}
  
   GenerateSweetAlert(){
    return( 
       <SweetAlert
         show={this.state.showAlert}
         title={this.state.alertModelTitle}
         text={this.state.alertModelText}
         onConfirm={() => this.setState({ showAlert: false })}
         onEscapeKey={() => this.setState({ showAlert: false })}
         onOutsideClick={() => this.setState({ showAlert: false })}
       />
     )
   }
  
  
  //#endregion
  

//#region  api calling


GetEnterprisePrimaryAddress = async () => {

    let data = await EnterpriseAddressService.Get();
    
    if (data.length !== 0)
        this.setState({PrimaryEnterpriseAddress: data,ShowLoader: false});

}


GetEnterpriseZones = async () => {

    let data = await DeliveryZoneService.Get();
    
    if(data.length !== 0){
     
       
        //  for (var d = 0, e = data.length; d < e; d++) {
        data.forEach(deliveryZone => {
            let dayShortNameCsv = "";
        let days = Days;
        let dayCsvObj = deliveryZone.DayCsv.split(Config.Setting.csvSeperator);
        
        days.forEach(deliveryDay => {

            var rowId = "-1";
            for (var i = 0, j = dayCsvObj.length; i < j; i++) {
            if (Number(dayCsvObj[i]) === deliveryDay.dayId) {
                rowId = i;
                break;
            }
        }
      
        if(rowId !== "-1")
            dayShortNameCsv += deliveryDay.shortName + ", ";
    })

    deliveryZone.DayShortNameCSV = dayShortNameCsv.slice(0, -2);
        
})

        this.setState({DeliveryZones: data, IsZoneLimited: data.length < Config.Setting.zoneLimit});
    }
}


DeleteZone = async() =>{
 
    let DeletedMessage = await DeliveryZoneService.Delete(this.state.DeliveryZoneToBeRemovedID)
    this.setState({showDeleteConfirmation: false});
    let name = this.state.SelectedZoneName;
    
    if(DeletedMessage === '1'){
  
        this.GetEnterpriseZones();
        this.setState({showAlert: true, alertModelTitle:'Deleted!', alertModelText:"'"+ name+'" deleted successfully' });
        return;
    } 
    
    let message = DeletedMessage === '0' ? name +'" not deleted successfully' :  DeletedMessage;
  
    //this.setState({SelectedCategoryId: 0});
    this.setState({showAlert: true, alertModelTitle:'Error!', alertModelText: message});
    
}


SaveDeliveryZoneApi = async(deliveryAreaCsv) =>{

    let message = await DeliveryZoneService.Save(deliveryAreaCsv);
  
    
    if(message === '1'){
     
        this.GetEnterpriseZones();
        this.setState({ modalAddZone: !this.state.modalAddZone });
        
    }
}
  


UpdateDeliveryZoneApi = async(deliveryAreaParam) =>{

    let message = await DeliveryZoneService.Update(deliveryAreaParam);

    if(message === '1') {
     
        this.GetEnterpriseZones();
        this.setState({ modalAddZone: !this.state.modalAddZone });
    }
}
  


SaveDeliveryZone(event, values){
  
    this.setState({ValidateDaysCsv: true})
    let deliveryZone = DeliveryZoneService.DeliveryZone;
    let days = this.state.Days;
    let daysCsv = "";
    days.forEach( currentDay =>{

        if(currentDay.IsChecked)
        {
            daysCsv += currentDay.dayId + "^^^";
        }

    })

    if(daysCsv == "") {
        this.setState({ValidateDaysCsv: false})
        return;
    }
        

    deliveryZone.ID = this.state.SelectedZoneID;
    deliveryZone.Name = values.txtZoneName;
    deliveryZone.Radius = values.txtZoneRadius;
    deliveryZone.MinimumDeliveryOrder = values.txtZoneMinDelOrder;
    deliveryZone.DeliveryCharges = values.txtZoneDelCharges;
    deliveryZone.DeliveryTime = values.txtZoneDelTime;
    deliveryZone.DaysCSV = Utilities.FormatCsv(daysCsv, Config.Setting.csvSeperator);
    
    
    //Saving
    if(!this.state.IsUpdate){
      this.SaveDeliveryZoneApi(deliveryZone);
      return;
    }
    // updating
      this.UpdateDeliveryZoneApi(deliveryZone);
}

//#endregion

AssignValues(e,index){

   // let zones = this.state.DeliveryZones
    let isCheked = e.target.value === "false"? true : false;
    let days = this.state.Days;
    let checkAll = true;
    days[index].IsChecked = isCheked;
    this.setState({Days: days});

    days.forEach(deliveryDay => {
        
        if(!deliveryDay.IsChecked) {
            checkAll = false
        }
    })

    this.setState({CheckAll : checkAll});

}

handelCheckAll(e){

    let isCheked = e.target.value === "false"? true : false;
    let days = this.state.Days;

    this.state.Days.forEach(deliveryDay => {
        deliveryDay.IsChecked = isCheked;
    })
    
    this.setState({Days: days,CheckAll : isCheked});

}

EditZone(index) {

        let zones = this.state.DeliveryZones;
        let dayCsvObj = zones[index].DayCsv.split(Config.Setting.csvSeperator);
        let CheckAll = true;
        this.state.Days.forEach(deliveryDay => {

            var rowId = "-1";
            for (var i = 0, j = dayCsvObj.length; i < j; i++) {
            if (Number(dayCsvObj[i]) === deliveryDay.dayId) {
                rowId = i;
                break;
            }
        }
      
        if(rowId !== "-1"){
            deliveryDay.IsChecked = true
            
        } else {
            CheckAll = false;
            deliveryDay.IsChecked = false
        }
    })

        this.setState({
             SelectedZoneID: zones[index].ID
            ,Name: zones[index].Name
            ,Radius: zones[index].Radius
            ,MinimumDeliveryOrder: zones[index].MinimumDeliveryOrder
            ,DeliveryCharges: zones[index].DeliveryCharges
            ,DeliveryTime: zones[index].DeliveryTime
            ,Days: this.state.Days
            ,SelectedZone: zones[index]
            ,modalAddZone: !this.state.modalAddZone
            ,IsUpdate: true
            ,CheckAll: CheckAll
        });


    }


    addZoneModaltoggle(){
       
    let newZoneName = "Zone 1";

    let totalZones = Config.Setting.zoneLimit;

    if (this.state.DeliveryZones.length > 0) {
        for (var i = 0; i < totalZones; i++) {
            var zoneName = "Zone " + (i + 1);
            var zone = this.state.DeliveryZones.filter((zone) => {
                return zone.Name === zoneName;
              })
            if (zone.length < 1) {
                newZoneName = zoneName;
                break;
            }
        }
    }
    


    this.state.Days.forEach(day => {
        day.IsChecked = false;
    })

        this.setState({
            SelectedZoneID: 0
           ,Name: newZoneName
           ,Radius: ""
           ,MinimumDeliveryOrder: ""
           ,DeliveryCharges: ""
           ,DeliveryTime: ""
           ,SelectedZone: ""
           ,modalAddZone: !this.state.modalAddZone
           ,IsUpdate: false,
       });




    }

    deleteZoneModaltoggle(id) {
        // this.setState({
        //     modalDeleteZone: !this.state.modalDeleteZone,
        // });
    }

    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

        
componentDidMount() {

     this.GetEnterpriseZones();
     this.GetEnterprisePrimaryAddress();
}  
    

LoadZoneHtml(zone,index){


let zoneIndex = zone.Name.split(' ')[1]


return (
    <div className="relative zone-wrap-now" key={index}>
           <span className="accordian-zone-wrap"> 
                <span onClick = {() => this.DeleteZoneConfirmation(zone.Name,zone.ID)} className="delete-zone">
                <i className="fa fa-trash"></i>
                <span>Delete</span>
                </span>
                <span onClick={(e) => this.EditZone(index)} style={{ marginRight: 0 }} className="edit-zone ">
               
                <i className="fa fa-edit"></i>
                <span>Edit</span>
                </span>
            </span>
    <Collapsible
    trigger={
        <div className={collapsibleClass[zoneIndex-1]}>
            <span className="mainheading">
                <p>
                    <i className="fa fa-chevron-right iconCollap"></i>
                </p> {zone.Name}
            </span>
         
        </div>
        }
    triggerWhenOpen={
        <div className={collapsibleClass[Number(zoneIndex-1)]}>
            <span className="mainheading">
                <p>
                    <i className="fa fa-chevron-down iconCollap"></i>
                </p>{zone.Name}
                </span>
               
        </div>
        }
>
    <ul className="collapsibleList">
        <li>
            <p>Zone name</p>
            <p>{zone.Name}</p>
        </li>
        <li>
            <p>Radius</p>
            <p>{zone.Radius} {Config.Setting.distanceUnit}</p>
        </li>
        <li>
            <p>Minimum order for delivery</p>
            <p>£ {zone.MinimumDeliveryOrder}</p>
        </li>
        <li>
            <p>Delivery charges</p>
            <p>£ {zone.DeliveryCharges}</p>
        </li>
        <li>
            <p>Delivery time</p>
            <p>{zone.DeliveryTime} mins</p>
        </li>
        <li>
            <p style={{ width: '170px' }}>Active days</p>
            <div className="deliveryDaysMainDiv ">
                <span style={{ textAlign: 'right' }}>{zone.DayShortNameCSV}</span>
            </div>
        </li>
    </ul>
</Collapsible>
</div>

)

}


RenderMap(PrimaryEnterpriseAddress){

    var zones = this.state.DeliveryZones;

    zones = zones.sort(function (x, y) {
        return x.Radius === y.Radius ? 0 : (x.Radius < y.Radius ? 1 : -1);
    });


    let mapData = [];
    let strokeColors = GlobalData.restaurants_data.Supermeal_dev.Delivery_Zone_Color_Palette;
    let strokeOpacity = 1;
    if(zones === null || zones.length < 1)
    {
        return <div></div>
    }

    for (var i = 0; i < zones.length; i++) {

    strokeOpacity =   strokeOpacity - 0.1
    let zoneIndex = zones[i].Name.split(' ')[1]

    var MapDataObj = {};
    MapDataObj.id = PrimaryEnterpriseAddress.Id;
    MapDataObj.name = PrimaryEnterpriseAddress.Label;
    MapDataObj.latitude = PrimaryEnterpriseAddress.Latitude;
    MapDataObj.longitude = PrimaryEnterpriseAddress.Longitude;

    mapData[i] = MapDataObj;

    mapData[i].circle = {
        radius: zones[i].Radius * 1609.344,
        options: {
          strokeColor: strokeColors[Number(zoneIndex-1)],
          strokeOpacity: 0.2,
          strokeWeight: 5,
          fillColor: strokeColors[Number(zoneIndex-1)],
          fillOpacity: 0.4
        }
      }

	}

    zones.sort(Utilities.SortByName);

    return (
    <Map
    center={{ lat: Number(PrimaryEnterpriseAddress.Latitude), lng: Number(PrimaryEnterpriseAddress.Longitude) }}
    zoom={11}
    places={mapData}
    googleMapURL={"https://maps.googleapis.com/maps/api/js?key="+Config.Setting.googleApi}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `800px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
)
}

RenderZones(zones){

    var htmlZones = [];
   

    if(zones === null || zones.length <1)
    {
        return <div></div>
    }

    for (var i = 0; i < zones.length; i++) {

        htmlZones.push(this.LoadZoneHtml(zones[i],i));
            
	}

    return(

        <div>{htmlZones.map((zoneHtml) => zoneHtml)}</div>

    )
}

    render() {

        if(this.state.ShowLoader){
            return this.loading();
        }

        const { PrimaryEnterpriseAddress } = this.state;

        return (
            <div className="deliveryZoneWrap">
                <div style={{ marginBottom: 30 }}>
                    <div>
                        <h3 className=" card-title p-t-20 p-l-30 p-b-10">Delivery Zones</h3>
                    </div>
                    <div className="mapAddZoneMainDiv">
                        <div className="mapDiv" >
                        
                {this.RenderMap(this.state.PrimaryEnterpriseAddress[0])}

                        </div>
                        <div className="addZoneDiv" >


                            {this.RenderZones(this.state.DeliveryZones)}

                            {this.state.IsZoneLimited &&
                             <Button outline onClick={this.addZoneModaltoggle} className="btn-block customButton">{this.state.DeliveryZones.length > 0 ?  "Add another zone" : "Add zone"}</Button>
                             }

                        </div>
                        
                        <Modal isOpen={this.state.modalAddZone} toggle={this.addZoneModaltoggle} className='modal-lg' id="deliveryZoneNew">
                        <AvForm onValidSubmit={this.SaveDeliveryZone}>
                            <ModalHeader toggle={this.addZoneModaltoggle}>Add another zone</ModalHeader>
                            <ModalBody>
                            
                                <div className="row" >
                                    <div className="col-md-6">
                                        <label className="control-label font-weight-500">Zone Name</label>
                                        <div className="input-group mb-3 form-group">
                                            {/* <input type="text" className="form-control" style={{borderRadius:'3px'}} required data-error="This field is required" /> */}
                                            <AvField name="txtZoneName" value={this.state.Name} type="text" disabled className="form-control" 
                                             validate={{
                                                required: { value: this.props.isRequired, errorMessage: 'Please fill this field' },
                                                
                                                }} 
                                            
                                            /> 
                                            <div className="input-group-append">
                                                {/* <span className="input-group-text form-control borderRightRadius">%</span> */}
                                            </div>
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label font-weight-500">Radius</label>
                                        <div className="input-group mb-3 form-group">
                                            {/* <input type="tel" className="form-control form-control-right" required data-error="This field is required" /> */}
                                            <AvField name="txtZoneRadius" value={this.state.Radius} type="text" className="form-control" 
                                            validate={{
                                                required: { value: this.props.isRequired, errorMessage: 'Please fill this field' },
                                                tel: {pattern: '^[0-9]'},
                                                }} 
                                            /> 
                                            <div className="input-group-append">
                                                <span className="input-group-text form-control borderRightRadius">miles</span>
                                            </div>
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-md-6">
                                        <label className="control-label font-weight-500">Minimum order for delivery</label>
                                        <div className="input-group m-b-10 form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text form-control" id="basic-addon1">£</span>
                                            </div>
                                            {/* <input className="form-control form-control-left validatedField flexBasisValidation borderRightRadius"></input> */}
                                            <AvField name="txtZoneMinDelOrder" value={this.state.MinimumDeliveryOrder} type="text" className="form-control" required errorMessage="Please fill this field" 
                                            validate={{
                                                required: { value: this.props.isRequired, errorMessage: 'Please fill this field' },
                                               tel: {pattern: '^[0-9]+(\.[0-9]{1,2})?$', errorMessage: 'Invalid input '},
                                                }} 
                                            
                                            /> 
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label font-weight-500">Delivery charges</label>
                                        <div className="input-group m-b-10 form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text form-control" id="basic-addon1">£</span>
                                            </div>
                                            {/* <input className="form-control form-control-left borderRightRadius" /> */}
                                            <AvField name="txtZoneDelCharges" value={this.state.DeliveryCharges} type="text" className="form-control" required errorMessage="Please fill this field"
                                            validate={{
                                                required: { value: this.props.isRequired, errorMessage: 'Please fill this field' },
                                               tel: {pattern: '^[0-9]+(\.[0-9]{1,2})?$', errorMessage: 'Invalid input '},
                                                }} 
                                            
                                            /> 
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-md-6">
                                        <label className="control-label font-weight-500">Delivery time</label>
                                        <div className="input-group mb-3 form-group">
                                            {/* <input type="tel" className="form-control form-control-right"  required data-error="This field is required" /> */}
                                            <AvField name="txtZoneDelTime" value={this.state.DeliveryTime} type="number" className="form-control" required errorMessage="Please fill this field"
                                            validate={{
                                                required: { value: this.props.isRequired, errorMessage: 'Please fill this field' },
                                                tel: {pattern: '^[0-9]+(\.[0-9]{0,0})?$', errorMessage: 'Invalid input '},
                                                }} 
                                            /> 
                                            <div className="input-group-append">
                                                <span className="input-group-text form-control borderRightRadius">min(s)</span>
                                            </div>
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <AvCheckboxGroup inline name="chkDays"> */}
                                <div className="row" >
                                    <div className="col-md-12">
                                        <span className="control-label font-weight-500">Delivery days</span>
                                        <div className="input-group mb-3 form-group">

                                                <div className="col-xs-12 col-sm-3  checkDiv setting-cus-field" style={{    padding: '0px',marginTop: '5px'}}>
                                                 <input type="checkbox"  id="All Days" onChange={(e) => this.handelCheckAll(e)}  name="All Days" className="form-checkbox" value={this.state.CheckAll}  checked={this.state.CheckAll}/>
                                                 <Label htmlFor="All Days" className="modal-label-head">All Days</Label>
                                                </div>

                                            <div className="row col-xs-12 setting-cus-field m-t-15" style={{padding: '0px 20px'}}>

                                                <div className="col-xs-12 col-sm-3 m-b-10 checkDiv">
                                                 <input type="checkbox" id={this.state.Days[0].dayName}  onChange={(e) => this.AssignValues(e,0)}  name={this.state.Days[0].dayName} className="form-checkbox" value={this.state.Days[0].IsChecked} checked={this.state.Days[0].IsChecked} />
                                                 <Label htmlFor={this.state.Days[0].dayName} className="modal-label-head">{this.state.Days[0].dayName}</Label>
                                                </div>
                                              
                                                <div className="col-xs-12 col-sm-3 m-b-10 checkDiv">
                                                <input type="checkbox" id={this.state.Days[1].dayName} onChange={(e) => this.AssignValues(e,1)} name={this.state.Days[1].dayName} className="form-checkbox"  value={this.state.Days[1].IsChecked} checked={this.state.Days[1].IsChecked}  />
                                                <Label htmlFor={this.state.Days[1].dayName} className="modal-label-head">{this.state.Days[1].dayName}</Label>
                                                </div>
                                                
                                                <div className="col-xs-12 col-sm-3 m-b-10 checkDiv">
                                                <input type="checkbox" id={this.state.Days[2].dayName} onChange={(e) => this.AssignValues(e,2)} name={this.state.Days[2].dayName} className="form-checkbox" value={this.state.Days[2].IsChecked} checked={this.state.Days[2].IsChecked} />
                                                <Label htmlFor={this.state.Days[2].dayName} className="modal-label-head">{this.state.Days[2].dayName}</Label>
                                                </div>
                                                
                                                <div className="col-xs-12 col-sm-3 m-b-10 checkDiv">
                                                <input type="checkbox" id={this.state.Days[3].dayName} onChange={(e) => this.AssignValues(e,3)} name={this.state.Days[3].dayName} className="form-checkbox" value={this.state.Days[3].IsChecked} checked={this.state.Days[3].IsChecked} />
                                                <Label htmlFor={this.state.Days[3].dayName} className="modal-label-head">{this.state.Days[3].dayName}</Label>
                                                </div>
                                                
                                                <div className="col-xs-12 col-sm-3 m-b-10 checkDiv">
                                                <input type="checkbox" id={this.state.Days[4].dayName} onChange={(e) => this.AssignValues(e,4)} name={this.state.Days[4].dayName} className="form-checkbox" value={this.state.Days[4].IsChecked} checked={this.state.Days[4].IsChecked} />
                                                <Label htmlFor={this.state.Days[4].dayName} className="modal-label-head">{this.state.Days[4].dayName}</Label>
                                                </div>
                                                
                                                <div className="col-xs-12 col-sm-3 m-b-10 checkDiv">
                                                <input type="checkbox" id={this.state.Days[5].dayName} onChange={(e) => this.AssignValues(e,5)} name={this.state.Days[5].dayName} className="form-checkbox" value={this.state.Days[5].IsChecked} checked={this.state.Days[5].IsChecked} />
                                                <Label htmlFor={this.state.Days[5].dayName} className="modal-label-head">{this.state.Days[5].dayName}</Label>
                                                </div>
                                                
                                                <div className="col-xs-12 col-sm-3 m-b-10 checkDiv">
                                                <input type="checkbox" id={this.state.Days[6].dayName} onChange={(e) => this.AssignValues(e,6)} name={this.state.Days[6].dayName} className="form-checkbox" value={this.state.Days[6].IsChecked} checked={this.state.Days[6].IsChecked} />
                                                <Label htmlFor={this.state.Days[6].dayName} className="modal-label-head">{this.state.Days[6].dayName}</Label>
                                                </div>

                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                {/* </AvCheckboxGroup> */}
                                
                            </ModalBody>
                            <ModalFooter>
                            {this.state.ValidateDaysCsv ? "" : <div><div class="error" style={{margin:'0px'}}>Delivery days is required</div></div>}
                            <div class="btn btn-secondary" onClick={this.addZoneModaltoggle}>Cancel</div>
                            <Button color="success" className="btn waves-effect waves-light btn-success pull-right">{this.state.IsUpdate ? "Update" : "Add"}</Button>

                                
                                
                            </ModalFooter>
                            </AvForm>
                        </Modal>

                   {this.GenerateSweetConfirmationWithCancel()}
                   {this.GenerateSweetAlert()}    
                   
                    </div>
                </div>
            </div>

        );
    }

}

export default DeliveryZones;
