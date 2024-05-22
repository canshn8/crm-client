import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withPreloading, PreloadAllModules, withComponentInputBinding } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

bootstrapApplication(AppComponent, {
  providers: [
      DatePipe,
      provideToastr({
          timeOut: 3000,
          preventDuplicates: false,
          closeButton: true,
          countDuplicates: true,
          positionClass: "toast-top-right",
      }),
      provideAnimations(),
      importProvidersFrom([
          JwtModule.forRoot({
              config: {
                  tokenGetter: () => localStorage.getItem("token"),
                  allowedDomains: ["localhost:44338"]
              }
          }),
          CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
          }),
          
      ]),
      provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
      provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(), provideAnimationsAsync(),
  ]

}
)