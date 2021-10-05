import { LightningElement } from 'lwc';

export default class SeatList extends LightningElement {
    seats;
    roomName;

    handleSeatClick(evt) {
        // This component wants to emit a seatselected event to its parent
        const event = new CustomEvent('seatselected', {
            detail: evt.detail
        });
        // Fire the event from c-list
        this.dispatchEvent(event);
    }
}