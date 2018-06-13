export class Marker {
    constructor(
        public id?: number,
        public name = "",
        public coordslat?: number,
        public coordslng?: number,
        public draggable?: boolean,
        public time?: number 
    )
    {
        if(!name)
            this.name = "Marker #"+id;
        if(!draggable)
            this.draggable = true;
        if(!time)
            this.time = Date.now();
    }
    
}
