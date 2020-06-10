import React from 'react';
import Grid from '@material-ui/core/Grid';

import LabelButtons from '../label-buttons/label-buttons.component';
import AnnotationsList from '../annotations-list/annotations-list.component';

const AnnotationTools = () => {
  return (
    <div>
      <Grid container direction="column" justify="space-between">
        <Grid item xs={12}>
          <AnnotationsList />
        </Grid>
        <Grid item xs={12}>
          <LabelButtons />
        </Grid>
      </Grid>
    </div>
  );
}

export default AnnotationTools;