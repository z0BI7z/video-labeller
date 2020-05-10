export const addAnnotation = (annotations, newAnnotationDetails) => {
  const { label, currentVideo: { name, time, duration, totalFrames } } = newAnnotationDetails;

  const frame = Math.round(time / duration * totalFrames);

  const newAnnotation = {
    label,
    name,
    frame
  }

  const existingAnnotation = annotations.find(item => ((item.name === name) && (item.label === label) && (item.frame === frame)));

  if (existingAnnotation) {
    return {
      lastLabelled: existingAnnotation,
      data: annotations
    }
  }

  const newList = [...annotations, newAnnotation];
  newList.sort((a, b) => b.frame - a.frame);

  return {
    lastLabelled: newAnnotation,
    data: newList
  }
}

export const deleteAnnotation = (annotations, itemToRemove) => {
  const { name, label, frame } = itemToRemove;

  const newList = annotations.filter(item => {
    return ((item.name !== name) || (item.label !== label) || (item.frame !== frame));
  });

  return newList;
}