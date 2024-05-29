import LinkedList from "../Linkedlist/LinkedList.js";

const defaultHashTableSize = 32;

export default class HashTable {
    constructor(hashTableSize = defaultHashTableSize) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList())
        this.keys = {};
    }

    hash(key) {
        const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => { hashAccumulator += keySymbol.charCodeAt(0) }, 0)
        return hash % this.buckets.length
    }

    set(key, value) {
        const keyHash = this.hash(key)
        this.keys[key] = keyHash
        const buckedLinkList = this.buckets[keyHash]
        const node = buckedLinkList.find({ callback: (nodeValue) => nodeValue === key })
        if (!node) buckedLinkList.append({ key, value })
        else node.value.value = value
    }
}


