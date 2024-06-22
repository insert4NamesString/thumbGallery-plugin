# Gallery Plugin

This plugin read md (galleies) that contain links to image files to display as a grid thumbnail format.

## How to use

1. craete a gallery. This wild be a Md that contain links to local files images.
    - example:
        !link_Markdown(image 1)
        !link_Markdown(image 2)
2. Create a markdown code block:
    ```thumbGallery
    [[name of Md file]]
    ```

## Limitations

- Only assept embedded links.
- Only use local files.