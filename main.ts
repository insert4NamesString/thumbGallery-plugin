import { App, Plugin } from 'obsidian';

class PreviewThumbnails {
    codeBlockContent: string;
    app: App;
    parentElement: HTMLElement;

    constructor(codeBlockContent: string, app: App, parentElement: HTMLElement) {
        this.app = app;
        this.codeBlockContent = codeBlockContent;
        this.parentElement = parentElement;
        this.onload();
    }

    async onload() {
        const allFiles = this.app.vault.getFiles();
        const mdFiles = this.app.vault.getMarkdownFiles();
        const galleryNames = this.extractGalleryNames();

        const div = document.createElement("div");
        div.className = "thumbnail-gallery";

        for (const galleryName of galleryNames) {
            const file = mdFiles.find(file => file.basename === galleryName);
            if (file) {
                const content = await this.app.vault.cachedRead(file);
                const thumbnailLinks = this.extractThumbnailLinks(content);
                for (const link of thumbnailLinks) {
                    const ogFileIndex = allFiles.findIndex(file => file.name === link);
                    if (ogFileIndex != -1) {
                        const img = document.createElement("img");
                        img.src = this.app.vault.getResourcePath(allFiles[ogFileIndex]); //read the path but not the src path, but create new elements using the index
                        img.alt = link;
                        img.className = "thumbnail";
                        div.appendChild(img);
                    } else {
                        console.error(`File not found: ${link}`);
                    }
                }
            } else {
                console.error(`Markdown file not found: ${galleryName}`);
            }
        }
        this.parentElement.appendChild(div);
    }

    extractGalleryNames(): string[] {
        const pattern = /\[\[(.*?)\]\]/g;
        const matches = [...this.codeBlockContent.matchAll(pattern)];
        return matches.map(match => match[1]);
    }

    extractThumbnailLinks(content: string): string[] {
        const pattern = /!\[\[(.*?)\]\]/g;
        const matches = [...content.matchAll(pattern)];
        return matches.map(match => match[1]);
    }
}

export default class GalleryPlugin extends Plugin {
    async onload() {
        this.registerMarkdownCodeBlockProcessor("thumbGallery", (source, el, ctx) => {
            // Clear the element to prevent duplicate renders
            el.innerHTML = '';

            // Create a new PreviewThumbnails instance
            new PreviewThumbnails(source, this.app, el);
        });
    }
}
