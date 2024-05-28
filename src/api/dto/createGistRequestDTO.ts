export class CreateGistRequestDTO {
    public description: string;
    public public: boolean;
    public files: Record<string, Record<'content', string>>;

    constructor(description: string, isPublic: boolean, fileName: string, fileContent: string) {
        this.description = description;
        this.public = isPublic;
        this.files = {
            [fileName]: {
                content: fileContent
            }
        }
    }
}