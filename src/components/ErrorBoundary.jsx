import { Component } from "react";

// Catches render/runtime errors so a broken module or failed chunk load
// surfaces as a visible message instead of a silent blank page (the
// previous Suspense+lazy setup had no boundary, so any failure there
// was invisible to the user).
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio crashed:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-[#0F172A] px-6 text-center text-white">
          <p className="text-lg font-semibold">Something went wrong.</p>
          <p className="max-w-sm text-sm text-white/60">
            The page failed to load correctly. This is usually fixed by
            reloading.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/20"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
