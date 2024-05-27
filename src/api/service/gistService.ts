import supertest from 'supertest';
import {config} from "../config";

export class GistService {
    private static readonly API_PATH = '/gists'

    static async getGist(): Promise<supertest.Response> {
        return supertest(config.api_host)
            .get(this.API_PATH)
            .set('Authorization', `Bearer ${config.gh_user_token}`)
            .set('User-Agent', config.user_agent);
    }

    static async saveGist(gistData: {}): Promise<supertest.Response> {
        return supertest(config.api_host)
            .post(this.API_PATH)
            .set('Authorization', `Bearer ${config.gh_user_token}`)
            .set('User-Agent', config.user_agent)
            .send(gistData);
    }
}