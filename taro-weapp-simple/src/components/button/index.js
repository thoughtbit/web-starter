import Taro, { Component } from '@tarojs/taro'
import { Button, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.styl'

export default class ButtonItem extends Component {
  static defaultProps = {
    compStyle: '',
    textStyle: '',
    openType: '',
    plain: false,
    loading: false,
    disabled: false,
    onClick: () => {},
    onGetUserInfo: () => {}
  }

  getCls = (base) => {
    const { type, plain, disabled } = this.props
    return classNames(
      base,
      type === 'primary' && `${base}--primary`,
      plain && `${base}--plain`,
      disabled && `${base}--disabled`
    )
  }

  render () {
    const {
      textStyle, openType, loading, disabled, text,
      onClick, onGetUserInfo
    } = this.props
    return (
      <Button
        className={this.getCls('comp-button')}
        loading={loading}
        disabled={disabled}
        openType={openType}
        onClick={onClick}
        onGetUserInfo={onGetUserInfo}
      >
        <Text
          className={this.getCls('comp-button__txt')}
          style={textStyle}
        >
          {text}
        </Text>
      </Button>
    )
  }
}

