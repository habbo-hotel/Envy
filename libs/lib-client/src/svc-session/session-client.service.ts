import {lastValueFrom} from 'rxjs';
import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {SessionFindOneInput, SessionWire} from './session-client.types';
import {
  SVC_SESSION_INTERNAL_EVENT_FIND_ONE,
  SVC_SESSION_NAME,
} from './session.const';

@Injectable()
export class SessionClientService {
  constructor(@Inject(SVC_SESSION_NAME) private client: ClientProxy) {}

  async findOne(input: SessionFindOneInput): Promise<SessionWire> {
    const matchingSession$ = this.client.send(
      SVC_SESSION_INTERNAL_EVENT_FIND_ONE,
      input
    );
    return await lastValueFrom(matchingSession$);
  }
}
