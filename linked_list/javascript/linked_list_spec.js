const LL = require('./linked_list');

// Tests appending items to the end of a linked list
(function testAppend() {
  const list = new LL()
  list.append(1)
  console.assert(list.head.value === 1, "Item gets inserted to empty list")
  console.assert(list.head.value === list.tail.value, "Head and tail properly reference the first item")
  list.append(2)
  console.assert(list.head.value === 1, "Head of the list stays the same")
  console.assert(list.tail.value === 2, "Tail is a new value")
})();

// Tests prepending items to the front of the list
(function testPrepend() {
  const list = new LL()
  list.prepend(1)
  console.assert(list.head.value === 1, "Items gets prepended to empty list")
  console.assert(list.head.value === list.tail.value, "Head and tail properly reference the first item")
  list.prepend(2)
  console.assert(list.head.value === 2, "Head of the list stays the same")
  console.assert(list.tail.value === 1, "Tail is a new value")
})();

(function testInsert() {
  const list = new LL()
  list.append(2)
  list.append(4)
  list.append(6)

  list.insert(5, 2)
  list.insert(3, 1)
  list.insert(1, 0)

  console.assert(list.head.value === 1, "Value of 1 inserted at index 0")
  console.assert(list.head.next.next.value === 3, "Value of 1 inserted at index 0")
  console.assert(list.head.next.next.next.next.value === 5, "Value of 1 inserted at index 0")

  list.insert(10, 10)
  console.assert(list.tail.value === 10, "items get appended with index is out of bounds")
})();

(function testRemove() {
  const list = new LL()
  list.append(1)
  list.append(2)
  list.append(3)

  var two = list.remove(2)
  console.assert(two === 2, "Value of 2 returned from remove")
  console.assert(list.head.next.value === 3, "Value of 2 removed from the list")

  var notTwo = list.remove(2)
  console.assert(notTwo === undefined, "Undefined returned when no value is found")
  console.assert(list.head.value === 1, "List remains unchanged")
  console.assert(list.head.next.value === 3, "List remains unchanged")
})();

console.log("All tests have passed!")
