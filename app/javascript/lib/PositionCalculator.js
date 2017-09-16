export default function PositionCalculator(items, targetPosition) {
  const itemsClone = items.slice();
  const isFirst = targetPosition === 1;
  const isLast = targetPosition >= itemsClone.length;
  const isOnly = itemsClone.length === 0;

  itemsClone.sort((a, b) => a.position - b.position);

  if (isOnly) {
    return 65535;
  } else if (isFirst) {
    return itemsClone[0].position / 2;
  } else if (isLast) {
    return itemsClone[itemsClone.length - 1].position + 65536;
  } else {
    const itemBefore = itemsClone[targetPosition - 2];
    const itemAfter = itemsClone[targetPosition - 1];

    return (itemBefore.position + itemAfter.position) / 2;
  }
};
