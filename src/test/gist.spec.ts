import {GistService} from "../api/service/gistService";
import {expect} from "chai";

describe('Gist service', () => {

    it('should return Gists', async () => {
        const response = await GistService.getGist();
        expect(response.status).to.equal(200);
        expect(response.body.length).to.be.greaterThan(0)
    });
})