import {ApplicationConfig, inject, isDevMode, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideServiceWorker} from '@angular/service-worker';
import {ConfigService} from "./core/shared/config.service";

/**
 * Application configuration object used to set up the providers for the application.
 * It includes configurations such as change detection strategy, router setup, and HTTP client setup.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      const configService: ConfigService = inject(ConfigService);
      return configService.load();
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
