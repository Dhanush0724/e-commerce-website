class Item:
    def __init__(self, weight, value):
        self.weight = weight
        self.value = value
        self.value_per_weight = value / weight

def knapsack_branch_and_bound(items, capacity):
    def bound(node, n):
        if node.weight > capacity:
            return 0
        bound_value = node.value
        j = node.level + 1
        total_weight = node.weight

        while j < n and total_weight + items[j].weight <= capacity:
            bound_value += items[j].value
            total_weight += items[j].weight
            j += 1

        if j < n:
            bound_value += (capacity - total_weight) * items[j].value_per_weight

        return bound_value

    n = len(items)
    items.sort(key=lambda x: x.value_per_weight, reverse=True)

    max_value = 0
    root = Node(level=-1, weight=0, value=0, bound=0)
    queue = [root]

    while queue:
        current = queue.pop(0)

        if current.level == n - 1:
            continue

        next_level = current.level + 1
        with_item = Node(
            level=next_level,
            weight=current.weight + items[next_level].weight,
            value=current.value + items[next_level].value,
            bound=current.bound
        )
        without_item = Node(
            level=next_level,
            weight=current.weight,
            value=current.value,
            bound=current.bound
        )

        if with_item.weight <= capacity:
            if with_item.value > max_value:
                max_value = with_item.value
            with_item.bound = bound(with_item, n)
            if with_item.bound > max_value:
                queue.append(with_item)

        without_item.bound = bound(without_item, n)
        if without_item.bound > max_value:
            queue.append(without_item)

    return max_value

class Node:
    def __init__(self, level, weight, value, bound):
        self.level = level
        self.weight = weight
        self.value = value
        self.bound = bound

# Example usage:
if __name__ == "__main__":
    weights = [4, 7, 5, 3]
    values = [40, 42, 25, 12]
    capacity = 10
    items = [Item(weights[i], values[i]) for i in range(len(weights))]

    max_value = knapsack_branch_and_bound(items, capacity)
    print("Maximum value that can be obtained:", max_value)
