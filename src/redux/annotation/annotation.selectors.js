import { createSelector } from 'reselect';

const selectAnnotation = state => state.annotation;

export const selectLabels = createSelector(
  [selectAnnotation],
  annotation => annotation.labels
);

export const selectData = createSelector(
  [selectAnnotation],
  annotation => annotation.data
);

export const selectLastLabelled = createSelector(
  [selectAnnotation],
  annotation => annotation.lastLabelled
);