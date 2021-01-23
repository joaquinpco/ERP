import { Injectable } from '@angular/core';
import { API, Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})

export class AuditsService {

  constructor() {}

  async generateAudit(title, endpoint, data, result, infoFront, description) {
    const user = await Auth.currentUserInfo();

    const postParam = {
      body: {
        title: title,
        endpoint: endpoint,
        data: data,
        result: result,
        infoFront: infoFront,
        description: description + ` updated by ${user.username}`
      }
    }

    await API.post('ERP', '/erp/newAudit', postParam);
  }

}
