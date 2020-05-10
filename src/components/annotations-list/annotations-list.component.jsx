import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AnnotationItem from '../annotation-item/annotation-item.component';

import { selectData, selectLastLabelled } from '../../redux/annotation/annotation.selectors';

import './annotations-list.styles.scss';

const AnnotationsList = ({ annotations, lastLabelled }) => {

  useEffect(() => {
    const parent = document.querySelector('.annotations-list');
    const target = document.querySelector('#last-labelled');
    if (target) {
      parent.scrollTop = target.offsetTop - 20;
    }
  }, [lastLabelled]);

  const isTarget = (annotation, target) => {
    if (target) {
      return (annotation.name === target.name && annotation.frame === target.frame && annotation.label === target.label);
    }
    return false;
  }

  return (
    <div className={'annotations-list'}>
      <List>
        {
          annotations.map((annotation) => (
            <AnnotationItem key={Math.random()} annotation={annotation} isTarget={isTarget(annotation, lastLabelled)} />
          ))
        }
      </List>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  annotations: selectData,
  lastLabelled: selectLastLabelled
});

export default connect(mapStateToProps)(AnnotationsList);