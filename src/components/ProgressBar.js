import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProgressBar.css';

export const colors = {
  alert: '#e74c3c',
  progress: '#2980b9'
};

const getWidth = (percentage) => {
  if(percentage < 0) return 0;
  else if(percentage > 100) return 100;
  return percentage;
};

const getBackground = (percentage) => percentage > 100 ? colors.alert: colors.progress;

const ProgressBar = ({ percentage }) => (
  <div className={styles.progressBar}>
    <span>{percentage}%</span>
    <div style={{ width: `${getWidth(percentage)}%` , background: getBackground(percentage) }} />
  </div>
);

ProgressBar.propTypes = {
  percentage: PropTypes.number,
};

ProgressBar.defaultProps = {
  percentage: 0,
};

export default ProgressBar;
