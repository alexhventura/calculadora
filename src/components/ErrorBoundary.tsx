import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="min-h-screen flex items-center justify-center bg-slate-50 px-6"
        >
          <div className="max-w-md text-center bg-white rounded-2xl border border-slate-100 p-8 shadow-xs">
            <h1 className="text-lg font-bold text-slate-900 mb-2">
              Algo inesperado aconteceu
            </h1>
            <p className="text-sm text-slate-600 mb-6">
              Recarregue a página para continuar usando a calculadora.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-[#800020] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#9b1c31] transition-colors cursor-pointer"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
