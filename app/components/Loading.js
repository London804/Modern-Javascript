import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

class Loading extends React.Component {
  // example of class properties. This has not been finalized yet so the linter complains. 
 static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
  }
  static defaultProps = {
    text: 'Loading',
    speed: 300
  }
  state = {
    text: this.props.text
  }
  componentDidMount () {
    const { text, speed } = this.props;
    const stopper = text + '...';

    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => {
          // ES5 return
          return {
            text: this.props.text
          };
        });
      } else {
        // es6 implied return with object literal
        this.setState((prevState) => ({ text: prevState.text + '.' }))
      }
    }, speed);
  }

  // this can be refactored further using ternary operator
  // componentDidMount() {
  //    const { text, speed } = this.props
  //    const stopper = text + '...';
  //    this.interval = window.setInterval(() => {
  //    this.state.text === stopper
  //      ? this.setState(() => ({ text: this.props.text }))
  //      : this.setState((prevState) => ({ text: prevState.text + '.' }))
  //    }, speed)


  componentWillUnmount () {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};

export default Loading;
