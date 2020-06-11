import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List, AutoSizer } from 'react-virtualized';

import AnnotationItem from '../annotation-item/annotation-item.component';

import { selectData, selectLastLabelled } from '../../redux/annotation/annotation.selectors';

import './annotations-list.styles.scss';
import { Button } from '@material-ui/core';

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

  const renderRow = ({ index, style }) => {
    return <AnnotationItem key={Math.random()} style={style} annotation={annotations[index]} isTarget={isTarget(annotations[index], lastLabelled)} />
  }

  const saveData = () => {
    const fileName = "file";
    const json = JSON.stringify(annotations);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.href = href;
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <div className={'annotations-list'}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref="List"
              height={height}
              width={width}
              rowHeight={64}
              rowRenderer={renderRow}
              rowCount={annotations.length}
            />
          )}
        </AutoSizer>
      </div>
      <Button onClick={saveData}>Save Data</Button>
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  annotations: selectData,
  lastLabelled: selectLastLabelled
});

export default connect(mapStateToProps)(AnnotationsList);