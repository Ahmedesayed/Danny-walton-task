import { ApiService } from './../../@shared/services/api/api.service';
import { IMeeting } from './../../models/imeeting';
import { Injectable } from '@angular/core';
import { CRUD } from '@app/@shared/services/api/Crud';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService extends CRUD<IMeeting> {

  constructor(apiSrvc:ApiService) {
    super(apiSrvc,'meetings')
  }
}
