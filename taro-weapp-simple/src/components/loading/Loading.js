import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Component, PropTypes } from './../../common'

import './index.styl'

class Loading extends Component {
  render () {
    const { color, size } = this.props
    const sizeStyle = {
      width: `${size}px`,
      height: `${size}px`
    }
    const colorStyle = {
      'border': `1px solid ${color}`,
      'border-color': `${color} transparent transparent transparent`
    }
    const ringStyle = Object.assign({}, colorStyle, sizeStyle)

    return (
      <View className='loading' style={sizeStyle}>
        <View className='loading__ring' style={ringStyle}></View>
        <View className='loading__ring' style={ringStyle}></View>
        <View className='loading__ring' style={ringStyle}></View>
      </View>
    )
  }
}

Loading.defaultProps = {
  size: '18',
  color: '#fff'
}

Loading.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default Loading;
