// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { ChatComponent } from './app/components/chat/chat.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(ChatComponent, {
  providers: [provideAnimationsAsync()]
}).catch((err) => console.error(err));
