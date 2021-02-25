import React from 'react';

import {
  ErrorProvider
} from './errorContext';

// ...

export class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  // ...

  retry = () => {
    this.setState({
      error: null
    });
  }

  capture = error => {
    this.setState({
      error
    });
  }

  trace = (error, errorInfo) => {
    console.log(error, errorInfo);
  }

  // ...

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    this.trace(error, errorInfo);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.error && prevState.error === this.state.error) {
      this.retry();
    }
  }

  render() {
    const {
      error
    } = this.state;

    if (error) {
      const {
        Fallback
      } = this.props;

      return <Fallback error={error} retry={this.retry} />
    }

    return (
      <ErrorProvider value={{
        capture: this.capture,
        trace: this.trace
      }}>
        {this.props.children}
      </ErrorProvider>
    )
  }
}