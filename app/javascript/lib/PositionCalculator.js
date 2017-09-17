export default function PositionCalculator(items, targetPosition, originalPosition) {
  const itemsClone = items.slice();
  const isOnly = itemsClone.length === 0;
  const isNew = originalPosition == null;
  const isFirst = targetPosition === 0;
  const isLast = targetPosition >= itemsClone.length - 1;
  const movingRight = originalPosition < targetPosition;

  itemsClone.sort((a, b) => a.position - b.position);

  if (isOnly) {
    return 65535;
  } else if (isNew) {
    return itemsClone[itemsClone.length - 1].position + 65536;
  } else if (isFirst) {
    return itemsClone[0].position / 2;
  } else if (isLast) {
    return itemsClone[itemsClone.length - 1].position + 65536;
  } else {
    let itemBefore, itemAfter;

    if (movingRight) {
      itemBefore = itemsClone[targetPosition];
      itemAfter = itemsClone[targetPosition + 1];
    } else {
      itemBefore = itemsClone[targetPosition - 1];
      itemAfter = itemsClone[targetPosition];
    }

    return (itemBefore.position + itemAfter.position) / 2;
  }
};
