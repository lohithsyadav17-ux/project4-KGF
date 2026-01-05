import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: '#050505',
                    color: '#FFD700',
                    textAlign: 'center',
                    fontFamily: 'Cinzel, serif',
                    padding: '2rem'
                }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Empire Disrupted</h1>
                    <p style={{ fontFamily: 'sans-serif', color: '#888', marginBottom: '2rem', maxWidth: '600px' }}>
                        The Kolar Gold Fields have encountered a temporary collapse.
                        <br />
                        <span style={{ fontSize: '0.8em', opacity: 0.7 }}>
                            {this.state.error && this.state.error.toString()}
                        </span>
                    </p>
                    <button
                        onClick={this.handleReload}
                        style={{
                            padding: '1rem 3rem',
                            fontSize: '1.2rem',
                            backgroundColor: 'transparent',
                            color: '#FFD700',
                            border: '1px solid #FFD700',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFD700';
                            e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#FFD700';
                        }}
                    >
                        Rebuild Empire
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
