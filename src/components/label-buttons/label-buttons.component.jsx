import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LabelButton from '../label-button/label-button.component';
import AlertButton from '../alert-button/alert-button.component';

import { selectLabels } from '../../redux/annotation/annotation.selectors';
import { clearAnnotations } from '../../redux/annotation/annotation.actions';

import './label-buttons.styles.scss';

const LabelButtons = ({ labels, clearAnnotations }) => {

  return (
    <div className="label-buttons-container">
      <Grid container justify="flex-start" spacing={2}>
        {
          labels.map((label, i) => (
            <Grid item xs={4} lg={3} key={i}>
              <LabelButton label={label} />
            </Grid>
          ))
        }
        <Grid item xs={4} lg={3}>
          <AlertButton callback={clearAnnotations} label={'Clear'} />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  labels: selectLabels
});

const mapDispatchToProps = dispatch => ({
  clearAnnotations: () => dispatch(clearAnnotations())
})

export default connect(mapStateToProps, mapDispatchToProps)(LabelButtons);