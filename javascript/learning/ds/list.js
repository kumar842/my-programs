class List {
    constructor(head = null, tail = null) {
        this.head = head;
        this.tail = tail;
    }
    isEmpty = () => this.head === null;
    size = () => {
        if(this.isEmpty()) return 0;
        else if(this.tail === null) return 1;
        else return 1 + this.tail.size();
    }
    append = (e) => {
        if(this.isEmpty()) this.head = e;
        else if(this.tail === null) this.tail = new List(e);
        else this.tail.append(e);
    }
    prepend = (e) => {
        if(this.isEmpty()) this.head = e;
        else {
            let newList = new List(2, this);
            this.tail = newList.tail;
            this.head = newList.head; //TODO:
        }
    }
    toString = () => {
        if(this.isEmpty()) return ``;
        else if(this.tail === null) return `${this.head}`
        else return `${this.head}, ${this.tail.toString()}`
    }
}