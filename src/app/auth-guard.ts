import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ✅ SSR safe check
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('seller')) {
      return true;
    }
  }

  router.navigate(['/seller-auth']);
  return false;
};
