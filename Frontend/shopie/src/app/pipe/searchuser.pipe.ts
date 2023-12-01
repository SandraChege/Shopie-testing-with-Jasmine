import { Pipe, PipeTransform } from '@angular/core';
import { getallusers } from '../interface/register';

@Pipe({
  name: 'searchuser'
})
export class SearchuserPipe implements PipeTransform {

  transform(allUsers:getallusers[], searchtext:string): getallusers[] {
     if (!allUsers || searchtext == '') {
       return allUsers;
     }
     const filtered: getallusers[] = [];
     for (let user of allUsers) {
       if (user.email.toLowerCase().includes(searchtext.toLowerCase())) {
         filtered.push(user);
       }
     }
     return filtered;
  }

}
