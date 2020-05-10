import React from 'react';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AnnotationItem from '../annotation-item/annotation-item.component';

import { selectData } from '../../redux/annotation/annotation.selectors';

import './annotations-list.styles.scss';

const AnnotationsList = ({ annotations }) => {
  return (
    <div className={'annotations-list'}>
      <List>
        {
          annotations.map((annotation, i) => (
            <AnnotationItem key={i} annotation={annotation} />
          ))
        }
      </List>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  annotations: selectData
});

export default connect(mapStateToProps)(AnnotationsList);