var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => GalleryPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var PreviewThumbnails = class {
  constructor(codeBlockContent, app, parentElement) {
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
      const file = mdFiles.find((file2) => file2.basename === galleryName);
      if (file) {
        const content = await this.app.vault.cachedRead(file);
        const thumbnailLinks = this.extractThumbnailLinks(content);
        for (const link of thumbnailLinks) {
          const ogFileIndex = allFiles.findIndex((file2) => file2.name === link);
          if (ogFileIndex != -1) {
            const img = document.createElement("img");
            img.src = this.app.vault.getResourcePath(allFiles[ogFileIndex]);
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
  extractGalleryNames() {
    const pattern = /\[\[(.*?)\]\]/g;
    const matches = [...this.codeBlockContent.matchAll(pattern)];
    return matches.map((match) => match[1]);
  }
  extractThumbnailLinks(content) {
    const pattern = /!\[\[(.*?)\]\]/g;
    const matches = [...content.matchAll(pattern)];
    return matches.map((match) => match[1]);
  }
};
var GalleryPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("thumbGallery", (source, el, ctx) => {
      el.innerHTML = "";
      new PreviewThumbnails(source, this.app, el);
    });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQXBwLCBQbHVnaW4gfSBmcm9tICdvYnNpZGlhbic7XHJcblxyXG5jbGFzcyBQcmV2aWV3VGh1bWJuYWlscyB7XHJcbiAgICBjb2RlQmxvY2tDb250ZW50OiBzdHJpbmc7XHJcbiAgICBhcHA6IEFwcDtcclxuICAgIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvZGVCbG9ja0NvbnRlbnQ6IHN0cmluZywgYXBwOiBBcHAsIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgdGhpcy5jb2RlQmxvY2tDb250ZW50ID0gY29kZUJsb2NrQ29udGVudDtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIHRoaXMub25sb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25sb2FkKCkge1xyXG4gICAgICAgIGNvbnN0IGFsbEZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKTtcclxuICAgICAgICBjb25zdCBtZEZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG4gICAgICAgIGNvbnN0IGdhbGxlcnlOYW1lcyA9IHRoaXMuZXh0cmFjdEdhbGxlcnlOYW1lcygpO1xyXG5cclxuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGRpdi5jbGFzc05hbWUgPSBcInRodW1ibmFpbC1nYWxsZXJ5XCI7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZ2FsbGVyeU5hbWUgb2YgZ2FsbGVyeU5hbWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBtZEZpbGVzLmZpbmQoZmlsZSA9PiBmaWxlLmJhc2VuYW1lID09PSBnYWxsZXJ5TmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChmaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuY2FjaGVkUmVhZChmaWxlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRodW1ibmFpbExpbmtzID0gdGhpcy5leHRyYWN0VGh1bWJuYWlsTGlua3MoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxpbmsgb2YgdGh1bWJuYWlsTGlua3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvZ0ZpbGVJbmRleCA9IGFsbEZpbGVzLmZpbmRJbmRleChmaWxlID0+IGZpbGUubmFtZSA9PT0gbGluayk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9nRmlsZUluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSB0aGlzLmFwcC52YXVsdC5nZXRSZXNvdXJjZVBhdGgoYWxsRmlsZXNbb2dGaWxlSW5kZXhdKTsgLy9yZWFkIHRoZSBwYXRoIGJ1dCBub3QgdGhlIHNyYyBwYXRoLCBidXQgY3JlYXRlIG5ldyBlbGVtZW50cyB1c2luZyB0aGUgaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLmFsdCA9IGxpbms7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc05hbWUgPSBcInRodW1ibmFpbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtsaW5rfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYE1hcmtkb3duIGZpbGUgbm90IGZvdW5kOiAke2dhbGxlcnlOYW1lfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4dHJhY3RHYWxsZXJ5TmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSAvXFxbXFxbKC4qPylcXF1cXF0vZztcclxuICAgICAgICBjb25zdCBtYXRjaGVzID0gWy4uLnRoaXMuY29kZUJsb2NrQ29udGVudC5tYXRjaEFsbChwYXR0ZXJuKV07XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMubWFwKG1hdGNoID0+IG1hdGNoWzFdKTtcclxuICAgIH1cclxuXHJcbiAgICBleHRyYWN0VGh1bWJuYWlsTGlua3MoY29udGVudDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSAvIVxcW1xcWyguKj8pXFxdXFxdL2c7XHJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFsuLi5jb250ZW50Lm1hdGNoQWxsKHBhdHRlcm4pXTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hlcy5tYXAobWF0Y2ggPT4gbWF0Y2hbMV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYWxsZXJ5UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuICAgIGFzeW5jIG9ubG9hZCgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTWFya2Rvd25Db2RlQmxvY2tQcm9jZXNzb3IoXCJtaW5pR2FsbGVyeVwiLCAoc291cmNlLCBlbCwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIENsZWFyIHRoZSBlbGVtZW50IHRvIHByZXZlbnQgZHVwbGljYXRlIHJlbmRlcnNcclxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgUHJldmlld1RodW1ibmFpbHMgaW5zdGFuY2VcclxuICAgICAgICAgICAgbmV3IFByZXZpZXdUaHVtYm5haWxzKHNvdXJjZSwgdGhpcy5hcHAsIGVsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQTRCO0FBRTVCLElBQU0sb0JBQU4sTUFBd0I7QUFBQSxFQUtwQixZQUFZLGtCQUEwQixLQUFVLGVBQTRCO0FBQ3hFLFNBQUssTUFBTTtBQUNYLFNBQUssbUJBQW1CO0FBQ3hCLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssT0FBTztBQUFBLEVBQ2hCO0FBQUEsRUFFQSxNQUFNLFNBQVM7QUFDWCxVQUFNLFdBQVcsS0FBSyxJQUFJLE1BQU0sU0FBUztBQUN6QyxVQUFNLFVBQVUsS0FBSyxJQUFJLE1BQU0saUJBQWlCO0FBQ2hELFVBQU0sZUFBZSxLQUFLLG9CQUFvQjtBQUU5QyxVQUFNLE1BQU0sU0FBUyxjQUFjLEtBQUs7QUFDeEMsUUFBSSxZQUFZO0FBRWhCLGVBQVcsZUFBZSxjQUFjO0FBQ3BDLFlBQU0sT0FBTyxRQUFRLEtBQUssQ0FBQUEsVUFBUUEsTUFBSyxhQUFhLFdBQVc7QUFDL0QsVUFBSSxNQUFNO0FBQ04sY0FBTSxVQUFVLE1BQU0sS0FBSyxJQUFJLE1BQU0sV0FBVyxJQUFJO0FBQ3BELGNBQU0saUJBQWlCLEtBQUssc0JBQXNCLE9BQU87QUFDekQsbUJBQVcsUUFBUSxnQkFBZ0I7QUFDL0IsZ0JBQU0sY0FBYyxTQUFTLFVBQVUsQ0FBQUEsVUFBUUEsTUFBSyxTQUFTLElBQUk7QUFDakUsY0FBSSxlQUFlLElBQUk7QUFDbkIsa0JBQU0sTUFBTSxTQUFTLGNBQWMsS0FBSztBQUN4QyxnQkFBSSxNQUFNLEtBQUssSUFBSSxNQUFNLGdCQUFnQixTQUFTLFdBQVcsQ0FBQztBQUM5RCxnQkFBSSxNQUFNO0FBQ1YsZ0JBQUksWUFBWTtBQUNoQixnQkFBSSxZQUFZLEdBQUc7QUFBQSxVQUN2QixPQUFPO0FBQ0gsb0JBQVEsTUFBTSxtQkFBbUIsTUFBTTtBQUFBLFVBQzNDO0FBQUEsUUFDSjtBQUFBLE1BQ0osT0FBTztBQUNILGdCQUFRLE1BQU0sNEJBQTRCLGFBQWE7QUFBQSxNQUMzRDtBQUFBLElBQ0o7QUFDQSxTQUFLLGNBQWMsWUFBWSxHQUFHO0FBQUEsRUFDdEM7QUFBQSxFQUVBLHNCQUFnQztBQUM1QixVQUFNLFVBQVU7QUFDaEIsVUFBTSxVQUFVLENBQUMsR0FBRyxLQUFLLGlCQUFpQixTQUFTLE9BQU8sQ0FBQztBQUMzRCxXQUFPLFFBQVEsSUFBSSxXQUFTLE1BQU0sQ0FBQyxDQUFDO0FBQUEsRUFDeEM7QUFBQSxFQUVBLHNCQUFzQixTQUEyQjtBQUM3QyxVQUFNLFVBQVU7QUFDaEIsVUFBTSxVQUFVLENBQUMsR0FBRyxRQUFRLFNBQVMsT0FBTyxDQUFDO0FBQzdDLFdBQU8sUUFBUSxJQUFJLFdBQVMsTUFBTSxDQUFDLENBQUM7QUFBQSxFQUN4QztBQUNKO0FBRUEsSUFBcUIsZ0JBQXJCLGNBQTJDLHVCQUFPO0FBQUEsRUFDOUMsTUFBTSxTQUFTO0FBQ1gsU0FBSyxtQ0FBbUMsZUFBZSxDQUFDLFFBQVEsSUFBSSxRQUFRO0FBRXhFLFNBQUcsWUFBWTtBQUdmLFVBQUksa0JBQWtCLFFBQVEsS0FBSyxLQUFLLEVBQUU7QUFBQSxJQUM5QyxDQUFDO0FBQUEsRUFDTDtBQUNKOyIsCiAgIm5hbWVzIjogWyJmaWxlIl0KfQo=
