import { LightningElement, wire, api } from 'lwc';
import getItems from '@salesforce/apex/ProgrammedController.getItems';
import { getRecord, getFieldValue  } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { reduceErrors } from 'c/ldsUtils';

import NAME_ROOM_FIELD3 from '@salesforce/schema/ProgrammedMovie__c.Room__r.Name__c';
import NAME_ROOM_FIELD2 from '@salesforce/schema/Room__c';
import NAME_ROOM_X_FIELD from '@salesforce/schema/Room__c.Name__c';
import NAME_ROOM_FIELD from '@salesforce/schema/ProgrammedMovie__c.Room__r.Name__c';
import DATE_FIELD from '@salesforce/schema/ProgrammedMovie__c.Date__c';
import LIST_SEATS_TAKEN_FIELD from '@salesforce/schema/ProgrammedMovie__c.ListSeatsTaken__c';
const COLUMNS = [
    { label: 'Name__c', fieldName: NAME_ROOM_X_FIELD.fieldApiName, type: 'text' },
    { label: 'N', fieldName: NAME_ROOM_FIELD.fieldApiName, type: 'text' },
    { label: 'N2', fieldName: NAME_ROOM_FIELD3.fieldApiName, type: 'text' },
    { label: 'Date__c', fieldName: DATE_FIELD.fieldApiName, type: 'datetime' },
    { label: 'Date__c2', fieldName: 'Room__c', type: 'text' },
    { label: 'Date__c3', fieldName: 'Room__r', type: 'object' },
    { label: 'Seats Taken', fieldName: LIST_SEATS_TAKEN_FIELD.fieldApiName, type: 'text' }
];

export default class Cinema extends LightningElement {
    columns = COLUMNS;
    @wire(getItems)
    programm(value) {
     const { data, error } = value;
     
     if(data){
        console.log('logggggg: ' + JSON.parse(JSON.stringify(data)));
        console.log("JSON.stringify===> "+ JSON.stringify(data));

        console.log("JSON.stringify===> "+ JSON.stringify(data[0].Room__c));
        console.log("JSON.stringify===> "+ JSON.stringify(data[0]));
        console.log("JSON.stringify===> "+ JSON.stringify(data[0].Room__r));
        console.log("JSON.stringify===> "+ JSON.stringify(data[0].Room__r.Room__c));
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

    /**
     * Per creare account
     */
    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }


    /**
     * In automatico si cercano tutte le informazioni dato un ID
     */
    @api recordId; //viene inserito in automatico
    //getRecord vuole Id e i field da cercare
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, REVENUE_FIELD] })
    account;
    get name() {
        console.log('A' + getFieldValue(this.account.data, NAME_FIELD))
        return getFieldValue(this.account.data, NAME_FIELD);
    }
    get revenue() {
        console.log('B' + getFieldValue(this.account.data, REVENUE_FIELD));
        return getFieldValue(this.account.data, REVENUE_FIELD);
    }
    
}