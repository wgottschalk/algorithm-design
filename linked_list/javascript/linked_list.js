function Node(value) {
  this.value = value
  this.next = null
  this.prev = null
}

module.exports = class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  append(value) {
    const node = new Node(value)
    if (!this.head && !this.tail) {
      this.head = node
      this.tail = node
    }
    else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
  }

  prepend(value) {
    const node = new Node(value)
    if (!this.head && !this.tail) {
      this.head = node
      this.tail = node
    }
    else {
      this.head.prev = node
      node.next = this.head
      this.head = node
    }
  }

  insert(value, index = 0) {
    if (index === 0) return this.prepend(value)

    const node = new Node(value)
    var ref = this.head

    while (index-- > 0 && ref) {
      ref = ref.next
    }
    if (!ref) return this.append(value)

    node.prev = ref.prev
    node.next = ref
    ref.prev.next = node
    ref.prev = node
  }

  remove(value) {
    var ref = this.head
    while(ref) {
      if (ref.value === value) {
        ref.prev.next = ref.next
        ref.next.prev = ref.prev
        ref.prev = null
        ref.next = null
        return ref.value
      }
      ref = ref.next
    }
  }
}
