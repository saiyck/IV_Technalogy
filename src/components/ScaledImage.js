import {WIDTH} from 'constants';
import React from 'react';
import {Image} from 'react-native';

export default class ScaledImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {source: {uri: this.props.source.uri}};
  }

  componentWillMount() {
    Image.getSize(this.props.source.uri, (width, height) => {
      if (this.props.width && !this.props.height) {
        this.setState({
          width: this.props.width,
          height: height * (this.props.width / width),
        });
      } else if (!this.props.width && this.props.height) {
        this.setState({
          width: width * (this.props.height / height),
          height: this.props.height,
        });
      } else {
        this.setState({width: '100%', height: height * (WIDTH / width)});
      }
    });
  }

  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  render() {
    return (
      <Image
        source={this.state.source}
        // resizeMode="cover"
        style={{height: this.state.height, width: this.state.width}}
      />
    );
  }
}
