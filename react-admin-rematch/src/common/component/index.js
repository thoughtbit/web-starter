import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const objectToString = style => {
  if (style && typeof style === 'object') {
    let styleStr = ''
    Object.keys(style).forEach(key => {
      const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      styleStr += `${lowerCaseKey}:${style[key]};`
    })
    return styleStr
  } else if (style && typeof style === 'string') {
    return style
  }
  return ''
}

class Component extends React.Component {
  /**
   * 合并 style
   * @param {Object|String} style1
   * @param {Object|String} style2
   * @returns {String}
   */
  mergeStyle (style1, style2) {
    return objectToString(style1) + objectToString(style2)
  }

  getClassName (arg) {
    const { className } = this.props

    if (!className) {
      return arg
    }

    let componentClass = arg
    let propsClass = className

    if (!Array.isArray(propsClass)) {
      propsClass = [propsClass]
    }

    if (!Array.isArray(componentClass)) {
      componentClass = [componentClass]
    }

    return componentClass.concat(propsClass)
  }

  classNames(...args) {
    return classnames(args);
  }

  className(...args) {
    return this.classNames.apply(this, args.concat([this.props.className]));
  }

  style(args) {
    return Object.assign({}, args, this.props.style)
  }
}

Component.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export default Component;
