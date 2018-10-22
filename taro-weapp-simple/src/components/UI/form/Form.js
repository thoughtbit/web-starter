import Taro from '@tarojs/taro';
import { View, Form as CForm, Button } from '@tarojs/components';
import { Component, PropTypes } from './../../common';
import { TextField } from './../text-field';
import { FormErrors } from './../form-errors';
import { FormMessage } from './../form-message';

class Form extends Component {
  static propTypes = {
    submitText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["text", "email", "password", "textarea"])
          .isRequired,
        label: PropTypes.string,
        showLabel: PropTypes.bool,
        initialValue: PropTypes.string
      })
    )
  };

  state = {
    submitting: false,
    errors: null,
    message: null,
    fields: this.props.fields.reduce((fields, field) => {
      fields[field.name] = field.initialValue || "";
      return fields;
    }, {})
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  updateField(name, value) {
    this.setState({ fields: { ...this.state.fields, [name]: value } });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.submitting) return;
    this.submitStart();
    this.props
      .onSubmit(this.state.fields)
      .then(this.submitSuccess.bind(this))
      .catch(this.submitError.bind(this));
  }

  submitStart() {
    this.setState({
      submitting: true,
      errors: null,
      message: null
    });
  }

  submitSuccess(res) {
    if (this.unmounted) return;
    this.setState({
      submitting: false,
      message: res.data.message,
      errors: null,
      fields: this.props.fields.reduce((fields, field) => {
        fields[field.name] = field.initialValue
          ? this.state.fields[field.name]
          : "";
        return fields;
      }, {})
    });
  }

  submitError(err) {
    if (this.unmounted) return;
    console.log(err, err.response);
    const errors = err.message === "Network Error"
      ? "There was a network issue, check your connection."
      : err.response.data.errors;
    this.setState({
      errors,
      submitting: false,
      message: null
    });
  }

  render() {
    return (
      <CForm onSubmit={this.onSubmit.bind(this)} className='form'>
        <FormErrors errors={this.state.errors} />
        <FormMessage message={this.state.message} />
        {this.props.fields.map(field => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            showLabel={field.showLabel}
            value={this.state.fields[field.name]}
            onChange={this.updateField.bind(this)}
          />
        ))}
        <View className='form__buttons'>
          <Button>{this.props.submitText}</Button>
        </View>
      </CForm>
    );
  }
}

export default Form;
