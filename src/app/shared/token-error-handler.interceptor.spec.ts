import { TestBed } from '@angular/core/testing';

import { TokenErrorHandlerInterceptor } from './token-error-handler.interceptor';

describe('HeaderErrorHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenErrorHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenErrorHandlerInterceptor = TestBed.inject(TokenErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
