import { LightningElement, wire, api, track } from 'lwc';
import getItems from '@salesforce/apex/ProgrammedController.getItems';
import { getRecord, getFieldValue  } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { reduceErrors } from 'c/ldsUtils';


export default class Cinema extends LightningElement {
    @wire(getItems)
    programm(value) {
     const { data, error } = value;
     
     if(data){
        console.log('logggggg: ' + JSON.parse(JSON.stringify(data)));
        console.log("JSON.stringify===> "+ JSON.stringify(data));

        console.log("JSON.stringify===> "+ JSON.stringify(data[0].Room__c));
        console.log("JSON.stringify===> "+ JSON.stringify(data[0]));
        console.log("JSON.stringify===> "+ JSON.stringify(data[0].Room__r));
        console.log("JSON.stringify===> "+ JSON.stringify(data[0].Room__r.Name__c));
     } else if(error){
        console.log(error);
      }
    };

    @wire(getItems)
    programmed;
    get errors() { //serve ad ottenere eventuali errori, mentre reduceErrors serve a mostrarli bene e non vedere [Object object]
        return (this.programmed.error) ?
            reduceErrors(this.programmed.error) : [];
    }

    @track _seats_list = undefined;
    @track _seatstaken_list = undefined;
    @track _seatClicked;
    @track _isTaken;

    handleSeatTaken(evt) {
        this._seatstaken_list.push(parseInt(evt.detail));
        this._isTaken = true
    }

    handleSeatClick(evt) {
        console.log("TAKEN: " + evt.detail);
        if(this._seatstaken_list.includes(parseInt(evt.detail))) {
            console.log("YES TAKEN");
            this._isTaken = true
        } else {
            this._isTaken = undefined
        }
        
        this._seatClicked = parseInt(evt.detail);
    }

    get openRoom() { 
        console.log(this._seats_list && this._seatstaken_list);
        return (this._seats_list && this._seatstaken_list);}

    program_click(event) {

        event.preventDefault();

        this._seats_list = Array.from({length:event.target.dataset.seats},(v,k)=>k);
        if(event.target.dataset.seatstaken != undefined) {
            this._seatstaken_list = event.target.dataset.seatstaken.split(',').map(Number);
        } else {
            this._seatstaken_list = [];
        }

        console.log('id => ' + event.target.dataset.seats);
        console.log('key => ' + event.target.dataset.seatstaken);

        console.log("SEAT1: " + this._seats_list);
        console.log("SEAT2: " + this._seatstaken_list);

        //console.log(seats_list);
        //console.log(seatstaken_list);
        /*
        const event = new CustomEvent('tileclick', {
            // detail contains only primitives
            detail: this.product.fields.Id.value
        });
        // Fire the event from c-tile
        this.dispatchEvent(event);
        */
       this._seatClicked = undefined;
       
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "seats: " + event.target.dataset.seats,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}