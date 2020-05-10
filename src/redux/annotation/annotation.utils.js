export const addAnnotation = (annotations, newAnnotationDetails) => {
  const { label, currentVideo: { name, time, duration, totalFrames } } = newAnnotationDetails;

  const newAnnotation = {
    label,
    name,
    frame: Math.round(time / duration * totalFrames)
  }

  const newList = [...annotations, newAnnotation];
  newList.sort((a, b) => b.frame - a.frame);

  return newList;
}

export const deleteAnnotation = (annotations, itemToRemove) => {
  const { name, label, frame } = itemToRemove;

  const newList = annotations.filter(item => {
    return ((item.name !== name) || (item.label !== label) || (item.frame !== frame));
  });

  return newList;
}