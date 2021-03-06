import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login({ email, password }) {
    return of({
      user: { email, uid: 'hgre42a1254d' },
    });
  }
}
