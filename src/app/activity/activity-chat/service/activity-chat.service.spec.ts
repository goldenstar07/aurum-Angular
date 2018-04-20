import { TestBed, inject } from '@angular/core/testing';

import { ActivityChatService } from './activity-chat.service';

describe('ActivityChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityChatService]
    });
  });

  it('should be created', inject([ActivityChatService], (service: ActivityChatService) => {
    expect(service).toBeTruthy();
  }));
});
