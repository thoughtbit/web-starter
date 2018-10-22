import Taro from '@tarojs/taro';
import { View, Textarea, Input, Label } from '@tarojs/components';
import { Component, PropTypes } from './../../common';

export default class TextField extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    showLabel: PropTypes.bool
  };

  static defaultProps = {
    value: "",
    showLabel: true
  };

  handleChange(e) {
    this.props.onChange(this.props.name, e.target.value);
  }

  render() {
    return (
      <View className='textField'>
        {this.props.label &&
          this.props.showLabel && (
            <Label className='textField__label' for={this.props.name}>{this.props.label}</Label>
          )}
        {this.props.type === "textarea" ? (
          <Textarea
            className='textField__input input'
            name={this.props.name}
            id={this.props.name}
            value={this.props.value}
            onChange={this.handleChange.bind(this)}
            placeholder={this.props.label}
          />
        ) : (
          <Input
            className='textField__input input'
            name={this.props.name}
            id={this.props.name}
            type={this.props.type}
            value={this.props.value}
            onChange={this.handleChange.bind(this)}
            placeholder={this.props.label}
          />
        )}
      </View>
    );
  }
}
