import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionController } from '../../packages/submission/submission.controller';
import { KnexSubmissionRepository } from './submission.repo';
import { KnexUserRepository } from './user.repo';
import { Submission } from '../../packages/submission/submission.entity';
import { ISubmission } from '../../packages/submission/submission.repository';
import { ConfigService } from '../config/config.service';
import { Uuid } from '../../core';
import { Option, Some, None } from 'funfix';
import { v4 } from 'uuid';

import * as Knex from 'knex';

@Injectable()
export class SubmissionService {
  // Improvements (1) funfix (2) use dto not Submission class
  controller: Option<SubmissionController> = None;
  // submissionRepository = null;

  constructor(config: ConfigService) {
    // This function is only executed once, upon init. So I'll setup the submission repos here

    const knexConnection = Knex(config.getSubmissionRepositoryConnection());

    const submissionRepo = new KnexSubmissionRepository(knexConnection);
    submissionRepo.initSchema();

    const userRepo = new KnexUserRepository(knexConnection);
    userRepo.initSchema();

    /*
     * TESTING CODE
     * This rubbish shouldn't be commited, Peter!
     */

    const userId = v4();

    const testUser = {
      id: userId,
      created: new Date(),
      updated: None,
      identities: Some([{
        id: v4(),
        user_id: userId,
        created: new Date(),
        updated: new Date(),
        display_name: 'Y33tman',
        email: 'y33t@y33tbox.y33t',
        meta: {},
      }]),
      defaultIdentity: None,
    };

    userRepo.insert(testUser).then(async () => {
      console.log(await userRepo.selectById(userId));
    });

    /*
     * End of testing code
     */

    this.controller = Some(new SubmissionController(submissionRepo));
  }

  async findAll(): Promise<Submission[]> {
    return await this.controller.map(controller => controller.findAll()).get();
  }

  async start(): Promise<ISubmission> {
    return this.controller.map(controller => controller.start()).get();
  }

  async findOne(id: Uuid): Promise<Submission> {
    return this.controller.map(controller => controller.findOne(id)).get();
  }

  async changeTitle(id: Uuid, title: string): Promise<Submission> {
    return this.controller
      .map(controller => controller.changeTitle(id, title))
      .get();
  }

  async deleteSubmission(id: Uuid): Promise<boolean> {
    return this.controller.map(controller => controller.deleteSubmission(id))
    .get();
  }
}
