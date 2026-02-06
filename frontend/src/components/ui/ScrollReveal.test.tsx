import { render, screen } from '@testing-library/react';
import ScrollReveal from './ScrollReveal';
import { describe, it, expect } from 'vitest';

describe('ScrollReveal Component', () => {
  it('renders children correctly', () => {
    render(
      <ScrollReveal>
        <div>Test Content</div>
      </ScrollReveal>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ScrollReveal className="custom-test-class">
        <div>Test Content</div>
      </ScrollReveal>
    );
    // Framer motion usually renders a div
    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveClass('custom-test-class');
  });
});
