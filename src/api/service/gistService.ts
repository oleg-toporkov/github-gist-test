import supertest from 'supertest';
import {config} from "../config";
import {CreateGistRequestDTO} from "../dto/createGistRequestDTO";
import {prettyPrint} from "../util";

export class GistService {
    private static readonly API_PATH = '/gists';

    static async getGists(): Promise<supertest.Response> {
        return supertest(config.api_host)
            .get(this.API_PATH)
            .set('Authorization', `Bearer ${config.gh_user_token}`)
            .set('User-Agent', config.user_agent)
            .on('response', (response: supertest.Response) => prettyPrint(response));
    }

    static async getGist(id: string): Promise<supertest.Response> {
        return supertest(config.api_host)
            .get(`${this.API_PATH}/${id}`)
            .set('Authorization', `Bearer ${config.gh_user_token}`)
            .set('User-Agent', config.user_agent)
            .on('response', (response: supertest.Response) => prettyPrint(response));
    }

    static async saveGist(gistData: CreateGistRequestDTO): Promise<supertest.Response> {
        return supertest(config.api_host)
            .post(this.API_PATH)
            .set('Authorization', `Bearer ${config.gh_user_token}`)
            .set('User-Agent', config.user_agent)
            .send(gistData)
            .on('response', (response: supertest.Response) => prettyPrint(response));
    }

    static async deleteGist(id: string): Promise<supertest.Response> {
        return supertest(config.api_host)
            .delete(`${this.API_PATH}/${id}`)
            .set('Authorization', `Bearer ${config.gh_user_token}`)
            .set('User-Agent', config.user_agent)
            .on('response', (response: supertest.Response) => prettyPrint(response));
    }

}