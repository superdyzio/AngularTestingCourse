import {MessageService} from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should add message to array', () => {
    expect(service.messages.length).toEqual(0);

    service.add('new message');

    expect(service.messages.length).toEqual(1);
  });

  it('should remove all messages', () => {
    service.messages = ['message1', 'message2'];

    service.clear();

    expect(service.messages.length).toEqual(0);
  });
});
