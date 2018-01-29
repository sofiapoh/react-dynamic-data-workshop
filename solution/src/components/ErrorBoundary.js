import React from "react";

export default WrappedComponent => {
  return class ErrorBoundary extends React.Component {
    state = {
      hasError: false,
      error: null
    };

    componentDidCatch(err, info) {
      err.info = info;
      this.setState({ error: err, hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return (
          <div {...this.props} {...this.state} style={{ padding: "1rem" }}>
            <h2>Something went wrong!</h2>
            <br />
            <span>Refresh and try again or check your connection</span>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};
