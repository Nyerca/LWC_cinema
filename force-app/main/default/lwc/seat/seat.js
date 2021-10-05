import { LightningElement, api } from 'lwc';

export default class Seat extends LightningElement {

    // Ensure changes are reactive when product is updated
    taken;

    // Private var to track @api productId
    _seatId = undefined;

    // Use set and get to process the value every time it's
    // requested while switching between products
    set seatId(value) {
        this._seatId = value;
        this.taken = true;
    }
    
    // getter for productId
    @api get seatId(){
        return this._seatId;
    }


}