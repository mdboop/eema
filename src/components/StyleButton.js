import React from 'react';

const StyleButton = props => {
  const onToggle = e => {
    e.preventDefault();
    props.onToggle(props.style);
  };
  let className = 'editor--button';
  if (props.active) {
    className += ' editor--button__active';
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

StyleButton.propTypes = {
  onToggle: React.PropTypes.func,
  style: React.PropTypes.string,
  active: React.PropTypes.bool,
  label: React.PropTypes.string,
};

export default StyleButton;
