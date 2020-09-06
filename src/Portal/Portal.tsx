import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Portal extends React.PureComponent {
  portalNode: HTMLDivElement | null = null;

  canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

  componentWillUnmount(): void {
    if (this.portalNode) {
      document.body.removeChild(this.portalNode);
    }
    this.portalNode = null;
  }

  render(): React.ReactPortal | null {
    if (!this.canUseDOM) {
      return null;
    }
    if (!this.portalNode) {
      this.portalNode = document.createElement('div');
      document.body.appendChild(this.portalNode);
    }

    const { children } = this.props;

    return ReactDOM.createPortal(children, this.portalNode);
  }
}

export default Portal;
