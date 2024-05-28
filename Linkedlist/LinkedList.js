import LinkedListNode from "./LinkedListNode";
import Comparator from "../Comparators/Comparator";


export default class LinkedList {
    constructor(comparatorFunction) {
        this.head = null;
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }
    // add first element into head
    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        return this;
    }
    // add element into tail
    append(value) {
        const newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    // insert node with location index
    insert(value, rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        if (index === 0) {
            this.prepend(value);
        } else {
            let count = 1;
            let currentNode = this.head;
            const newNode = new LinkedListNode(value);
            while (currentNode) {
                if (count === index) break;
                currentNode = currentNode.next;
                count += 1;
            }
            if (currentNode) {
                newNode.next = currentNode.next;
                currentNode.next = newNode;
            } else {
                if (this.tail) {
                    this.tail.next = newNode;
                    this.tail = newNode;
                } else {
                    this.tail = newNode;
                    this.head = newNode;
                }
            }
        }
        return this;
    }

    delete(value) {
        if (!this.head) return null;
        let deletedNode = null;
        if (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
            return deletedNode;
        }
        let curNode = this.head;
        if (curNode) {
            while (curNode.next) {
                if (this.compare.equal(curNode.next.value, value)) {
                    deletedNode = curNode.next;
                    curNode.next = curNode.next.next;
                } else {
                    curNode = curNode.next
                }
            }
            // check node deleted is tail or not
            if (this.compare.equal(this.tail.value, value)) {
                this.tail = curNode;
            }
            return deletedNode;
        }
    }

    //find
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }
        let curNode = this.head;
        while (curNode) {
            if (callback && callback(curNode.value)) {
                return curNode;
            }
            if (this.compare.equal(curNode.value), value) {
                return curNode;
            }
            curNode = curNode.next;
        }
        return null;
    }

    //deleteTail
    deleteTail(value) {
        let deletedTail = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            let curNode = this.head;
            while (curNode.next) {
                if (!curNode.next.next) {
                    curNode.next = null;
                }
                curNode = curNode.next;
            }
        }
        return deletedTail
    }

    //deleteHead
    deleteHead(value) {
        if (!this.head) return null;
        let deletedHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        return deletedHead;
    }

    fromArray(arr) {
        arr.forEach((el) => this.append(el));
        return this;
    }

    toArray() {
        let curNode = this.head;
        let nodes = [];
        while(curNode){
            nodes.push(curNode.value);
            curNode = curNode.next;
        }
        return nodes;
    }

    toString(callback) {
        this.toArray.map((el)=>el.toString(callback).toString());   
    }

    reverse() {
       let curNode = this.head;
       let prevNode = null;
       let nextNode = null;

       while(curNode){
        nextNode = curNode.next;
        curNode.next = prevNode;

        prevNode = curNode;
        curNode = nextNode;
       }

       this.tail = this.head;
       this.head = prevNode;

       return this;
    }

    //create a new project set up
    //hashtable hashmap linkedlisttr
};