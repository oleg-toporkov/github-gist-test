import {GistService} from "../api/service/gistService";
import {expect} from "chai";
import {CreateGistRequestDTO} from "../api/dto/createGistRequestDTO";

describe('Gist service', () => {
    let gistId: string;

    it('should return no gists', async () => {
        const response = await GistService.getGists();
        expect(response.status).to.equal(200);
        expect(response.body.length).to.be.equal(0);
    });

    it('should create a new gist', async () => {
        const gistFileName = `Test${Date.now()}.md`;
        const gistFileDescription = `Test gist description ${Date.now()}`
        const gistFileContent = '[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555)](https://www.linkedin.com/in/otoporkov/)\n# Test Header'

        const gistData = new CreateGistRequestDTO(
            gistFileDescription,
            true,
            gistFileName,
            gistFileContent)

        const saveGistResponse = await GistService.saveGist(gistData);
        expect(saveGistResponse.status).to.equal(201);
        gistId = saveGistResponse.body['id'];

        expect(saveGistResponse.body['url'], 'URL is incorrect').to.be.a('string').that.is.not.empty;
        expect(saveGistResponse.body['id'], 'ID is incorrect').to.be.a('string').that.is.not.empty;
        expect(saveGistResponse.body['files'][gistFileName], 'Files list is empty').to.be.not.empty;
        expect(saveGistResponse.body['files'][gistFileName]['filename'], 'Files name is incorrect').to.be.equal(gistFileName);
        expect(saveGistResponse.body['files'][gistFileName]['language'], 'Language detected incorrectly').to.be.equal('Markdown');
        expect(saveGistResponse.body['files'][gistFileName]['content'], 'Gist file content is incorrect').to.be.equal(gistFileContent);
        expect(saveGistResponse.body['public'], 'Visibility is incorrect').to.be.equal(gistData.public);
        expect(saveGistResponse.body['description'], 'Description is incorrect').to.be.equal(gistFileDescription);

        const getGistResponse = await GistService.getGist(gistId);

        expect(getGistResponse.body['url'], 'URL is incorrect').to.be.a('string').that.is.not.empty;
        expect(getGistResponse.body['id'], 'ID is incorrect').to.be.a('string').that.is.not.empty;
        expect(getGistResponse.body['files'][gistFileName], 'Files list is empty').to.be.not.empty;
        expect(getGistResponse.body['files'][gistFileName]['filename'], 'Files name is incorrect').to.be.equal(gistFileName);
        expect(getGistResponse.body['files'][gistFileName]['language'], 'Language detected incorrectly').to.be.equal('Markdown');
        expect(getGistResponse.body['files'][gistFileName]['content'], 'Gist file content is incorrect').to.be.equal(gistFileContent);
        expect(getGistResponse.body['public'], 'Visibility is incorrect').to.be.equal(gistData.public);
        expect(getGistResponse.body['description'], 'Description is incorrect').to.be.equal(gistFileDescription);
    });

    it('should return all gists', async () => {
        const response = await GistService.getGists();
        expect(response.status).to.equal(200);
        expect(response.body.length).to.be.equal(1);
    });

    after(async () => {
        if (gistId) {
            const response = await GistService.deleteGist(gistId);
            expect(response.status).to.equal(204);
        }
    })
})