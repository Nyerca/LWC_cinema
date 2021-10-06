import { LightningElement, api, track } from 'lwc';

export default class Seat extends LightningElement {

    @api seatnumber;
    @api taken;

    get isTaken() {
        console.log("IS TAKEN: " + this.taken);
        return this.taken == true ? true : undefined;
    }

    get label() {
        return "Take seat num." + this.seatnumber;
    }

    clickBtn(evt) {
        // This component wants to emit a seatselected event to its parent
        //this.taken = true;
        const event = new CustomEvent('seattaken', {
            detail: this.seatnumber
        });
        // Fire the event from c-list
        this.dispatchEvent(event);
    }


}