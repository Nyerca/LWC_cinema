import { LightningElement, api } from 'lwc';

export default class SeatList extends LightningElement {

    @api seats;
    @api seatsused;

    get seatSeatWithVariant() {

          return this.seats.map((num) => {
            var colour =  (this.seatsused.includes(num)) ? 'destructive' : 'success';
            return {
                  num,
                  colour,
                }
          } );
        //console.log('LOGGG: ' + evt.target.dataset);
    }

    seatClick(evt) {
        // This component wants to emit a seatselected event to its parent
        const event = new CustomEvent('seatclick', {
            detail: evt.target.dataset.seatnumber
        });
        // Fire the event from c-list
        this.dispatchEvent(event);
    }

    get openRoom() { 
        console.log(this._seats_list && this._seatstaken_list);
        return (this._seats_list && this._seatstaken_list);}
}