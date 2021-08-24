import { Injectable, Optional } from '@angular/core';
import { User } from '../models/User';
import { UserStatusService } from './user-status.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = new User (1, 'Mason', 'M', '28+', 'M28+', {}, {
    fruitMet: false, vegMet: false, proteinMet: false, grainMet: false}, false, 'mason@masonhassen.com');

    getUser(): User {
      return this.user;
    }

  constructor(@Optional() private userSatusService: UserStatusService) { 
    this.userSatusService.getUserStatus(this.user);
  }
}


