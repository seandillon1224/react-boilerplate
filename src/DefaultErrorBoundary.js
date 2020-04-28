import React from "react";
import propTypes from "prop-types";

export default class DefaultErrorBoundary extends React.Component {
  state = {
    isError: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }
  static propTypes = {
    children: propTypes.node.isRequired,
  };
  render() {
    const { isError } = this.state;
    const { children } = this.props;
    return isError ? (
      <div style={{ fontFamily: "Roboto, sans-serif", margin: "0 auto" }}>
        <h1>
          Try Limiting Search via Date Filter - Too Much Data Requested! If
          problem persists please reach out to support.
        </h1>
      </div>
    ) : (
      children
    );
  }
}
