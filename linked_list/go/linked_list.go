package main

import "fmt"

// Node is the primary block of the linked list
type Node struct {
	value interface{}
	prev  *Node
	next  *Node
}

// LinkedList maintains pointers to the head and tail
type LinkedList struct {
	head *Node
	tail *Node
}

// Insert adds nodes to the linked list
func (list *LinkedList) Insert(value interface{}) *LinkedList {
	node := &Node{value: value}
	if list.head == nil && list.tail == nil {
		list.head = node
		list.tail = node
	} else {
		list.tail.next = node
		node.prev = list.tail
		list.tail = node
	}
	return list
}

func (list LinkedList) String() string {
	str := ""
	str += fmt.Sprint(list.head.value) + " -> "
	str += fmt.Sprint(list.head.next.value) + " -> "
	str += fmt.Sprint(list.head.next.next.value)
	return str
}

func main() {
	list := LinkedList{}
	list.Insert(1).Insert(3).Insert(2)
	fmt.Println(list)
}
